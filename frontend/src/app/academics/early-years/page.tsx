import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function EarlyYearsPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Early Years"
          subtitle="Nurturing our youngest learners through play-based education and social development."
        />
        <div className="card card-padded">
          <p className="text-neutral-600 leading-relaxed">
            Our Early Years program provides a safe, nurturing environment where children aged 3-5
            develop foundational skills through play-based learning, creative exploration, and social interaction.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
