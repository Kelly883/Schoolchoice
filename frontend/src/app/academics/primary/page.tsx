import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function PrimaryPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Primary School"
          subtitle="Building strong foundations in literacy, numeracy, and critical thinking."
        />
        <div className="card card-padded">
          <p className="text-neutral-600 leading-relaxed">
            Our Primary School program (ages 6-11) focuses on developing strong foundations in core subjects
            while fostering creativity, critical thinking, and character development.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
