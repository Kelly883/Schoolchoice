import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function StudentLifePage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Student Life"
          subtitle="Discover the vibrant life beyond the classroom."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Information about extracurricular activities, clubs, and student life will be available here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
