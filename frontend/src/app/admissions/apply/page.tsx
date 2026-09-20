import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function AdmissionsApplyPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Apply for Admission"
          subtitle="Complete the online application form to begin the admission process."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            The online application form will be available here. Please check back soon or contact our admissions office.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
