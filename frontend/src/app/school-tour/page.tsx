import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function SchoolTourPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Book a School Tour"
          subtitle="Visit our campus and see our facilities firsthand."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            School tour booking will be available here. Please check back soon.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
