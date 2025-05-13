import ChildrenLine from '@/components/custom/camp/children/base/CampChildrenLine';
import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import Loading from '@/components/custom/Loading';
import { useManyChildren } from '@/hooks/models/useChildren';
import { ScrollView, View } from 'react-native';

const ChildrenContent = () => {
  const { children, isLoading, isError } = useManyChildren();

  if (!children || isLoading || isError) {
    return <Loading showText={false} />;
  }

  if (children.length === 0) {
    return <EmptyScreenMessage text='Neexistujú žiadne deti.' />;
  }

  return (
    <View className="h-[87.5%] border-y border-outline-500">
      <ScrollView contentContainerClassName="items-center gap-5 py-5">
        {children.map((child, index) => (
          <ChildrenLine key={index} child={child} />
        ))}
      </ScrollView>
    </View>
  )
}

export default ChildrenContent