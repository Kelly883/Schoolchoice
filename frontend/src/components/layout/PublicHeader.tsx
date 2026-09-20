'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Student Life', href: '/student-life' },
  { name: 'Facilities', href: '/facilities' },
  { name: 'News', href: '/news' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
];

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-xl text-neutral-900">SchoolName</span>
              <span className="block text-xs text-neutral-500 -mt-1">Excellence in Education</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/admissions/apply" className="btn-primary btn-sm">
              Apply Now
            </Link>
            <Link href="/school-tour" className="btn-outline btn-sm">
              Book a Tour
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 py-4">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-2 mt-4 pt-4 border-t border-neutral-200">
                <Link href="/admissions/apply" className="btn-primary btn-sm flex-1">
                  Apply Now
                </Link>
                <Link href="/school-tour" className="btn-outline btn-sm flex-1">
                  Book a Tour
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
