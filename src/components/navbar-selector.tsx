'use client';

import { useState, useEffect, useRef } from 'react';
import NavbarClient from './navbar-client';
import DashboardNavbar from './dashboard-navbar';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabaseClient';
import { useRouter, usePathname } from 'next/navigation';

interface NavbarSelectorProps {
  user: User | null;
}

const supabase = createClient();

export default function NavbarSelector({ user: initialUser }: NavbarSelectorProps) {
  const [user, setUser] = useState<User | null | undefined>(initialUser);
  const router = useRouter();
  const pathname = usePathname();

  const initialLoad = useRef(true);

  // Always fetch user on client mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  // Handle auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      if (initialLoad.current) {
        initialLoad.current = false;
        return;
      }

      if (event === 'SIGNED_IN' && session?.user) {
        const manualLogin = sessionStorage.getItem('manual-login');

        // Only redirect if the login was triggered manually (not from session resume)
        if (manualLogin === 'true') {
          sessionStorage.removeItem('manual-login');

          if (pathname === '/' || pathname === '/sign-in' || pathname === '/sign-up') {
            router.push('/dashboard');
          }
        }
      }

      if (event === 'SIGNED_OUT') {
        if (pathname.startsWith('/dashboard')) {
          router.push('/');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  // Handle conditional redirects based on user + path
  useEffect(() => {
    if (user === undefined) return;

    if (user && (pathname === '/sign-in' || pathname === '/sign-up')) {
      router.replace('/dashboard');
      return;
    }

    if (!user && pathname.startsWith('/dashboard')) {
      router.replace('/');
      return;
    }

    // Allow staying on home page even when logged in
  }, [user, pathname, router]);

  if (user === undefined) {
    return null;
  }

  return user ? <DashboardNavbar user={user} /> : <NavbarClient user={null} />;
}
