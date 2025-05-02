import CustomButton from '@/components/custom/CustomButton'
import { useAuth } from '@/hooks/useAuth'
import { router } from 'expo-router'
import { View } from 'react-native'

const FinanceOverviewFooter = () => {
  const { user } = useAuth();

  if (!user) {
    return null;  // should not happen, since useAuth is used in the layout layer
  }

  const handleBuffetPayment = () => {
    router.push({ pathname: "/(main)/(finance)/accounts/money-form", params: { leaderId: user.id, type: "decrement" } })
  }

  return (
    <>
      <View className="flex-row border-t border-outline-300 justify-center items-center py-4">
        <CustomButton
          title="Vyplatenie bufetu"
          action="primary"
          handlePress={handleBuffetPayment}
          textStyles="text-2xl text-center"
          containerStyles="h-16 rounded-3xl px-5"
        />
      </View>
    </>
  )
}

export default FinanceOverviewFooter