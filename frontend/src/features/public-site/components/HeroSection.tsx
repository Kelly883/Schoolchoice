'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container-wide">
        <div className="py-20 md:py-32 lg:py-40 max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight text-balance">
            Building Future Leaders Through<br />
            <span className="text-primary-600">Excellence in Education</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We provide a world-class education that nurtures academic excellence, character development, and lifelong learning skills in every child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions/apply" className="btn-primary btn-lg">
              Apply for Admission
            </Link>
            <Link href="/school-tour" className="btn-outline btn-lg">
              Book a School Tour
            </Link>
          </div>
        </div>
      </div>
      {/* Subtle decorative element - soft shadow card */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-50 rounded-3xl opacity-30" aria-hidden="true" />
    </section>
  );
}