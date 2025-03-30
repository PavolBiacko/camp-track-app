import AuthForm from '@/components/custom/AuthForm';
import { authRepository } from '@/repositories/authRepository';
import { AuthFormData } from '@/types/custom/form';
import { signUpSchema } from '@/validation/auth';
import { router } from 'expo-router';
import { FC } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register: FC = () => {

  const handleRegister = async (data: AuthFormData) => {
    // Data are valid, checked with Zod
    try {
      await authRepository.register({
        email: data.email,
        password: data.password,
        firstName: data.firstName!,
        lastName: data.lastName!,
      });
      router.replace("/(main)/(tabs)");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <SafeAreaView className="h-full">
      <AuthForm
        title="Zaregistruj sa"
        showImage={true}
        fields={[
          { title: "meno", formDataTypeKey: "firstName" },
          { title: "priezvisko", formDataTypeKey: "lastName" },
          { title: "email", formDataTypeKey: "email" },
          { title: "heslo", formDataTypeKey: "password" },
          { title: "potvrdenie hesla", formDataTypeKey: "passwordCheck" }
        ]}
        initialValues={{ firstName: "", lastName: "", email: "", password: "", passwordCheck: "" }}
        validationSchema={signUpSchema}
        onSubmit={handleRegister}
        linkData={{
          prelinkText: "Už máš účet?",
          linkText: "Prihlás sa",
          linkHref: ".."  // /login (it could cause infinite loop)
        }}
      />
    </SafeAreaView>
  );
};

export default Register;
