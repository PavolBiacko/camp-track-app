import { CircleIcon } from '@/components/ui/icon'
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@/components/ui/radio'
import { CustomRadioGroupProps } from '@/types/custom/radio'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const CustomRadioGroup = <T extends FieldValues>({ direction = "row", ...props }: CustomRadioGroupProps<T>) => {
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
                "border-2 border-outline-500 rounded-2xl justify-center items-center gap-5 py-5",
                props.otherStyles
              )}
            value={value}
            onChange={(newValue) => onChange(newValue)}>
            {props.radioOptions.map((options, index) => (
              <Radio key={index} size="lg" value={options.value}>
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel className='text-typography-950 text-xl font-psemibold'>
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