import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function GalleryPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Gallery"
          subtitle="Photos and videos of our school, events, and activities."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Photo and video gallery will be available here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
