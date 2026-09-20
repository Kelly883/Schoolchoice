'use client';

import Link from 'next/link';

const programs = [
  {
    title: 'Early Years',
    description: 'A nurturing foundation for our youngest learners, focusing on play-based learning and social development.',
    href: '/academics/early-years',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Primary School',
    description: 'Building strong foundations in literacy, numeracy, and critical thinking through engaging, structured learning.',
    href: '/academics/primary',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Secondary School',
    description: 'Preparing students for higher education and future careers with rigorous academics and character development.',
    href: '/academics/secondary',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

export function ProgramsSection() {
  return (
    <section className="section bg-neutral-50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Our Academic Programs
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            From early years through secondary school, we provide a comprehensive educational journey.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Link
              key={program.title}
              href={program.href}
              className="card card-padded group hover:shadow-lg transition-shadow"
            >
              <div className="text-primary-600 mb-4">{program.icon}</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                {program.title}
              </h3>
              <p className="text-neutral-600">{program.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
