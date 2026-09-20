import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function FAQPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Frequently Asked Questions"
          subtitle="Answers to common questions about our school."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            FAQ content will be available here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
