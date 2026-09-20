import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function SecondaryPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Secondary School"
          subtitle="Preparing students for higher education and future careers."
        />
        <div className="card card-padded">
          <p className="text-neutral-600 leading-relaxed">
            Our Secondary School program (ages 12-18) provides rigorous academics, career guidance,
            and character development to prepare students for university and beyond.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
