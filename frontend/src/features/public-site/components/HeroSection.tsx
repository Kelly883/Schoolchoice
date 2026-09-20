'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-100 rounded-full opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-100 rounded-full opacity-50" />
      </div>

      <div className="container-wide relative">
        <div className="py-20 md:py-32 lg:py-40 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 text-balance">
            Building Future Leaders Through{' '}
            <span className="text-primary-600">Excellence</span> in Education
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl leading-relaxed">
            We provide a world-class education that nurtures academic excellence, character development, and lifelong learning skills in every child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/admissions/apply" className="btn-primary btn-lg">
              Apply for Admission
            </Link>
            <Link href="/school-tour" className="btn-outline btn-lg">
              Book a School Tour
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
