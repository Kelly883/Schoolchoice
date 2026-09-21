import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';

export default function EarlyYearsPage() {
  const curriculumAreas = [
    'Literacy and Phonics',
    'Numeracy and Maths',
    'Creative Arts',
    'Physical Education',
    'Music and Movement',
    'Storytelling and Listening',
    'Social and Emotional Development',
  ];

  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Early Years"
          subtitle="Ages 3-5. Play-based learning that lays the foundation for lifelong success."
        />

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Our Approach</h3>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="card card-padded">
              <h4 className="text-xl font-semibold text-neutral-900 mb-3">Play-Based Learning</h4>
              <p className="text-neutral-600 mb-4">
                We believe that children learn best through play. Our carefully designed environments encourage exploration, experimentation, and discovery.
              </p>

              <h4 className="text-xl font-semibold text-neutral-900 mb-3">Holistic Development</h4>
              <p className="text-neutral-600">
                We nurture the whole child—cognitive, social, emotional, physical, and creative development—through purposeful, meaningful experiences.
              </p>
            </div>

            <div className="card card-padded">
              <h4 className="text-xl font-semibold text-neutral-900 mb-3">Preparing for Primary</h4>
              <p className="text-neutral-600 mb-4">
                Our structured approach builds confidence and readiness for the rigors of primary school while maintaining the joy of learning.
              </p>

              <h4 className="text-xl font-semibold text-neutral-900 mb-3">Dedicated Early Years Teachers</h4>
              <p className="text-neutral-600">
                Our specialized educators have extensive training in early childhood development and create nurturing, stimulating environments.
              </p>
            </div>
          </div>
        </div>

        <section>
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Curriculum Areas</h3>
          <div className="card card-padded">
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {curriculumAreas.map((area) => (
                <li key={area} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-neutral-700">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Class Structure</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary-700">3</span>
              </div>
              <h4 className="text-lg font-semibold text-neutral-900">Nursery 1</h4>
              <p className="text-sm text-neutral-600">Ages 3-4, mixed-age groups</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary-700">2</span>
              </div>
              <h4 className="text-lg font-semibold text-neutral-900">Nursery 2</h4>
              <p className="text-sm text-neutral-600">Ages 4-5, small groups</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary-700">1</span>
              </div>
              <h4 className="text-lg font-semibold text-neutral-900">Reception</h4>
              <p className="text-sm text-neutral-600">Age 5, preparing for Primary 1</p>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}