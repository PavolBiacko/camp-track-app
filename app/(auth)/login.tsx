import CustomForm from '@/components/custom/CustomForm';
import { images } from '@/constants';
import { authRepository } from '@/repositories/authRepository';
import { LoginFormData } from '@/types/auth';
import { loginSchema } from '@/validation/auth';
import { AuthError } from '@supabase/supabase-js';
import { router } from 'expo-router';
import { FC } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login: FC = () => {

  const handleLogin = async (data: LoginFormData) => {
    // Data are valid, checked with Zod
    try {
      await authRepository.login({ email: data.email, password: data.password });
      router.replace("/(main)/(tabs)");
    } catch (error: any) {
      if (error instanceof AuthError && error.code === "invalid_credentials") {
        Alert.alert("Pozor!", "Zadané údaje sú nesprávne");
        return;
      }
      Alert.alert("Pozor!", "Neznáma chyba pri prihlásení.");
    }
  };

  return (
    <SafeAreaView className="h-full">
      <CustomForm
        title="Prihlás sa"
        image={images.logowithtext}
        fields={[
          { title: "email", formDataTypeKey: "email" },
          { title: "heslo", formDataTypeKey: "password" }
        ]}
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
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
