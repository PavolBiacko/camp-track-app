import ParentChildAccountLine from '@/components/custom/children/ParentChildAccountLine';
import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import Loading from '@/components/custom/Loading';
import { useManyAccountsWithParent } from '@/hooks/models/useGroupAccounts';
import { useAuth } from '@/hooks/useAuth';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Children = () => {
  const { user } = useAuth();
  const { children, isLoading, isError } = useManyAccountsWithParent(user?.id!);

  if (!children || isLoading || isError) {
    return <Loading showText={false} />;
  }

  return (
    <SafeAreaView className='justify-center h-full'>
      {children.length !== 0 ? (
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 10 }}>
          {children.map((child, index) => (
            <ParentChildAccountLine
              key={index}
              child={child}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyScreenMessage text='Zatiaľ nie sú vytvorené záznamy účtov detí.' />
      )}
    </SafeAreaView>
  )
}

export default Children