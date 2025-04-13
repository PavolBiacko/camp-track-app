import { Denominations } from '@/types/enums/finance';
import { FinanceOverviewContextType } from '@/types/finance';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const FinanceOverviewContext = createContext<FinanceOverviewContextType | undefined>(undefined);

export const FinanceOverviewProvider = (props: PropsWithChildren) => {
  const [quantities, setQuantities] = useState<Record<Denominations, number>>({
    [Denominations.CENTS_1]: 0,
    [Denominations.CENTS_2]: 0,
    [Denominations.CENTS_5]: 0,
    [Denominations.CENTS_10]: 0,
    [Denominations.CENTS_20]: 0,
    [Denominations.CENTS_50]: 0,
    [Denominations.EURO_1]: 0,
    [Denominations.EURO_2]: 0,
    [Denominations.EURO_5]: 0,
    [Denominations.EURO_10]: 0,
    [Denominations.EURO_20]: 0,
    [Denominations.EURO_50]: 0,
    [Denominations.EURO_100]: 0,
    [Denominations.EURO_200]: 0,
    [Denominations.EURO_500]: 0,
  });

  // Calculate total amount
  const totalAmount = Object.entries(quantities).reduce((sum, [denomination, quantity]) => {
    return sum + Number(denomination) * quantity;
  }, 0);

  // Update quantity of a specific denomination
  const updateQuantity = (denomination: Denominations, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [denomination]: Math.max(0, quantity),
    }));
  };

  return (
    <FinanceOverviewContext.Provider value={{ totalAmount, quantities, updateQuantity }}>
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