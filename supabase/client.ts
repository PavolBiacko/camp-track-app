import { Database } from '@/supabase/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState, Platform } from 'react-native'

const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: Platform.OS !== 'web',
      detectSessionInUrl: false,
    },
  }
)

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default supabase