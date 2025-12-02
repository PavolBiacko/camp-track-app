import CustomButton from "@/components/custom/CustomButton";
import CustomModal from "@/components/custom/CustomModal";
import FormField from "@/components/custom/FormField";
import { FormProps } from "@/types/custom/form";
import { GroupChatUpdate } from "@/types/models/groupChats";
import { getChatSettingsFormFields } from "@/utils/messages";
import { capitalizeWord } from "@/utils/strings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldError, FieldErrors, useForm } from "react-hook-form";
import { Text, View } from "react-native";

const MessagesSettingsForm = <T extends GroupChatUpdate>(
  props: FormProps<T>
) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<T>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema),
  });
  const { titleField } = getChatSettingsFormFields<T>(props.fields);

  return (
    <View className="w-full justify-center">
      <Text className="text-typography-950 text-2xl mt-5 font-pbold">
        {props.title}
      </Text>

      <FormField
        title={capitalizeWord(titleField.title)!}
        control={control}
        register={register}
        error={
          errors[titleField.formDataTypeKey as keyof FieldErrors<T>] as
            | FieldError
            | undefined
        }
        formDataTypeKey={titleField.formDataTypeKey}
        placeholder={titleField.placeholder}
        otherStyles={titleField.otherStyles || "mt-4"}
      />

      {/* submit the child */}
      <CustomButton
        title={props.buttonText || props.title}
        handlePress={() => setModalVisible(true)}
        textStyles="text-2xl"
        containerStyles="h-[4.5rem] rounded-3xl mt-10"
      />
      <CustomModal
        title="Naozaj chceš vykonať akciu?"
        type="confirmation"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirm={handleSubmit(props.onSubmit)}
        containerStyles="w-3/4"
      />
    </View>
  );
};

export default MessagesSettingsForm;
