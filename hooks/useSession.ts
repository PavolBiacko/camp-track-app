import supabase from '@/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, isLoading };
};
