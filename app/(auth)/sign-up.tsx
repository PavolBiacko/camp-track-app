import { SignUpData } from '@/types/form';
import { FC } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthForm from '@/components/AuthForm';

const SignUp: FC = () => {

  const submit = async (data: SignUpData) => {

    if (!data.email || !data.password || !data.passwordCheck) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    // await createUser(signUpData.username, signUpData.email, signUpData.password);

    // set it to global state

    // router.replace("/home");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <AuthForm<SignUpData>
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
