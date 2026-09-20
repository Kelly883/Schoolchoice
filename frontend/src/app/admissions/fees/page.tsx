import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function AdmissionsFeesPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="School Fees"
          subtitle="Tuition and other fees for the current academic session."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Fee structure and payment details will be available here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
