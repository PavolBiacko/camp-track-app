import CampSessionContent from '@/components/custom/camp/sessions/CampSessionContent'
import CampSessionFooter from '@/components/custom/camp/sessions/CampSessionFooter'
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