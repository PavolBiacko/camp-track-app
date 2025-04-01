import ScheduleForm from '@/components/custom/schedule/ScheduleForm'
import { images } from '@/constants'
import { authRepository } from '@/repositories/authRepository'
import { AuthFormData } from '@/types/custom/form'
import { ScheduleParams } from '@/types/schedule'
import { signInSchema } from '@/validation/auth'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Alert, View } from 'react-native'

const Activity = () => {
  const params = useLocalSearchParams<ScheduleParams>()

  const handleLogin = async (data: AuthFormData) => {
    // Data are valid, checked with Zod
    try {
      await authRepository.login({ email: data.email, password: data.password });
      router.replace("/(main)/(tabs)");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <View>
      <ScheduleForm
        title="Prihlás sa"
        image={images.logowithtext}
        fields={[
          { title: "email", formDataTypeKey: "email" },
          { title: "heslo", formDataTypeKey: "password" }
        ]}
        initialValues={{ email: "", password: "" }}
        validationSchema={signInSchema}
        onSubmit={handleLogin}
        linkData={{
          prelinkText: "Nemáš účet?",
          linkText: "Zaregistruj sa",
          linkHref: "/register"
        }}
      />
    </View>
  )
}

export default Activity