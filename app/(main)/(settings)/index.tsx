import AccountSettings from '@/components/custom/settings/AccountSettings';
import AppearanceSettings from '@/components/custom/settings/AppearanceSettings';
import ChildConnectionSettings from '@/components/custom/settings/ChildConnectionSettings';
import InformationsSettings from '@/components/custom/settings/InformationSettings';
import NotificationsSettings from '@/components/custom/settings/NotificationsSettings';
import ProfileSettings from '@/components/custom/settings/ProfileSettings';
import { ScrollView, View } from 'react-native';

const Settings = () => {
  return (
    <View className='w-full h-full'>
      <ScrollView keyboardShouldPersistTaps="handled" >
        <ProfileSettings />
        <AppearanceSettings />
        <NotificationsSettings />
        <ChildConnectionSettings />
        <InformationsSettings />
        <AccountSettings />
      </ScrollView>
    </View>
  );
};

export default Settings;