//   src\components\footer.tsx

// src/components/footer.tsx

import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";
import type { User } from '@supabase/supabase-js';

interface FooterProps {
  user: User | null;
}

export default function Footer({ user }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Top grid section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 justify-items-center text-center">
          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="text-gray-600 hover:text-blue-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-600 hover:text-blue-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href={user ? "/dashboard" : "/sign-in"} className="text-gray-600 hover:text-blue-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pages/api-info" className="text-gray-600 hover:text-blue-600">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pages/about" className="text-gray-600 hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pages/blog" className="text-gray-600 hover:text-blue-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/pages/careers" className="text-gray-600 hover:text-blue-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/pages/press" className="text-gray-600 hover:text-blue-600">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pages/documentation" className="text-gray-600 hover:text-blue-600">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/pages/help-center" className="text-gray-600 hover:text-blue-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/pages/community" className="text-gray-600 hover:text-blue-600">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/pages/status" className="text-gray-600 hover:text-blue-600">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pages/privacy" className="text-gray-600 hover:text-blue-600">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/pages/terms" className="text-gray-600 hover:text-blue-600">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/pages/security" className="text-gray-600 hover:text-blue-600">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/pages/cookies" className="text-gray-600 hover:text-blue-600">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center pt-8 border-t border-gray-200 text-center">
          <div className="text-gray-600 mb-4">
            © {currentYear} cribr.co.uk All rights reserved.
            <div className="text-xs text-gray-400 mt-1 max-w-xl">
              <p>
                Cribr.co.uk is an independent pet project and is not affiliated with, endorsed by, or sponsored by YouTube, Google, or any other company.
              </p>
              <p>
                All product names, logos, and brands are the property of their respective owners.
              </p>
            </div>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://twitter.com/cribrapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/darlington-ogbuefi-310251259/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/darlingtonogbuefi/containerize_and_deployto_k8s.git"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
