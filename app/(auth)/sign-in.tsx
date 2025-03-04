import { SignInData } from '@/types/form';
import { router } from 'expo-router';
import { FC } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthForm from '@/components/AuthForm';

const SignIn: FC = () => {

  const submit = async (data: SignInData) => {

    if (!data.email || !data.password) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
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
