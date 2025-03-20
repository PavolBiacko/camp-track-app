import AuthForm from '@/components/ui/AuthForm';
import authRepository from '@/repositories/authRepository';
import { AuthFormData } from '@/types/form';
import { signUpSchema } from '@/validation/auth';
import { router } from 'expo-router';
import { FC } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register: FC = () => {

  const submit = async (data: AuthFormData) => {
    // Data are valid, checked with Zod
    try {
      await authRepository.register(data.email, data.password);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <SafeAreaView className="bg-background-0 h-full">
      <AuthForm
        title="Zaregistruj sa"
        fields={[
          { title: "email", formDataTypeKey: "email" },
          { title: "heslo", formDataTypeKey: "password" },
          { title: "potvrdenie hesla", formDataTypeKey: "passwordCheck" }
        ]}
        initialValues={{ email: "", password: "", passwordCheck: "" }}
        validationSchema={signUpSchema}
        onSubmit={submit}
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
