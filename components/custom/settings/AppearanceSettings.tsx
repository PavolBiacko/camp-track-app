import SettingsBox from '@/components/custom/settings/base/SettingsBox';
import SettingsSwitchLine from '@/components/custom/settings/base/SettingsSwitchLine';
import { icons } from '@/constants'; // Adjust path as needed
import { ColorSchemeProps, SettingsSwitchLineProps } from '@/types/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';

const NotificationsSettings = (props: ColorSchemeProps) => {
  const [isDarkMode, setIsDarkMode] = useState(props.colorScheme === "dark");

  const data: SettingsSwitchLineProps[] = useMemo(
    () => [
      {
        text: 'Tmavý mód',
        icon: icons.darkMode,
        secondaryIcon: icons.lightMode,
        value: isDarkMode,
        onValueChange: setIsDarkMode
      },
    ],
    [isDarkMode]
  );

  useEffect(() => {
    props.setColorScheme && props.setColorScheme(isDarkMode ? "dark" : "light");
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("colorScheme", props.colorScheme?.toString() || "system");
      } catch (error) {
        console.error('Failed to save theme to AsyncStorage:', error);
      }
    };
    saveTheme();
  }, [isDarkMode, props.colorScheme]);

  return (
    <SettingsBox title="Vzhľad" isClickable={false}>
      {data.map((item, index) => (
        <SettingsSwitchLine
          key={index}
          text={item.text}
          icon={item.icon}
          secondaryIcon={item.secondaryIcon}
          value={item.value}
          onValueChange={item.onValueChange}
          colorScheme={props.colorScheme}
          containerStyles={index !== data.length - 1 ? "border-b border-outline-500 px-5 py-3" : "px-5 py-3"}
        />
      ))}
    </SettingsBox>
  );
};

export default NotificationsSettings;