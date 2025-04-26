import { mapCashRegisterDataToCashRegisterRecord } from '@/mappers/cashRegister';
import { Denominations } from '@/types/enums/finance';
import { CashRegisterRecord, FinanceAccountContextType, FinanceAccountProviderProps } from '@/types/finance';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const FinanceAccountContext = createContext<FinanceAccountContextType | undefined>(undefined);

export const FinanceAccountProvider = (props: PropsWithChildren<FinanceAccountProviderProps>) => {

  const [childAccountBalance, _setChildAccountBalance] = useState<number>(props.initialBalance);
  const [counts, setCounts] = useState<CashRegisterRecord>(
    mapCashRegisterDataToCashRegisterRecord(undefined)  // empty
  );

  // Compute the total amount being increased/decreased based on denominations
  const actionAmount = Object.entries(counts).reduce((sum, [denomination, count]) => {
    return sum + Number(denomination) * count;
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

  console.log('Child Account Balance:', childAccountBalance);
  console.log('Action Amount:', actionAmount);
  console.log('Counts:', counts);

  return (
    <FinanceAccountContext.Provider
      value={{
        childAccountBalance,
        actionAmount,
        counts,
        updateCount,
        resetDenominations,
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