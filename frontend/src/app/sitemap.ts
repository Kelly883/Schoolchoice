import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const publicRoutes = [
    '',
    '/about',
    '/academics',
    '/academics/early-years',
    '/academics/primary',
    '/academics/secondary',
    '/admissions',
    '/admissions/apply',
    '/admissions/track',
    '/admissions/requirements',
    '/admissions/fees',
    '/school-tour',
    '/student-life',
    '/facilities',
    '/achievements',
    '/gallery',
    '/news',
    '/events',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
