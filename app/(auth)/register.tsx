import CustomForm from '@/components/custom/CustomForm';
import { images } from '@/constants';
import { authRepository } from '@/repositories/authRepository';
import { RegisterFormData } from '@/types/auth';
import { registerSchema } from '@/validation/auth';
import { AuthError } from '@supabase/supabase-js';
import { router } from 'expo-router';
import { FC } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register: FC = () => {

  const handleRegister = async (data: RegisterFormData) => {
    // Data are valid, checked with Zod
    try {
      await authRepository.register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      router.replace("/(main)/(tabs)");
    } catch (error: any) {
      if (error instanceof AuthError && error.code === "user_already_exists") {
        Alert.alert("Pozor!", "Účet s týmto emailom už existuje.");
        return;
      }
      Alert.alert("Pozor!", "Neznáma chyba pri registrácii.");
    }
  };

  return (
    <SafeAreaView className="h-full">
      <CustomForm
        title="Zaregistruj sa"
        image={images.logowithtext}
        fields={[
          { title: "meno", formDataTypeKey: "firstName" },
          { title: "priezvisko", formDataTypeKey: "lastName" },
          { title: "email", formDataTypeKey: "email" },
          { title: "heslo", formDataTypeKey: "password" },
          { title: "potvrdenie hesla", formDataTypeKey: "passwordCheck" }
        ]}
        initialValues={{ firstName: "", lastName: "", email: "", password: "", passwordCheck: "" }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
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
