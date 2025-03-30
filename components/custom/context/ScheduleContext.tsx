import { ScheduleContextType } from '@/types/models/activities';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider = (props: PropsWithChildren) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <ScheduleContext.Provider value={{ selectedDate, setSelectedDate }}>
      {props.children}
    </ScheduleContext.Provider>
  );
};

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useScheduleContext must be used within a ScheduleProvider');
  }
  return context;
};