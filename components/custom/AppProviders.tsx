import { ScheduleProvider } from '@/components/custom/context/ScheduleContext';
import { PropsWithChildren } from "react";

const AppProviders = (props: PropsWithChildren) => {
  return (
    <ScheduleProvider>
      {props.children}
    </ScheduleProvider>
  )
};

export default AppProviders;