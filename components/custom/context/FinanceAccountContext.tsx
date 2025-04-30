import { mapCashRegisterDataToCashRegisterRecord } from '@/mappers/cashRegister';
import { Denominations } from '@/types/enums/finance';
import { CashRegisterRecord, FinanceAccountContextType, FinanceAccountProviderProps } from '@/types/finance';
import { multiplyDecimals } from '@/utils/decimal';
import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

const FinanceAccountContext = createContext<FinanceAccountContextType | undefined>(undefined);

export const FinanceAccountProvider = (props: PropsWithChildren<FinanceAccountProviderProps>) => {

  const childAccountBalance = useMemo(() => {
    return props.initialBalance;
  }, [props.initialBalance]);

  const [counts, setCounts] = useState<CashRegisterRecord>(
    mapCashRegisterDataToCashRegisterRecord(undefined)  // empty
  );

  // Compute the total amount being increased/decreased based on denominations
  const actionAmount = Object.entries(counts).reduce((sum, [denomination, count]) => {
    return sum + multiplyDecimals(Number(denomination), count);
  }, 0);

  const updateCount = (denomination: Denominations, count: number) => {
    setCounts((prev) => ({
      ...prev,
      [denomination]: Math.max(0, count),
    }));
  };

  const resetDenominations = () => {
    setCounts(mapCashRegisterDataToCashRegisterRecord(undefined));
  };

  return (
    <FinanceAccountContext.Provider
      value={{
        childAccountBalance,
        actionAmount,
        counts,
        updateCount,
        resetDenominations,
        type: props.type
      }}
    >
      {props.children}
    </FinanceAccountContext.Provider>
  );
};

export const useFinanceAccountContext = () => {
  const context = useContext(FinanceAccountContext);
  if (!context) {
    throw new Error('useFinanceAccountContext must be used within a FinanceAccountProvider');
  }
  return context;
};