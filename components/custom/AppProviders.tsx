import { FinanceBuffetProvider } from '@/components/custom/context/FinanceBuffetContext';
import { ScheduleProvider } from '@/components/custom/context/ScheduleContext';
import { PropsWithChildren } from "react";

const AppProviders = (props: PropsWithChildren) => {
  return (
    <ScheduleProvider>
      <FinanceBuffetProvider>
        {props.children}
      </FinanceBuffetProvider>
    </ScheduleProvider>
  )
};

export default AppProviders;