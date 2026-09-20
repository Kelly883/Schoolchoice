import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader title={title} subtitle={description} />
        <div className="card card-padded">
          <p className="text-neutral-600">
            This page is under construction. Content will be added as part of the implementation phase.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
