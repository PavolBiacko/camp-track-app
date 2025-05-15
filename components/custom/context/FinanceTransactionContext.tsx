import { mapDateToDayEnd, mapDateToDayStart } from '@/mappers/datetime';
import { FinanceTransactionContextType, FinanceTransactionProviderProps } from '@/types/finance';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const FinanceTransactionContext = createContext<FinanceTransactionContextType | undefined>(undefined);

export const FinanceTransactionProvider = ({ currentCampSession, children }: PropsWithChildren<FinanceTransactionProviderProps>) => {
  const [dateFrom, setDateFrom] = useState(mapDateToDayStart(currentCampSession.beginDate));
  const [dateTo, setDateTo] = useState(mapDateToDayEnd(currentCampSession.endDate));

  return (
    <FinanceTransactionContext.Provider value={{ dateFrom, dateTo, setDateFrom, setDateTo }}>
      {children}
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