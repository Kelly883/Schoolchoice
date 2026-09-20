import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function ContactPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Contact Us"
          subtitle="Get in touch with our school."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Contact information and form will be available here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
