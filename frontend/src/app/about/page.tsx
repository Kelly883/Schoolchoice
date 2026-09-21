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

        {/* School Story */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Story</h2>
          <div className="card card-padded">
            <p className="text-lg text-neutral-600 leading-relaxed mb-4">
              Founded in 1990, our school has been at the forefront of educational excellence for over three decades. What began as a modest institution has grown into a vibrant community of learners, educators, and families united by a common purpose: nurturing the whole child.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              From our first class of 50 students in a converted warehouse, we have grown to serve over 2,000 students across early years, primary, and secondary levels. Our journey has been marked by continuous innovation in pedagogy, state-of-the-art facilities, and an unwavering commitment to academic and character development.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Mission</h2>
          <div className="card card-padded">
            <p className="text-xl text-neutral-600 leading-relaxed text-center">
              To provide a world-class education that empowers students to become critical thinkers, compassionate leaders, and responsible global citizens through academic excellence, character development, and innovative teaching methods.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Vision</h2>
          <div className="card card-padded">
            <p className="text-xl text-neutral-600 leading-relaxed text-center">
              To be the leading educational institution known for academic excellence, character development, and innovative teaching methods that prepare students for success in an ever-changing world.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card card-padded">
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Excellence</h3>
              <p className="text-neutral-600">We pursue the highest standards in all we do, continuously striving for improvement and innovation.</p>
            </div>
            <div className="card card-padded">
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Integrity</h3>
              <p className="text-neutral-600">We uphold honesty, transparency, and ethical behavior in all our interactions.</p>
            </div>
            <div className="card card-padded">
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Respect</h3>
              <p className="text-neutral-600">We value every individual and foster a culture of mutual respect and inclusion.</p>
            </div>
            <div className="card card-padded">
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Lifelong Learning</h3>
              <p className="text-neutral-600">We inspire curiosity and a love of learning that extends beyond the classroom.</p>
            </div>
            <div className="card card-padded">
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Community</h3>
              <p className="text-neutral-600">We build strong partnerships between students, parents, teachers, and the wider community.</p>
            </div>
            <div className="card card-padded">
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Global Citizenship</h3>
              <p className="text-neutral-600">We prepare students to thrive in a diverse, interconnected world.</p>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}