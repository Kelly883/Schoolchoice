import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function AchievementsPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Achievements"
          subtitle="Celebrating our students' academic and extracurricular accomplishments."
        />
        <div className="card card-padded">
          <p className="text-neutral-600">
            Our achievements and awards will be showcased here.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
