import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function AcademicsPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Academics"
          subtitle="Explore our comprehensive academic programs from early years through secondary school."
        />
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/academics/early-years" className="card card-padded hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Early Years</h3>
            <p className="text-neutral-600">Ages 3-5. Play-based learning and foundational skills.</p>
          </a>
          <a href="/academics/primary" className="card card-padded hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Primary School</h3>
            <p className="text-neutral-600">Ages 6-11. Building strong academic foundations.</p>
          </a>
          <a href="/academics/secondary" className="card card-padded hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Secondary School</h3>
            <p className="text-neutral-600">Ages 12-18. Preparing for higher education and beyond.</p>
          </a>
        </div>
      </div>
    </PublicLayout>
  );
}
