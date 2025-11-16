//    src\components\ClientWrapper.tsx


'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

const supabase = createClient();

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
