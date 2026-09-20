import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="News Article"
          subtitle={`Article: ${params.slug}`}
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Article content will be displayed here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
