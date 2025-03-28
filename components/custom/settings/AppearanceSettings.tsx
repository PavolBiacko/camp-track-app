import SettingsBox from '@/components/custom/settings/base/SettingsBox';
import SettingsSwitchLine from '@/components/custom/settings/base/SettingsSwitchLine';
import { icons } from '@/constants'; // Adjust path as needed
import { SettingsSwitchLineProps } from '@/types/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import { FC, useEffect, useMemo, useState } from 'react';

const NotificationsSettings: FC = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  const data: SettingsSwitchLineProps[] = useMemo(
    () => [
      {
        text: 'Tmavý mód',
        secondaryText: 'Svetlý mód',
        icon: icons.darkMode,
        secondaryIcon: icons.lightMode,
        value: isDarkMode,
        onValueChange: setIsDarkMode
      },
    ],
    [isDarkMode]
  );

  useEffect(() => {
    setColorScheme(isDarkMode ? "dark" : "light");
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("colorScheme", colorScheme?.toString() || "system");
      } catch (error) {
        console.error('Failed to save theme to AsyncStorage:', error);
      }
    };
    saveTheme();
  }, [isDarkMode, colorScheme]);

  return (
    <SettingsBox title="Vzhľad" isClickable={false}>
      {data.map((item, index) => (
        <SettingsSwitchLine
          key={index}
          text={item.text}
          secondaryText={item.secondaryText}
          icon={item.icon}
          secondaryIcon={item.secondaryIcon}
          value={item.value}
          onValueChange={item.onValueChange}
          colorScheme={colorScheme}
          containerStyles={index !== data.length - 1 ? "border-b border-outline-500" : ""}
        />
      ))}
    </SettingsBox>
  );
};

export default NotificationsSettings;