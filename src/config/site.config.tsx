import { Metadata } from 'next';
import logoImg from '@public/logo-primary.svg';
import logoIconImg from '@public/logo-plane-primary.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}
export const siteConfig = {
  title: 'Digital Marketing Agency for Online Growth',
  description:
    'Adaired Digital Media is your all-in-one digital marketing agency. Transform your business into a brand with - SEO, PPC, social media, web design services, etc.',
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
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
