import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthForm from '@/components/AuthForm';
import { SignInData } from '@/types/types';
import { Alert } from 'react-native';

const SignIn: FC = () => {

  const submit = async (data: SignInData) => {

    if (!data.email || !data.password) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    // await signIn(data.email, data.password);

    // set it to global state

    // router.replace("/home");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <AuthForm
        title="Log in"
        fields={[
          { title: "email", placeholder: "email@email.com", keyboardType: "email-address" },
          { title: "password", placeholder: "password123" }
        ]}
        initialValues={{ email: "", password: "" }}
        onSubmit={submit}
        linkData={{
          prelinkText: "Don't have an account?", linkText: "Sign Up", linkHref: "/sign-up"
        }}
      />
    </SafeAreaView>
  );
};

export default SignIn;
