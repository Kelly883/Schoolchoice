import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import Link from 'next/link';

export default function AcademicsPage() {
  const programs = [
    {
      title: 'Early Years Foundation Stage (EYFS)',
      href: '/academics/early-years',
      description: 'Ages 3-5. Play-based learning with holistic development foundations.',
      icon: '🧒',
    },
    {
      title: 'Primary School (Key Stage 1 & 2)',
      href: '/academics/primary',
      description: 'Ages 5-11. Building strong academic foundations with inquiry-based learning.',
      icon: '📚',
    },
    {
      title: 'Secondary School (Key Stage 3 & 4)',
      href: '/academics/secondary',
      description: 'Ages 11-18. Preparing for GCSEs, A-Levels, and beyond.',
      icon: '🎓',
    },
  ];

  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Academics"
          subtitle="Explore our comprehensive academic programs from early years through secondary school."
        />

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Our Academic Programs</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="block card card-padded hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{program.title}</h3>
                <p className="text-neutral-600">{program.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <section>
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Our Approach</h3>
          <div className="card card-padded">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-neutral-900 mb-3">Inquiry-Based Learning</h4>
                <p className="text-neutral-600 mb-4">
                  We encourage students to ask questions, explore ideas, and develop critical thinking skills through hands-on investigations and projects.
                </p>

                <h4 className="text-xl font-semibold text-neutral-900 mb-3">Personalized Instruction</h4>
                <p className="text-neutral-600 mb-4">
                  Our dedicated teachers work individually with each student to identify strengths and address areas for growth, ensuring every child reaches their potential.
                </p>

                <h4 className="text-xl font-semibold text-neutral-900 mb-3">21st Century Skills</h4>
                <p className="text-neutral-600">
                  We integrate technology, creativity, and collaboration into our curriculum to prepare students for the challenges and opportunities of tomorrow.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-neutral-900 mb-3">World-Class Curriculum</h4>
                <p className="text-neutral-600 mb-4">
                  Our curriculum aligns with national standards while incorporating international best practices, including Cambridge International and IB frameworks.
                </p>

                <h4 className="text-xl font-semibold text-neutral-900 mb-3">Enriched Enrichment</h4>
                <p className="text-neutral-600 mb-4">
                  From arts and music to sports and coding, we offer diverse extracurricular activities that nurture creativity and physical development.
                </p>

                <h4 className="text-xl font-semibold text-neutral-900 mb-3">Safe Learning Environment</h4>
                <p className="text-neutral-600">
                  State-of-the-art facilities, dedicated safety measures, and a nurturing community ensure students learn in the safest possible environment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}