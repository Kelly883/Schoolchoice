import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function SecondaryPage() {
  const keyStages = [
    {
      level: 'Junior Secondary (JSS 1-3)',
      age: 'Ages 12-15',
      description: 'Foundation years exploring subjects, building study skills, and preparing for national examinations.',
    },
    {
      level: 'Senior Secondary (SSS 1-3)',
      age: 'Ages 15-18',
      description: 'Intensive preparation for WAEC, JAMB, and university or career pathways with specialized streams.',
    },
  ];

  const streams = [
    'Science (Biology, Chemistry, Physics)',
    'Arts (Visual Arts, Music, Theatre)',
    'Social Sciences (History, Government, Economics)',
    'Technical/Vocational (ICT, Entrepreneurship)',
  ];

  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Secondary School"
          subtitle="Preparing students for higher education and future careers."
        />

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Our Approach</h3>
          <div className="card card-padded">
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              Our Secondary School experience challenges students academically while nurturing their unique talents and interests. We guide them through crucial decision-making about their futures with comprehensive university and career counseling support.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold text-neutral-900 mb-3">Academic Excellence</h4>
                <p className="text-neutral-600">
                  Rigorous preparation for national and international examinations with a track record of our students achieving above-average results.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-neutral-900 mb-3">Career Guidance</h4>
                <p className="text-neutral-600">
                  Personalized counseling to help students choose the right pathways for their aspirations, whether university, TVET, or creative industries.
                </p>
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
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Academic Streams</h3>
          <div className="card card-padded">
            <ul className="space-y-3">
              {streams.map((stream) => (
                <li key={stream} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-neutral-700">{stream}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">University Pathways</h3>
          <div className="card card-padded">
            <p className="text-neutral-600 text-center mb-4">
              In recent years, our secondary students have gained admission to:
            </p>
            <div className="text-center text-neutral-600">
              <p className="text-3xl font-bold text-primary-600 mb-2">95%+</p>
              <p className="text-sm">University acceptance rate</p>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}