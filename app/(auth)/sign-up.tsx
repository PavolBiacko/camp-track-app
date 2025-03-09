import AuthForm from '@/components/AuthForm';
import { supabase } from '@/services/supabaseClient';
import { AuthFormData } from '@/types/form';
import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp: FC = () => {

  const submit = async (data: AuthFormData) => {

    if (!data.email || !data.password || !data.passwordCheck) {
      throw new Error("Nechal si niektoré polia prázdne.");
    }

    if (data.password !== data.passwordCheck) {
      throw new Error("Heslá sa nezhodujú.");
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw new Error(error.message);
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
        onSubmit={submit}
        linkData={{
          prelinkText: "Už máš účet?",
          linkText: "Prihlás sa",
          linkHref: ".."  // /sign-in (it could cause infinite loop)
        }}
      />
    </SafeAreaView>
  );
};

export default SignUp;
