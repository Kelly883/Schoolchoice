import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import Link from 'next/link';

export default function AdmissionsPage() {
  const steps = [
    {
      number: 1,
      title: 'Explore Our School',
      description: 'Browse our academic programs, facilities, and student life. Schedule a tour anytime.',
      href: '/school-tour',
    },
    {
      number: 2,
      title: 'Submit Application',
      description: 'Complete our online application form with your child\'s details.',
      href: '/admissions/apply',
    },
    {
      number: 3,
      title: 'Upload Documents',
      description: 'Submit required documents: birth certificate, vaccination records, and recent photos.',
      href: '/admissions/requirements',
    },
    {
      number: 4,
      title: 'Pay Fees',
      description: 'Pay the application fee and receive confirmation of your submission.',
      href: '/admissions/fees',
    },
    {
      number: 5,
      title: 'Interview & Decision',
      description: 'Attend the interview if required. You\'ll receive a decision within 2 weeks.',
      href: '/contact',
    },
  ];

  const requirements = [
    'Completed application form',
    'Child\'s birth certificate (original + copy)',
    'Recent passport-sized photos (2)',
    'Vaccination/Medical records',
    'Proof of residence',
    'Parent\'s valid ID',
  ];

  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Admissions"
          subtitle="Begin your child's journey to excellence. Learn about our admission process and requirements."
        />

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Admission Process</h3>
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col md:flex-row items-start gap-6 p-6 card card-padded">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-neutral-900 mb-2">{step.title}</h4>
                  <p className="text-neutral-600 mb-3">{step.description}</p>
                  <Link
                    href={step.href}
                    className="text-primary-600 hover:underline text-sm font-medium"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Admission Requirements</h3>
            <div className="card card-padded">
              <ul className="space-y-3">
                {requirements.map((req) => (
                  <li key={req} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-secondary-500 rounded-full" />
                    <span className="text-neutral-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Quick Links</h3>
            <div className="space-y-4">
              <Link href="/admissions/apply" className="card card-padded hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Apply Now</h4>
                <p className="text-neutral-600 text-sm">Start your application online</p>
              </Link>
              <Link href="/admissions/requirements" className="card card-padded hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Requirements</h4>
                <p className="text-neutral-600 text-sm">View complete document checklist</p>
              </Link>
              <Link href="/admissions/fees" className="card card-padded hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Fees</h4>
                <p className="text-neutral-600 text-sm">Tuition and fee schedule</p>
              </Link>
              <Link href="/admissions/track" className="card card-padded hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Track Application</h4>
                <p className="text-neutral-600 text-sm">Check your application status</p>
              </Link>
            </div>
          </section>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Important Dates</h3>
          <div className="card card-padded">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Early Years Applications</h4>
                <ul className="space-y-2 text-neutral-600">
                  <li>September - Application opens</li>
                  <li>October - First-round interviews</li>
                  <li>November - Admission decisions</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Primary & Secondary Applications</h4>
                <ul className="space-y-2 text-neutral-600">
                  <li>January - Application opens</li>
                  <li>February - Second-round interviews</li>
                  <li>March - Admission decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}