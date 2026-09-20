'use client';

const stats = [
  { value: '25+', label: 'Years of Excellence' },
  { value: '2000+', label: 'Students Enrolled' },
  { value: '150+', label: 'Qualified Teachers' },
  { value: '98%', label: 'Success Rate' },
];

export function StatsSection() {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
