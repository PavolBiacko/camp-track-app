import { SignInData } from '@/types/form';
import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthForm from '@/components/AuthForm';

const SignIn: FC = () => {

  const submit = async (data: SignInData) => {

    if (!data.email || !data.password) {
      throw new Error("Nechal si niektoré polia prázdne.");
    }

    // await signIn(data.email, data.password);

    // set it to global state

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
