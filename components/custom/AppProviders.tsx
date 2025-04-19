import { FinanceOverviewProvider } from '@/components/custom/context/FinanceOverviewContext';
import { ScheduleProvider } from '@/components/custom/context/ScheduleContext';
import Loading from '@/components/custom/Loading';
import { useCashRegisterByLeader } from '@/hooks/models/useFinance';
import { AppProviderProps } from '@/types/base';
import { PropsWithChildren } from "react";

const AppProviders = (props: PropsWithChildren<AppProviderProps>) => {
  const { cashRegister, isLoading, isError } = useCashRegisterByLeader(props.leaderId);

  // TODO - zistiť prečo sa neaktualizuje cashRegister

  if (!cashRegister || isLoading || isError) {
    return <Loading showText={true} />;
  }

  return (
    <ScheduleProvider>
      <FinanceOverviewProvider cashRegisterData={cashRegister}>
        {props.children}
      </FinanceOverviewProvider>
    </ScheduleProvider>
  )
};

export default AppProviders;