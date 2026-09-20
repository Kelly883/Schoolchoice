import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function EventsPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Events"
          subtitle="Upcoming school events and activities."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Events calendar will be available here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
