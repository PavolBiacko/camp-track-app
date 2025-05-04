import CampSessionLine from '@/components/custom/camp/base/CampSessionLine'
import { CampSessionBoxProps } from '@/types/camp'
import { Text, View } from 'react-native'

const CampSessionBox = (props: CampSessionBoxProps) => {
  return (
    <View className='items-center'>
      <Text className="text-typography-800 font-pbold text-3xl mb-2">
        {props.year[0].beginDate.getFullYear()}
      </Text>
      <View
        className="w-11/12 items-center justify-center border-2 border-outline-500 rounded-2xl gap-5 py-5">
        {props.year.map((session, index) => (
          <CampSessionLine
            key={index}
            order={index + 1}
            beginDate={session.beginDate}
            endDate={session.endDate}
          />))}
      </View>
    </View>
  )
}

export default CampSessionBox