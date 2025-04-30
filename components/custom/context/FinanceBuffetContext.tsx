import { FinanceBuffetContextType, LocalBuffetActionAmounts } from '@/types/finance';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const FinanceBuffetContext = createContext<FinanceBuffetContextType | undefined>(undefined);

export const FinanceBuffetProvider = (props: PropsWithChildren) => {
  const [actionAmounts, setActionAmounts] = useState<LocalBuffetActionAmounts>({});

  return (
    <FinanceBuffetContext.Provider value={{ actionAmounts, setActionAmounts }}>
      {props.children}
    </FinanceBuffetContext.Provider>
  );
};

export const useFinanceBuffetContext = () => {
  const context = useContext(FinanceBuffetContext);
  if (!context) {
    throw new Error('useFinanceBuffetContext must be used within a FinanceBuffetProvider');
  }
  return context;
};