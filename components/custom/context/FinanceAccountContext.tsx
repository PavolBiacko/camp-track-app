import { Denominations } from '@/types/enums/finance';
import { FinanceAccountContextType, FinanceAccountProviderProps } from '@/types/finance';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const FinanceAccountContext = createContext<FinanceAccountContextType | undefined>(undefined);

export const FinanceAccountProvider = (props: PropsWithChildren<FinanceAccountProviderProps>) => {
  console.log(props.initialBalance);
  const [childBalance, setChildBalance] = useState<number>(props.initialBalance);
  const [counts, setCounts] = useState<Record<Denominations, number>>({
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

  const confirmUpdate = () => {
    const actionTypeAmount = (props.type === 'increment' ? 1 : -1) * actionAmount;
    setChildBalance((prev) => prev + actionTypeAmount);
    resetDenominations(); // Reset denominations after confirmation
  };

  const resetDenominations = () => {
    setCounts({
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
  };

  return (
    <FinanceAccountContext.Provider
      value={{
        childBalance,
        actionAmount,
        counts,
        updateCount,
        confirmUpdate,
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