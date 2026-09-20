import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function AdmissionsTrackPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Track Your Application"
          subtitle="Enter your application number to check the status of your admission."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Application tracking will be available here. Please check back soon.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
