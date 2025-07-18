import { MetadataRoute } from 'next';

const robots = async (): Promise<MetadataRoute.Robots> => {
  const siteUrl: string | undefined = process.env.NEXT_PUBLIC_SITE_URI;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin-dashboard',
          '/tag/*',
          '/author/*',
          '/category/*',
          '/?*',
          '/page/*',
          '/api'
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
};

export default robots;
