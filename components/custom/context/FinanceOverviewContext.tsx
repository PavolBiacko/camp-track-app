import { Denominations } from '@/types/enums/finance';
import { FinanceOverviewContextType, FinanceOverviewProviderProps } from '@/types/finance';
import { initializeQuantities } from '@/utils/finance';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const FinanceOverviewContext = createContext<FinanceOverviewContextType | undefined>(undefined);

export const FinanceOverviewProvider = (props: PropsWithChildren<FinanceOverviewProviderProps>) => {

  const [quantities, _setQuantities] = useState<Record<Denominations, number>>(
    initializeQuantities(props.cashRegisterData)
  );

  // Calculate total amount
  const totalAmount = Object.entries(quantities).reduce((sum, [denomination, quantity]) => {
    return sum + Number(denomination) * quantity;
  }, 0);

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