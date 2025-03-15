import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { Redirect } from "expo-router";

export default function App() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (session) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/welcome" />;
  }
}