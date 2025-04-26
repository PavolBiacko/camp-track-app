import { mapCashRegisterDataToCashRegisterRecord } from '@/mappers/cashRegister';
import { FinanceOverviewContextType, FinanceOverviewProviderProps } from '@/types/finance';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

const FinanceOverviewContext = createContext<FinanceOverviewContextType | undefined>(undefined);

export const FinanceOverviewProvider = (props: PropsWithChildren<FinanceOverviewProviderProps>) => {

  const quantities = useMemo(() => {
    return mapCashRegisterDataToCashRegisterRecord(props.cashRegisterData);
  }, [props.cashRegisterData]);

  // Calculate total amount
  const totalAmount = Object.entries(quantities).reduce((sum, [denomination, quantity]) => {
    return sum + Number(denomination) * quantity;
  }, 0);

  console.log('Total Amount:', totalAmount);

  return (
    <FinanceOverviewContext.Provider value={{ totalAmount, quantities }}>
      {props.children}
    </FinanceOverviewContext.Provider>
  );
};

export const useFinanceOverviewContext = () => {
  const context = useContext(FinanceOverviewContext);
  if (!context) {
    throw new Error('useFinanceOverviewContext must be used within a FinanceOverviewProvider');
  }
  return context;
};