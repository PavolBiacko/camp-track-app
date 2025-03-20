import AuthForm from '@/components/ui/AuthForm';
import authRepository from '@/repositories/authRepository';
import { AuthFormData } from '@/types/form';
import { signInSchema } from '@/validation/auth';
import { router } from 'expo-router';
import { FC } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login: FC = () => {

  const submit = async (data: AuthFormData) => {
    // Data are valid, checked with Zod
    try {
      await authRepository.login(data.email, data.password);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <SafeAreaView className="bg-background-0 h-full">
      <AuthForm
        title="Prihlás sa"
        fields={[
          { title: "email", formDataTypeKey: "email" },
          { title: "heslo", formDataTypeKey: "password" }
        ]}
        initialValues={{ email: "", password: "" }}
        validationSchema={signInSchema}
        onSubmit={submit}
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
