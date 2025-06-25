import { Toaster } from 'react-hot-toast';
import { cn } from '@core/utils/class-names';
import { inter, lexendDeca, nunito, dm, baby, poppins } from '@/app/fonts';
import Script from 'next/script';
import { siteConfig } from '@/config/site.config';
import NextProgress from '@core/components/next-progress';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';

// styles
import '@/app/globals.css';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
    metadataBase: new URL('https://adaired.com'),
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
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AdAired Digital Media',
    url: 'https://www.adaired.com/',
    logo: 'https://res.cloudinary.com/adaired/image/upload/c_limit,w_1920/f_auto/q_auto/v1/Static%20Website%20Images/adaired_logo.png?_a=BAVAZGDW0',
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
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Adaired Digital Media',
    image:
      'https://res.cloudinary.com/adaired/image/upload/c_limit,w_1920/f_auto/q_auto/v1/Static%20Website%20Images/adaired_logo.png?_a=BAVAZGDW0',
    '@id': '',
    url: 'https://www.adaired.com/',
    telephone: '089074 00008',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        '5th Floor, Bestech Business Tower, B-509, Parkview Residence Colony, Sector 66',
      addressLocality: 'Mohali',
      postalCode: '160066',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.6756426,
      longitude: 76.7402769,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '19:00',
    },
    sameAs: [
      'https://www.facebook.com/adaired.digital',
      'https://www.instagram.com/adaired.digital/',
      'https://twitter.com/adaireddigital',
      'https://www.linkedin.com/company/adaired/',
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
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {gtagConfig}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KP52KR2');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* JSON-LD for Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData.localBusiness),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData.organization),
          }}
        />
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
          `font-nunito antialiased`
        )}
        id="root"
      >

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KP52KR2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
          <NextProgress />
          {children}
          <Toaster />
          <GlobalDrawer />
          <GlobalModal />
        </ReCaptchaProvider>

        {/* Zoho SalesIQ Initialization */}
        <Script id="zoho-init" strategy="beforeInteractive">
          {`
          window.$zoho = window.$zoho || {};
          $zoho.salesiq = $zoho.salesiq || { ready: function() {} };
        `}
        </Script>

        {/* Zoho SalesIQ Widget Script */}
        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.com/widget?wc=siq7daf32053a2c9ad94317715612d7eb575af5e85bd3e25754067471d73684b3b9"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
