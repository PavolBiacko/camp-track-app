import CustomForm from '@/components/custom/CustomForm'
import { authRepository } from '@/repositories/authRepository'
import { RegisterFormData } from '@/types/auth'
import { ScheduleParams } from '@/types/schedule'
import { registerSchema } from '@/validation/auth'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Alert } from 'react-native'

const Activity = () => {
  const params = useLocalSearchParams<ScheduleParams>()

  const handleLogin = async (data: RegisterFormData) => {
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
    <CustomForm
      title={params.mode === "add" ? "Pridaj aktivitu" : "Uprav aktivitu"}
      fields={[
        { title: "email", formDataTypeKey: "email" },
        { title: "heslo", formDataTypeKey: "password" }
      ]}
      initialValues={{ email: "", password: "" }}
      validationSchema={registerSchema}
      onSubmit={handleLogin}
    />
  )
}

export default Activity