import { Metadata } from 'next';

export const siteConfig = {
  title: 'Digital Marketing Agency for Online Growth',
  description:
    'Adaired Digital Media is your all-in-one digital marketing agency. Transform your business into a brand with - SEO, PPC, social media, web design services, etc.',
};

export const metaObject = (
  title: string,
  description: string,
  canonical?: string,
  robots?: string,

): Metadata => {
  return {
    title: title ? `${title} | Adaired Digital` : siteConfig.title,
    description: description || siteConfig.description,
    alternates:{
        canonical: canonical || '/',
    },
    robots: robots || 'index, follow',
  };
};
