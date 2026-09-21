import { PublicLayout } from '@/components/layout';
import { HeroSection } from '@/features/public-site/components/HeroSection';
import { StatsSection } from '@/features/public-site/components/StatsSection';
import { ProgramsSection } from '@/features/public-site/components/ProgramsSection';
import { CTASection } from '@/features/public-site/components/CTASection';

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsSection />
      <ProgramsSection />
      <CTASection />
    </PublicLayout>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'SchoolName - Excellence in Education',
  description: 'Premium public school offering world-class education from early years through secondary school. Apply online today.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'SchoolName - Excellence in Education',
    description: 'Premium public school offering world-class education from early years through secondary school.',
    url: 'https://schoolname.edu',
    siteName: 'SchoolName',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        type: 'image/svg+xml',
      },
    ],
  },
};