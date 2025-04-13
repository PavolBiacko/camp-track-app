import { FinanceOverviewProvider } from '@/components/custom/context/FinanceOverviewContext';
import { ScheduleProvider } from '@/components/custom/context/ScheduleContext';
import { PropsWithChildren } from "react";

const AppProviders = ({ children }: PropsWithChildren) => (
  <ScheduleProvider>
    <FinanceOverviewProvider>
      {children}
    </FinanceOverviewProvider>
  </ScheduleProvider>
);

export default AppProviders;