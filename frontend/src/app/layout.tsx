import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { ProtectedRoute } from '@/lib/auth/ProtectedRoute';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SchoolName - Excellence in Education',
    template: '%s | SchoolName',
  },
  description: 'Premium public school offering world-class education from early years through secondary school.',
  keywords: ['school', 'education', 'admissions', 'primary', 'secondary', 'Nigeria'],
  openGraph: {
    type: 'website',
    siteName: 'SchoolName',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AuthProvider>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
