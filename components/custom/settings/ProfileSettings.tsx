import SettingsBox from '@/components/custom/settings/base/SettingsBox'
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar'
import { Badge, BadgeText } from '@/components/ui/badge'
import { Text, View } from 'react-native'

const ProfileSettings = () => {
  return (
    <SettingsBox title="Profil" isClickable={true} containerStyles='bg-secondary-50 p-5'>
      <View className='flex-row justify-start items-center'>
        <Avatar size="xl" className="border-2 border-outline-700 bg-background-500 rounded-full">
          <AvatarFallbackText className="text-white">
            Pavol Biačko
          </AvatarFallbackText>
        </Avatar>
        <View className='ml-3'>
          <Text className='text-typography-950 text-2xl font-psemibold'>Pavol Biačko</Text>
          <Text className='text-typography-700 text-xs font-pregular'>palko.biacko@gmail.com</Text>
          <View className='flex flex-row gap-2'>
            <Badge className='bg-error-300 border border-error-700 rounded-xl mt-2'>
              <BadgeText className='text-typography-950 text-xs font-pbold px-2'>ODD. VEDÚCI</BadgeText>
            </Badge>
            <Badge className='bg-error-300 border border-error-700 rounded-xl mt-2'>
              <BadgeText className='text-typography-950 text-xs font-pbold px-2'>6. ODD</BadgeText>
            </Badge>
          </View>
        </View>
      </View>
    </SettingsBox>
  )
}

export default ProfileSettings