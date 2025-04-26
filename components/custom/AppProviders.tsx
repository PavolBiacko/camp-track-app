import { FinanceTransactionProvider } from '@/components/custom/context/FinanceTransactionContext';
import { ScheduleProvider } from '@/components/custom/context/ScheduleContext';
import { PropsWithChildren } from "react";

const AppProviders = (props: PropsWithChildren) => {
  return (
    <ScheduleProvider>
      <FinanceTransactionProvider>
        {props.children}
      </FinanceTransactionProvider>
    </ScheduleProvider>
  )
};

export default AppProviders;