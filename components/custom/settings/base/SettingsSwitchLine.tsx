import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { useSwitchColors } from '@/hooks/useSwitchColors';
import { SettingsSwitchLineProps } from '@/types/settings';
import { Image, Switch, Text, View } from 'react-native';

const SettingsSwitchLine = (props: SettingsSwitchLineProps) => {
  const { trackColorOff, trackColorOn, thumbColorOn, thumbColorOff } = useSwitchColors(props.colorScheme);

  return (
    <View className={`flex-row justify-between items-center px-5 h-20 ${props.containerStyles}`}>
      <View className='flex-row justify-center items-center gap-3 pl-1.5'>
        <Image
          source={props.value ? props.icon : (props.secondaryIcon ?? props.icon)}
          resizeMode="contain"
          tintColor={getRGBColor('typography', '950', props.colorScheme)}
          className="w-7 h-7"
        />
        <Text className='text-typography-950 text-md font-pregular mt-1'>
          {props.value ? props.text : (props.secondaryText ?? props.text)}
        </Text>
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