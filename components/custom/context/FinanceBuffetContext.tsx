import { FinanceBuffetContextType, LocalBuffetActionAmounts } from '@/types/finance';
import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

const FinanceBuffetContext = createContext<FinanceBuffetContextType | undefined>(undefined);

export const FinanceBuffetProvider = (props: PropsWithChildren) => {
  const [actionAmounts, setActionAmounts] = useState<LocalBuffetActionAmounts>({});

  const resetsActionAmounts = useCallback((): void => {
    setActionAmounts({});
  }, [setActionAmounts]);

  return (
    <FinanceBuffetContext.Provider value={{ actionAmounts, setActionAmounts, resetsActionAmounts }}>
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