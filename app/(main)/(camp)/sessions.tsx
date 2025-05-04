import CampSessionContent from '@/components/custom/camp/CampSessionContent'
import CampSessionFooter from '@/components/custom/camp/CampSessionFooter'
import { View } from 'react-native'

const Sessions = () => {
  return (
    <View className='flex-1'>
      <CampSessionContent />
      <CampSessionFooter />
    </View>
  )
}

export default Sessions