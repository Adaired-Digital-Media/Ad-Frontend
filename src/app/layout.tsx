import { Toaster } from 'react-hot-toast';
import { cn } from '../@core/utils/class-names';
import { inter, lexendDeca, nunito, dm, baby, poppins } from '@/app/fonts';
import Script from 'next/script';
import { siteConfig } from '@/config/site.config';
import NextProgress from '@core/components/next-progress';
// import { ReCaptchaProvider } from 'next-recaptcha-v3';
// Dynamically import ReCaptchaProvider
const LazyReCaptchaProvider = dynamic(
  () =>
    import('next-recaptcha-v3').then((mod) => mod.ReCaptchaProvider),
  { ssr: false } // Ensures it is only loaded on the client side
);

// styles
import '@/app/globals.css';
// import GlobalDrawer from '@/app/shared/drawer-views/container';
// import GlobalModal from '@/app/shared/modal-views/container';
import dynamic from 'next/dynamic';
const GlobalDrawer = dynamic(() => import('@/app/shared/drawer-views/container'));
const GlobalModal = dynamic(() => import('@/app/shared/modal-views/container'));

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

// Google Analytics configuration
const gtagConfig = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-5ZWYZ5BF47');
`;

// Schema JSON-LD data
const schemaData = {
  professionalService: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'AdAired Digital Media',
    image: 'https://www.adaired.com/_next/static/media/Logo.441e7f4f.svg',
    url: 'https://www.adaired.com/',
    telephone: '8907400008',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        '5th Floor, Bestech Business Tower, B-509, Parkview Residence Colony, Sector 66, Sahibzada Ajit Singh Nagar, Punjab',
      addressLocality: 'Mohali',
      postalCode: '160066',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.67625162,
      longitude: 76.7402769,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '19:00',
    },
    sameAs: [
      'https://www.facebook.com/adaired.digital/',
      'https://twitter.com/adaireddigital',
      'https://www.instagram.com/adaired.digital/',
      'https://in.linkedin.com/company/adaired',
      'https://www.adaired.com/',
    ],
  },
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AdAired Digital Media',
    url: 'https://www.adaired.com/',
    logo: 'https://www.adaired.com/_next/static/media/Logo.441e7f4f.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '8907400008',
      contactType: 'customer service',
      areaServed: ['IN', 'US', 'GB', 'CA', 'AU'],
      availableLanguage: ['en', 'Hindi'],
    },
    sameAs: [
      'https://www.facebook.com/adaired.digital/',
      'https://twitter.com/adaireddigital',
      'https://www.instagram.com/adaired.digital/',
      'https://in.linkedin.com/company/adaired',
      'https://www.adaired.com/',
    ],
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="IbErkjWfX4xDEzZjtgtMruxBWkCYRs6n19e55PaEtLw"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5ZWYZ5BF47"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {gtagConfig}
        </Script>

        {/* JSON-LD for Schema.org */}
        <Script
          type="application/ld+json"
          id="local-schema"
          strategy="lazyOnload"
        >
          {JSON.stringify(schemaData.professionalService)}
        </Script>
        <Script
          type="application/ld+json"
          id="organization-schema"
          strategy="lazyOnload"
        >
          {JSON.stringify(schemaData.organization)}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          inter.variable,
          lexendDeca.variable,
          nunito.variable,
          dm.variable,
          baby.variable,
          poppins.variable,
          `font-inter antialiased`
        )}
      >
        <LazyReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
          <NextProgress />
          {children}
          <Toaster />
          <GlobalDrawer />
          <GlobalModal />
        </LazyReCaptchaProvider>
      </body>
    </html>
  );
}
