import Loading from '@/components/Loading';
import { useSession } from '@/hooks/useSession';
import { Redirect } from 'expo-router';
import React from 'react';

export default function App() {
  const { session, isLoading } = useSession();

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
