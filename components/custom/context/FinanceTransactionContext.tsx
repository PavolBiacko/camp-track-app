import { FinanceTransactionContextType } from '@/types/finance';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const FinanceTransactionContext = createContext<FinanceTransactionContextType | undefined>(undefined);

export const FinanceTransactionProvider = (props: PropsWithChildren) => {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  return (
    <FinanceTransactionContext.Provider value={{ dateFrom, dateTo, setDateFrom, setDateTo }}>
      {props.children}
    </FinanceTransactionContext.Provider>
  );
};

export const useFinanceTransactionContext = () => {
  const context = useContext(FinanceTransactionContext);
  if (!context) {
    throw new Error('useScheduleContext must be used within a ScheduleProvider');
  }
  return context;
};