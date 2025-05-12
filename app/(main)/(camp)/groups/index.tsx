import CampGroupsContent from '@/components/custom/camp/groups/CampGroupsContent'
import CampGroupsFooter from '@/components/custom/camp/groups/CampGrouptsFooter'
import { View } from 'react-native'

const Groups = () => {
  return (
    <View className='flex-1'>
      <CampGroupsContent />
      <CampGroupsFooter />
    </View>
  )
}

export default Groups