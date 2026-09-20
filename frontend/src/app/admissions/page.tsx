import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import Link from 'next/link';

export default function AdmissionsPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Admissions"
          subtitle="Begin your child's journey to excellence. Learn about our admission process and requirements."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admissions/apply" className="card card-padded hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Apply Now</h3>
            <p className="text-neutral-600">Start the online application process.</p>
          </Link>
          <Link href="/admissions/requirements" className="card card-padded hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Requirements</h3>
            <p className="text-neutral-600">View admission requirements and documents needed.</p>
          </Link>
          <Link href="/admissions/fees" className="card card-padded hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Fees</h3>
            <p className="text-neutral-600">Learn about tuition and other fees.</p>
          </Link>
          <Link href="/admissions/track" className="card card-padded hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Track Application</h3>
            <p className="text-neutral-600">Check the status of your application.</p>
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
