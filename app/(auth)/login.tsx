import AuthForm from '@/components/custom/AuthForm';
import { authRepository } from '@/repositories/authRepository';
import { AuthFormData } from '@/types/custom/form';
import { signInSchema } from '@/validation/auth';
import { router } from 'expo-router';
import { FC } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login: FC = () => {

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
    <SafeAreaView className="h-full">
      <AuthForm
        title="Prihlás sa"
        showImage={true}
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
    </SafeAreaView>
  );
};

export default Login;
