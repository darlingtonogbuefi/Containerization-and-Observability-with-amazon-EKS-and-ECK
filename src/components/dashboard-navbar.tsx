// src\components\dashboard-navbar.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabaseClient';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';

interface DashboardNavbarProps {
  user: User;
}

export default function DashboardNavbar({ user }: DashboardNavbarProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function handleSignOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      alert('Error signing out: ' + error.message);
      return;
    }

    router.push('/');
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white py-4 transition-shadow ${
        isScrolled ? 'shadow-[0_2px_8px_rgba(75,0,130,0.4)]' : 'shadow-none'
      }`}
    >
      <div className="relative px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/cribr-logo.jpg" alt="Cribr Logo" width={60} height={14} priority />
        </Link>

        {/* Centered Nav Links - Desktop only */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-6 text-sm font-medium text-gray-700">
          <Link href="/#features" className="hover:text-gray-900">Features</Link>
          <Link href="/#pricing" className="hover:text-gray-900">Pricing</Link>
          <Link href="/pages/about" className="hover:text-gray-900">About</Link>
          <Link href="/#faq" className="hover:text-gray-900">FAQ</Link>
          <Link href="/pages/contact" className="hover:text-gray-900">Contact Us</Link>
        </div>

        {/* Right side - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard">
            <Button
              size="sm"
              className="bg-black hover:bg-gray-900 text-white rounded-md px-3 py-1"
            >
              Dashboard
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={loading}>
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
                {loading ? 'Signing out...' : 'Sign out'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-in slide-in-from-top fade-in absolute top-full left-0 w-full bg-white shadow-md z-40 px-6 py-4">
          <div className="flex flex-col gap-4 text-sm font-medium text-gray-700">
            <Link href="/#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/pages/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            <Link href="/pages/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>

            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="w-full bg-black text-white hover:bg-gray-900 rounded-md">
                Dashboard
              </Button>
            </Link>

            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                handleSignOut();
              }}
              size="sm"
              className="w-full bg-gray-100 text-black hover:bg-gray-200 rounded-md"
              disabled={loading}
            >
              {loading ? 'Signing out...' : 'Sign out'}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
