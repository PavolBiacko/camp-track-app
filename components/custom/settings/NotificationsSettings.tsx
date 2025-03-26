import SettingsBox from '@/components/custom/settings/base/SettingsBox';
import SettingsSwitchLine from '@/components/custom/settings/base/SettingsSwitchLine';
import { icons } from '@/constants'; // Adjust path as needed
import { SettingsSwitchLineProps } from '@/types/base';
import { useColorScheme } from 'nativewind';
import { FC, useMemo, useState } from 'react';

const NotificationsSettings: FC = () => {
  const { colorScheme } = useColorScheme();

  const [programNotify, setProgramNotify] = useState(false);
  const [messagesNotify, setMessagesNotification] = useState(false);
  const [photosNotify, setPhotosNotify] = useState(false);

  const data: SettingsSwitchLineProps[] = useMemo(
    () => [
      {
        text: 'Program',
        icon: icons.calendar,
        value: programNotify,
        onValueChange: setProgramNotify
      },
      {
        text: 'Správy',
        icon: icons.message,
        value: messagesNotify,
        onValueChange: setMessagesNotification
      },
      {
        text: 'Fotky',
        icon: icons.gallery,
        value: photosNotify,
        onValueChange: setPhotosNotify
      },
    ],
    [programNotify, messagesNotify, photosNotify]
  );

  return (
    <SettingsBox title="Notifikácie" isClickable={false}>
      {data.map((item, index) => (
        <SettingsSwitchLine
          key={index}
          text={item.text}
          icon={item.icon}
          secondaryIcon={item.secondaryIcon}
          value={item.value}
          onValueChange={item.onValueChange}
          colorScheme={colorScheme}
          containerStyles={index !== data.length - 1 ? "border-b border-outline-500 px-5 py-3" : "px-5 py-3"}
        />
      ))}
    </SettingsBox>
  );
};

export default NotificationsSettings;