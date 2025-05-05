import { CircleIcon } from '@/components/ui/icon'
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@/components/ui/radio'
import { CustomRadioGroupProps } from '@/types/custom/radio'
import { useColorScheme } from 'nativewind'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { getRGBColor } from '../ui/gluestack-ui-provider/colors'

const CustomRadioGroup = <T extends FieldValues>({ direction = "row", ...props }: CustomRadioGroupProps<T>) => {
  const { colorScheme } = useColorScheme();

  return (
    <Controller
      control={props.control}
      name={props.formDataTypeKey as Path<T>}
      render={({ field: { onChange, value } }) => (
        <View className={props.containterStyles}>
          <Text className='text-typography-950 text-md font-psemibold'>
            {props.title}
          </Text>
          <RadioGroup
            className={
              twMerge(
                (direction === "row") ? "flex-row" : "flex-col",
                "border-2 border-outline-500 rounded-2xl justify-center items-center py-2",
                props.otherStyles
              )}
            value={value}
            onChange={(newValue) => onChange(newValue)}>
            {props.radioOptions.map((options, index) => (
              <Radio key={index} size="lg" value={options.value} className={`w-[35%] flex-col pt-1`}>
                <RadioIndicator className='w-8 h-8' style={{ borderColor: getRGBColor("outline", "500", colorScheme) }}>
                  <RadioIcon as={CircleIcon} className='fill-secondary-500 text-secondary-500 w-6 h-6' />
                </RadioIndicator>
                <RadioLabel className='text-typography-950 text-lg font-psemibold'>
                  {options.label}
                </RadioLabel>
              </Radio>
            ))}
          </RadioGroup>
          {props.error && (
            <Text className="text-error-500 text-center font-plight mt-1">
              {props.error.message}
            </Text>
          )}
        </View>
      )}
    />
  )
}

export default CustomRadioGroup