import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function NewsPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="News"
          subtitle="Latest news and announcements from our school."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            News articles will be listed here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
