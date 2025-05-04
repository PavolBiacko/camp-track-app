import Loading from '@/components/custom/Loading'
import ProfileBadge from '@/components/custom/settings/base/ProfileBadge'
import SettingsBox from '@/components/custom/settings/base/SettingsBox'
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/useAuth'
import { Text, View } from 'react-native'

const ProfileSettings = () => {
  const { user, isLoading, isError } = useAuth();

  return (
    <SettingsBox title="Profil" isClickable={true} containerStyles='bg-secondary-50 p-5'>
      {!user || isLoading || isError
        ? <View className='flex-row h-24 justify-start items-center'>
          <Loading showText={false} />
        </View>
        : <View className='flex-row h-24 justify-start items-center'>
          <Avatar size="xl" className="border-2 border-outline-700 bg-background-500 rounded-full">
            <AvatarFallbackText className="text-typography-950 text-2xl font-pbold">
              {`${user.firstName} ${user.lastName}`}
            </AvatarFallbackText>
          </Avatar>
          <View className='ml-3 w-[70%] gap-1'>
            <Text className='text-typography-950 text-xl font-psemibold'>{user.firstName} {user.lastName}</Text>
            <Text className='text-typography-700 text-xs font-pregular'>{user.email}</Text>
            <ProfileBadge user={user} />
          </View>
        </View>}
    </SettingsBox>
  )
}

export default ProfileSettings