import { SwitchableButtonProps } from '@/types/custom/button'
import { Text, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'

const SwitchableButton = ({ item, action, isSelected, handleAction }: SwitchableButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleAction}
      className={twMerge(
        "border p-4",
        isSelected
          ? `bg-${action}-300 border-${action}-700`
          : "bg-background-300 border-outline-700"
      )}>
      <Text className="text-typography-950 text-xl text-center font-psemibold pt-1">
        {item.showedText}
      </Text>
      {item.helperText && (
        <Text className="text-typography-700 text-xs text-center font-pregular pt-1">
          {item.helperText}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default SwitchableButton