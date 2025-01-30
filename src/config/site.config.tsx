import { Metadata } from 'next';

export const siteConfig = {
  title: 'Digital Marketing Agency for Online Growth',
  description:
    'Adaired Digital Media is your all-in-one digital marketing agency. Transform your business into a brand with - SEO, PPC, social media, web design services, etc.',
};

export const metaObject = (
  title?: string,
  description: string = siteConfig.description,
  canonical?: string,
  robots?: string
): Metadata => {
  return {
    title: title ? `${title} | Adaired Digital` : siteConfig.title,
    description,
    alternates: {
      canonical: canonical || '/',
    },
    openGraph: {
      title: title ? `${title} - AdaireDigital` : siteConfig.title,
      description,
      siteName: 'Adaired Digital Media',
      locale: 'en_US',
      type: 'website',
    },
    robots: robots || 'index, follow',
  };
};
