import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="About Our School"
          subtitle="Learn about our history, mission, and commitment to excellence in education."
        />
        <div className="card card-padded prose prose-neutral max-w-none">
          <p className="text-neutral-600 leading-relaxed">
            Founded in 1990, our school has been at the forefront of educational excellence for over three decades.
            We believe in nurturing the whole child — academically, socially, emotionally, and physically.
          </p>
          <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-neutral-600 leading-relaxed">
            To provide a world-class education that empowers students to become critical thinkers,
            compassionate leaders, and responsible global citizens.
          </p>
          <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Our Vision</h2>
          <p className="text-neutral-600 leading-relaxed">
            To be the leading educational institution known for academic excellence, character development,
            and innovative teaching methods.
          </p>
          <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 text-neutral-600 space-y-2">
            <li>Excellence in all we do</li>
            <li>Integrity and honesty</li>
            <li>Respect for all individuals</li>
            <li>Lifelong learning</li>
            <li>Community and collaboration</li>
          </ul>
        </div>
      </div>
    </PublicLayout>
  );
}
