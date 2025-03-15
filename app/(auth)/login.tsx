import AuthForm from '@/components/AuthForm';
import { supabase } from '@/services/supabaseClient';
import { AuthFormData } from '@/types/form';
import { signInSchema } from '@/validation/auth';
import { router } from 'expo-router';
import { FC } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login: FC = () => {

  const submit = async (data: AuthFormData) => {

    // Data are valid, checked with Zod

    const { error } = await supabase.auth.signInWithPassword({
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
