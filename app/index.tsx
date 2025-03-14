import useAuth from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="bg-primary flex-1 justify-center">
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    );
  }

  if (session) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/welcome" />;
  }
}