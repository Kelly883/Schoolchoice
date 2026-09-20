import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Privacy Policy"
          subtitle="How we collect, use, and protect your personal information."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Privacy policy content will be available here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
