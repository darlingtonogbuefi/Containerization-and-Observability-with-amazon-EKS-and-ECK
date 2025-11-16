// src/components/navbar-client.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import type { User } from "@supabase/supabase-js";
import { useRouter, usePathname } from "next/navigation";

export default function NavbarClient({ user }: { user: User | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTryForFree = () => {
    if (pathname === "/") {
      const input = document.getElementById("search-input");
      if (input) {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          (input as HTMLInputElement).focus();
        }, 500);
      }
      setMobileMenuOpen(false);
    } else {
      router.push("/?tryForFree=1");
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white py-5 transition-shadow ${
        isScrolled ? "shadow-[0_2px_8px_rgba(75,0,130,0.4)]" : "shadow-none"
      }`}
    >
      <div className="relative px-4 flex items-center justify-between">
        {/* Logo on far left */}
        <Link href="/" className="flex items-center">
          <Image
            src="/cribr-logo.jpg"
            alt="Cribr Logo"
            width={60}
            height={14}
            priority
          />
        </Link>

        {/* Centered Nav Links */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-6 text-sm font-medium text-gray-700">
          <Link href="/#features" className="hover:text-gray-900">
            Features
          </Link>
          <Link href="/#pricing" className="hover:text-gray-900">
            Pricing
          </Link>
          <Link href="/pages/about" className="hover:text-gray-900">
            About
          </Link>
          <Link href="/#faq" className="hover:text-gray-900">
            FAQ
          </Link>
          <Link href="/pages/contact" className="hover:text-gray-900">
            Contact Us
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-800 hover:border-purple-700 hover:bg-gray-100 rounded-md"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="bg-black hover:bg-gray-900 text-white rounded-md px-3 py-1"
                >
                  Sign Up
                </Button>
              </Link>
            </div>

            <Button
              size="sm"
              className="bg-black hover:bg-gray-900 text-white rounded-md px-3 py-1 ml-4"
              onClick={handleTryForFree}
            >
              Try for Free
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-in slide-in-from-top fade-in absolute top-full left-0 w-full bg-white shadow-md z-40 px-6 py-4">
          <div className="flex flex-col items-stretch gap-4 w-full text-sm font-medium text-gray-700">
            <Link href="/#features" onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/pages/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/#faq" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </Link>
            <Link
              href="/pages/contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>

            {!user ? (
              <>
                <Link
                  href="/sign-in"
                  passHref
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full px-0 rounded-md"
                  >
                    <a className="block w-full text-center px-4">Sign In</a>
                  </Button>
                </Link>

                <Link
                  href="/sign-up"
                  passHref
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    asChild
                    size="sm"
                    className="w-full px-0 bg-black text-white hover:bg-gray-900 rounded-md"
                  >
                    <a className="block w-full text-center px-4">Sign Up</a>
                  </Button>
                </Link>

                <Button
                  size="sm"
                  className="w-full px-0 bg-black text-white hover:bg-gray-900 rounded-md"
                  onClick={handleTryForFree}
                >
                  Try for Free
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    size="sm"
                    className="w-full rounded-md bg-gray-200 px-3 py-2"
                  >
                    Dashboard
                  </Button>
                </Link>
                <UserProfile />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
