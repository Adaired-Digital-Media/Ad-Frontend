import { MetadataRoute } from 'next';

const robots = async () => {
  const siteUrl: string | undefined = process.env.NEXT_PUBLIC_SITE_URI;

  const metaRobots: MetadataRoute.Robots = {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/',
          '/admin',
          'admin-dashboard',
          '/tag/*',
          '/author/*',
          '/category/*',
          '/?*',
          '/page/*',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };

  return metaRobots;
};

export default robots;
