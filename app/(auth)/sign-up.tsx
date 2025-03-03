import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthForm from '@/components/AuthForm';
import { FormData, SignUpData } from '@/types/types';
import { Alert } from 'react-native';

const SignUp: FC = () => {

  const submit = async (data: FormData) => {

    const signUpData = data as SignUpData;
    if (!signUpData.username || !signUpData.email || !signUpData.password) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    // await createUser(signUpData.username, signUpData.email, signUpData.password);

    // set it to global state

    // router.replace("/home");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <AuthForm
        title="Zaregistruj sa"
        fields={[
          { title: "email", keyboardType: "email" },
          { title: "heslo", keyboardType: "password" },
          { title: "potvrdenie hesla", keyboardType: "password" }
        ]}
        initialValues={{ username: "", email: "", password: "" }}
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
