'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';

const publicPaths = ['/', '/login', '/register', '/reset-password', '/about', '/academics', '/admissions', '/school-tour', '/student-life', '/facilities', '/achievements', '/gallery', '/news', '/events', '/contact', '/faq', '/privacy', '/terms'];

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(path + '/'));

    if (!isAuthenticated && !isPublicPath) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner w-8 h-8" />
      </div>
    );
  }

  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(path + '/'));

  if (!isAuthenticated && !isPublicPath) {
    return null;
  }

  return <>{children}</>;
}
