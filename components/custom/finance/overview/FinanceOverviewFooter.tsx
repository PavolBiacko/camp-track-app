import CustomButton from '@/components/custom/CustomButton'
import FinanceAccountActionModal from '@/components/custom/finance/accounts/base/FinanceAccountActionModal'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { View } from 'react-native'

const FinanceOverviewFooter = () => {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  if (!user) {
    return null;  // should not happen, since useAuth is used in the layout layer
  }

  return (
    <>
      <View className="border-t border-outline-300 justify-center items-center py-4">
        <CustomButton
          title="Výber akcie"
          action="primary"
          handlePress={() => setModalVisible(true)}
          textStyles="text-2xl text-center"
          containerStyles="w-2/3 h-16 rounded-3xl px-5"
        />
      </View>
      <FinanceAccountActionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

export default FinanceOverviewFooter