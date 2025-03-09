import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { images } from "@/constants"
import { useCapitalizeWord } from '@/hooks/useUtilHooks'
import { AuthFormProps } from '@/types/form'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'

const AuthForm = ({ title, fields, initialValues, onSubmit, linkData }: AuthFormProps) => {

  const [form, setForm] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={0}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="w-full min-h-[90vh] justify-center px-4 my-6">
          <Image source={images.logowithtext} resizeMode="contain" className="self-center w-[300px] h-[100px]" />
          <Text className="text-2xl text-white mt-5 font-pbold">{title}</Text>

          {fields.map(({ title, formDataTypeKey, placeholder, otherStyles }) => (
            <FormField
              key={title}
              title={useCapitalizeWord(title)!}
              formDataTypeKey={formDataTypeKey}
              value={form[formDataTypeKey]}
              placeholder={placeholder}
              handleChangeText={(e: string) => setForm({ ...form, [formDataTypeKey]: e })}
              otherStyles={otherStyles || "mt-7"}
            />
          ))}

          <CustomButton
            title={title}
            handlePress={handleSubmit}
            isPrimary={true}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray font-pregular">{linkData.prelinkText}</Text>
            <Link href={linkData.linkHref} className="text-lg font-psemibold text-secondary">
              {linkData.linkText}
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AuthForm
