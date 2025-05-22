import { Badge, BadgeText } from '@/components/ui/badge';
import { useGroupById } from '@/hooks/models/useGroups';
import { ParentChildLineProps } from '@/types/children';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const ParentChildAccountLine = (props: ParentChildLineProps) => {
  const { id, firstName, lastName, groupId, accountBalance } = props.child;

  const { group, isLoading, isError } = useGroupById(groupId);

  const backgroundStyles: ClassNameValue = `bg-background-300 border-2 border-outline-500 ${props.containerStyles}`
  const textStyles: ClassNameValue = `text-2xl ${props.textStyles}`;
  const accountBalanceStyles: ClassNameValue = accountBalance < 0 ? "text-error-400" : "text-success-500";

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push({ pathname: "/(main)/(children)", params: { groupId: groupId, childId: id } })}
      className={
        twMerge(
          "flex-row justify-between items-center",
          "rounded-xl px-6 my-3 w-11/12 h-32",
          backgroundStyles
        )}>
      <View className='gap-2'>
        <Badge className="w-24 justify-center bg-secondary-500 rounded-xl mt-2">
          <BadgeText className='text-typography-950 text-center font-pbold px-2'>{group?.number ? `${group.number}. odd` : "..."}</BadgeText>
        </Badge>
        <View className=''>
          <Text className={twMerge(textStyles, "font-pbold text-typography-800")}>{firstName}</Text>
          <Text className={twMerge(textStyles, "font-pbold text-typography-800")}>{lastName}</Text>
        </View>
      </View>
      <Text className={
        twMerge(
          "font-psemibold text-success-500 pt-1",
          accountBalanceStyles,
          textStyles,
        )
      }>
        {accountBalance.toFixed(2)} €
      </Text>
    </TouchableOpacity>
  )
}

export default ParentChildAccountLine