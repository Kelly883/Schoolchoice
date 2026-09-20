import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Terms of Service"
          subtitle="Terms and conditions for using our website and services."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Terms of service content will be available here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
