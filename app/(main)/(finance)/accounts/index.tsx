import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import FinanceAccountLine from '@/components/custom/finance/accounts/base/FinanceAccountLine';
import Loading from '@/components/custom/Loading';
import { useManyAccountsWithLeader } from '@/hooks/models/useGroupAccounts';
import { FinanceAccountsParams } from '@/types/finance';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

const Accounts = () => {
  const { leaderId } = useLocalSearchParams<FinanceAccountsParams>();
  const { children, isLoading, isError } = useManyAccountsWithLeader(leaderId);

  if (!children || isLoading || isError) {
    return <Loading showText={false} />;
  }

  if (children.length === 0) {
    return <EmptyScreenMessage text='V oddieli nie sú zatiaľ priradené žiadne deti.' />;
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 10 }}>
      {children.map((child, index) => (
        <FinanceAccountLine
          key={index}
          child={child}
        />
      ))}
    </ScrollView>
  )
}

export default Accounts