import FinanceAccountLine from '@/components/custom/finance/accounts/FinanceAccountLine';
import Loading from '@/components/custom/Loading';
import { useChildrenByLeader } from '@/hooks/models/useFinance';
import { FinanceAccountsParams } from '@/types/finance';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

const Accounts = () => {
  const { leaderId } = useLocalSearchParams<FinanceAccountsParams>();
  const { children, isLoading, isError } = useChildrenByLeader(leaderId);

  if (!children || isLoading || isError) {
    return <Loading showText={true} />;
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