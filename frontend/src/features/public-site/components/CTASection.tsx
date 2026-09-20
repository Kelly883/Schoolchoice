'use client';

import Link from 'next/link';

export function CTASection() {
  return (
    <section className="section bg-primary-600">
      <div className="container-wide text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Join Our School Community?
        </h2>
        <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
          Take the first step towards giving your child the best education. Apply now or book a tour to visit our campus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/admissions/apply"
            className="btn bg-white text-primary-600 hover:bg-neutral-100 btn-lg"
          >
            Apply for Admission
          </Link>
          <Link
            href="/admissions"
            className="btn border-2 border-white text-white hover:bg-white/10 btn-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
