import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function PrimaryPage() {
  const subjects = [
    'English Language',
    'Mathematics',
    'Natural Sciences',
    'Social Studies',
    'Christian/Moral Education',
    'Creative Arts',
    'Physical Education',
    'English Language',
  ];

  const keyStages = [
    {
      level: 'Primary 1-2',
      age: 'Ages 6-7',
      description: 'Foundational years focusing on phonics, numeracy, and basic social skills.',
    },
    {
      level: 'Primary 3-4',
      age: 'Ages 8-9',
      description: 'Developing confidence in reading, writing, and mathematical reasoning.',
    },
    {
      level: 'Primary 5-6',
      age: 'Ages 10-11',
      description: 'Preparation for secondary school with increased academic demands.',
    },
  ];

  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Primary School"
          subtitle="Building strong foundations in literacy, numeracy, and critical thinking."
        />

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Our Approach</h3>
          <div className="card card-padded">
            <p className="text-lg text-neutral-600 leading-relaxed">
              Our Primary School program (ages 6-11) provides a well-rounded education that balances academic rigor with creative expression. We use a combination of structured learning and experiential activities to develop confident, curious learners.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <h4 className="text-xl font-semibold text-neutral-900 mb-2">Small Classes</h4>
                <p className="text-neutral-600">Low student-to-teacher ratios ensure personalized attention for every child.</p>
              </div>
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <h4 className="text-xl font-semibold text-neutral-900 mb-2">Enrichment</h4>
                <p className="text-neutral-600">Art, music, coding, and language clubs develop well-rounded personalities.</p>
              </div>
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <h4 className="text-xl font-semibold text-neutral-900 mb-2">Assessment</h4>
                <p className="text-neutral-600">Regular formative assessments track progress and inform next steps.</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Key Stages</h3>
          <div className="space-y-6">
            {keyStages.map((ks) => (
              <div key={ks.level} className="card card-padded">
                <h4 className="text-xl font-semibold text-neutral-900 mb-2">{ks.level} ({ks.age})</h4>
                <p className="text-neutral-600">{ks.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Core Subjects</h3>
          <div className="card card-padded">
            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjects.map((subject) => (
                <li key={subject} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-neutral-700">{subject}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}