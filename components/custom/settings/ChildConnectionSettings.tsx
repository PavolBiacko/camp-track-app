import CustomButton from '@/components/custom/CustomButton';
import CustomModal from '@/components/custom/CustomModal';
import FormField from '@/components/custom/FormField';
import SettingsBox from '@/components/custom/settings/base/SettingsBox';
import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { icons } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { UserRoles } from '@/types/enums/roles';
import { ChildConnectData } from '@/types/settings';
import { childAccessCodeSchema } from '@/validation/parents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

const ChildConnectionSettings = () => {
  const { user } = useAuth();
  const { colorScheme } = useColorScheme();
  const { control, register, handleSubmit, reset, watch, formState: { errors } } = useForm<ChildConnectData>({
    defaultValues: { accessCode: "" },
    resolver: zodResolver(childAccessCodeSchema),
  });

  const [modalVisible, setModalVisible] = useState(false);

  if (!user) {
    return null;  // should not happen, but just in case
  }

  const onChildAdd = (data: ChildConnectData) => {
    reset();
  };

  return (
    <SettingsBox title="Pridanie dieťaťa" isClickable={false} containerStyles='p-5 gap-5'>
      <View className='flex-row w-full items-center justify-between'>
        <FormField
          formDataTypeKey={"accessCode"}
          control={control}
          register={register}
          error={errors.accessCode}
          autoCapitalize='characters'
          maxLength={8}
          placeholder='ABCDEFGH'
          otherStyles='w-[72.5%]'
        />
        <CustomButton
          icon={icons.addChild}
          iconStyles='w-10 h-10'
          iconTintColor={getRGBColor("typography", "800", colorScheme)}
          action='tertiary'
          handlePress={() => setModalVisible(true)}
          containerStyles='w-[22.5%] h-16 rounded-2xl'
          isDisabled={user.role === UserRoles.GROUP_LEADER || user.role === UserRoles.CAMP_LEADER}
        />
      </View>
      <CustomModal
        title='Naozaj chceš pridať dieťa?'
        subTitle={"Kód: " + watch("accessCode")}
        type='confirmation'
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirm={handleSubmit(onChildAdd)}
        containerStyles='w-3/4'
      />
    </SettingsBox>
  )
}

export default ChildConnectionSettings