import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { SettingsSwitchLineProps } from '@/types/base';
import { useMemo } from 'react';
import { Image, Switch, Text, View } from 'react-native';

const SettingsSwitchLine = (props: SettingsSwitchLineProps) => {
  const { trackColorOff, trackColorOn, thumbColorOn, thumbColorOff } = useMemo(() => {

    const trackColorOff = getRGBColor('secondary', '50', props.colorScheme);
    const trackColorOn = getRGBColor('secondary', '300', props.colorScheme);

    const thumbColorOn = getRGBColor('tertiary', '200', props.colorScheme);
    const thumbColorOff = getRGBColor('primary', '200', props.colorScheme);

    return { trackColorOff, trackColorOn, thumbColorOn, thumbColorOff };
  }, [props.colorScheme]);

  return (
    <View className={`flex-row justify-between items-center ${props.containerStyles}`}>
      <View className='flex-row justify-center items-center gap-3 pl-1.5'>
        <Image
          source={props.value ? props.icon : (props.secondaryIcon ?? props.icon)}
          resizeMode="contain"
          tintColor={getRGBColor('typography', '950', props.colorScheme)}
          className="w-7 h-7"
        />
        <Text className='text-typography-950 text-md font-pregular'>{props.text}</Text>
      </View>
      <Switch
        value={props.value}
        onValueChange={props.onValueChange}
        trackColor={{ true: trackColorOn, false: trackColorOff }}
        thumbColor={props.value ? thumbColorOn : thumbColorOff}
        style={{ backgroundColor: "transparent" }}
      />
    </View>
  )
}

export default SettingsSwitchLine