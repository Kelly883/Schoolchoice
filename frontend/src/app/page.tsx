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
