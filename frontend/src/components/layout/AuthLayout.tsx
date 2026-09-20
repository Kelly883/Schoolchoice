import { type ReactNode } from 'react';
import Link from 'next/link';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="bg-white border-b border-neutral-200">
        <div className="container-wide h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-display font-bold text-xl text-neutral-900">SchoolName</span>
          </Link>
        </div>
      </header>
      <main id="main-content" className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
