import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function FacilitiesPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Our Facilities"
          subtitle="World-class facilities designed to support learning and development."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Details about our campus facilities will be available here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
