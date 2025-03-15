import supabase from '@/services/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      // console.log("Load Session Start");
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
      // console.log("Load Session End");
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // console.log("On Auth State Change Start");
      setSession(session);
      setIsLoading(false);
      // console.log("On Auth State Change End");
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, isLoading };
};

export default useAuth;
