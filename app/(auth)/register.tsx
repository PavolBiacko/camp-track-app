import AuthForm from '@/components/AuthForm';
import { supabase } from '@/services/supabaseClient';
import { AuthFormData } from '@/types/form';
import { signUpSchema } from '@/validation/auth';
import { router } from 'expo-router';
import { FC } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register: FC = () => {

  const submit = async (data: AuthFormData) => {

    // Data are valid, checked with Zod

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      Alert.alert("Pozor!", error.message);
      return;
    }

    router.replace("/home");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
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
