import CampChildrenContent from '@/components/custom/camp/children/CampChildrenContent'
import CampChildrenFooter from '@/components/custom/camp/children/CampChildrenFooter'
import { View } from 'react-native'

const Children = () => {
  return (
    <View className='flex-1'>
      <CampChildrenContent />
      <CampChildrenFooter />
    </View>
  )
}

export default Children