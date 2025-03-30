import CustomButton from '@/components/custom/CustomButton'
import FormField from '@/components/custom/FormField'
import { images } from "@/constants"
import { AuthFormData, AuthFormProps } from '@/types/custom/form'
import { capitalizeWord } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'expo-router'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Image, ScrollView, Text, View } from 'react-native'

const AuthForm: FC<AuthFormProps> = (props) => {

  const { control, handleSubmit, register, formState: { isSubmitting, errors } } = useForm<AuthFormData>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })

  return (
    <ScrollView keyboardShouldPersistTaps="handled" >
      <View className="w-full min-h-[90vh] justify-center px-4 my-6">
        {props.showImage && <Image source={images.logowithtext} resizeMode="contain" className="self-center w-[300px] h-[100px]" />}
        <Text className="text-typography-950 text-2xl mt-5 font-pbold">{props.title}</Text>

        {props.fields.map((field) => (
          <FormField
            key={field.title}
            title={capitalizeWord(field.title)!}
            control={control}
            register={register}
            error={errors[field.formDataTypeKey]}
            formDataTypeKey={field.formDataTypeKey}
            placeholder={field.placeholder}
            otherStyles={field.otherStyles || "mt-7"}
          />
        ))}

        <CustomButton
          title={props.title}
          handlePress={handleSubmit(props.onSubmit)}
          containerStyles="mt-7 h-[4.5rem] rounded-3xl"
          isLoading={isSubmitting}
        />

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-typography-700 text-lg font-pregular">{props.linkData.prelinkText}</Text>
          <Link href={props.linkData.linkHref} className="text-primary-500 text-lg font-psemibold">
            {props.linkData.linkText}
          </Link>
        </View>
      </View>
    </ScrollView>
  )
}

export default AuthForm
