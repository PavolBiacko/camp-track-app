import AuthForm from '@/components/AuthForm';
import { supabase } from '@/services/supabaseClient';
import { AuthFormData } from '@/types/form';
import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn: FC = () => {

  const submit = async (data: AuthFormData) => {

    if (!data.email || !data.password) {
      throw new Error("Nechal si niektoré polia prázdne.");
    }

    const { error } = await supabase.auth.signInWithPassword({
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
        title="Prihlás sa"
        fields={[
          { title: "email", formDataTypeKey: "email" },
          { title: "heslo", formDataTypeKey: "password" }
        ]}
        initialValues={{ email: "", password: "" }}
        onSubmit={submit}
        linkData={{
          prelinkText: "Nemáš účet?",
          linkText: "Zaregistruj sa",
          linkHref: "/sign-up"
        }}
      />
    </SafeAreaView>
  );
};

export default SignIn;
