import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function AdmissionsRequirementsPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Admission Requirements"
          subtitle="Documents and requirements needed for admission."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Detailed admission requirements will be listed here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
