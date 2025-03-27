import Loading from '@/components/custom/Loading';
import { useSession } from '@/hooks/useSession';
import { Redirect } from 'expo-router';
import React from 'react';

export default function App() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <Loading showText={true} />
    );
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(auth)" />;
  }
}
