import AuthForm from '@/components/AuthForm';
import { SignInData } from '@/types/form';
import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn: FC = () => {

  const submit = async (data: SignInData) => {

    if (!data.email || !data.password) {
      throw new Error("Nechal si niektoré polia prázdne.");
    }

    // TODO - implement supabase auth

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
