/* ======================================
   NAV TYPES
====================================== */

export type NavLeaf = {
  name: string;
  href: string;
};

export type NavGroup = {
  name: string;
  href: string;
  subItems: NavLeaf[];
};

export type WebsiteNavItem = {
  label: string;
  value: string;
  href: string;
  subItems?: NavGroup[] | NavLeaf[];
};

/* ======================================
   TYPE GUARDS (CRITICAL FIX)
====================================== */

export const isNavGroupArray = (
  items: WebsiteNavItem['subItems']
): items is NavGroup[] =>
  Array.isArray(items) &&
  items.length > 0 &&
  typeof items[0] === 'object' &&
  'subItems' in items[0];

export const isNavLeafArray = (
  items: WebsiteNavItem['subItems']
): items is NavLeaf[] =>
  Array.isArray(items) &&
  (items.length === 0 || !('subItems' in items[0]));

/* ======================================
   ROUTES
====================================== */

export const routes: {
  auth: Record<string, string>;
  root: Record<string, string>;
  websiteNav: WebsiteNavItem[];
  homeWebsite: Record<string, string>;
  ecommerceNav: {
    label: string;
    value: string;
    href: string;
  }[];
  eCommerce: {
    home: string;
    products: string;
    shop: string;
    cart: string;
    contentProductForm: (slug: string) => string;
    orders: string;
    orderDetails: (id: string) => string;
    thankyouPage: string;
  };
  userDashboard: {
    website: string;
    dashboard: string;
    accountSettings: string;
    passwordSettings: string;
    cart: string;
    orders: string;
    tickets: string;
    inbox: (tickedId: string) => string;
    invoices: string;
    invoiceDetails: (id: string) => string;
  };
  termsNconditions: string;
  privacyPolicy: string;
} = {
  auth: {
    signUp: '/auth/sign-up',
    signIn: '/auth/sign-in',
    forgotPassword: '/auth/forgot-password',
    error: '/auth/error',
  },

  root: {
    home: '/',
    bhwHome: '/expert-content-solutions',
    TermsNConditions: '/terms-and-conditions',
    PrivacyPolicy: '/privacy-policy',
  },

  websiteNav: [
    {
      label: 'Home',
      value: 'home',
      href: '/',
    },
    {
      label: 'About Us',
      value: 'about',
      href: '/about',
    },
    {
      label: 'Services',
      value: 'services',
      href: '#',
      subItems: [
        {
          name: 'Web Design & Development',
          href: '/services/web-design-and-development-services',
          subItems: [
            { name: 'WordPress Development', href: '/services/wordpress-development' },
            { name: 'Custom web development', href: '/services/custom-web-development' },
            { name: 'WooCommerce', href: '/services/woocommerce' },
            { name: 'Shopify Development', href: '/services/shopify-development' },
            { name: 'PHP Development', href: '/services/php-development' },
            { name: 'Laravel Development', href: '/services/laravel-development' },
            { name: 'Web Development Company USA', href: '/services/web-development-company-usa' },
          ],
        },

        {
          name: 'Search Engine Optimization (SEO)',
          href: '/services/search-engine-optimization',
          subItems: [
            { name: 'Technical SEO Analysis', href: '/services/technical-seo-analysis' },
            { name: 'Online Reputation Management', href: '/services/online-reputation-management' },
            { name: 'Competitor Backlink Outreach', href: '/services/competitor-backlink-outreach' },
            { name: 'Guest Post Outreach', href: '/services/guest-post-outreach' },
            { name: 'On-Page and Off-Page Optimization', href: '/services/on-page-and-off-page-optimization' },
            { name: 'Local SEO (GBP)', href: '/services/local-seo' },
            { name: 'SEO Company USA', href: '/services/seo-company-usa' },
          ],
        },

        {
          name: 'Strategic Social Media Management',
          href: '/services/strategic-social-media-management',
          subItems: [
            { name: 'Social Media Optimization', href: '/services/social-media-optimization' },
            { name: 'Social Media Marketing', href: '/services/social-media-marketing' },
          ],
        },

        {
          name: 'Graphic Design',
          href: '/services/digital-creative-and-logo-design',
          subItems: [
            { name: 'Website Graphics', href: '/services/digital-creative-and-logo-design' },
            { name: 'Website Logo', href: '/services/digital-creative-and-logo-design' },
            { name: 'Digital Broucher', href: '/services/digital-creative-and-logo-design' },
            { name: 'Email Marketing Graphics', href: '/services/digital-creative-and-logo-design' },
            { name: 'Business card, Letterhead etc.', href: '/services/digital-creative-and-logo-design' },
            { name: 'Poster, Banner, Flyer and Signage', href: '/services/digital-creative-and-logo-design' },
            { name: 'Social Media Graphics', href: '/services/digital-creative-and-logo-design' },
          ],
        },

        {
          name: 'Paid Media & Advertising',
          href: '/services/paid-media-and-advertising',
          subItems: [
            { name: 'AdWords Audit', href: '/services/paid-media-and-advertising' },
            { name: 'Keyword Research', href: '/services/paid-media-and-advertising' },
            { name: 'Campaign Optimization', href: '/services/paid-media-and-advertising' },
            { name: 'CPC Bid Management', href: '/services/paid-media-and-advertising' },
            { name: 'Customized Ad Extensions', href: '/services/paid-media-and-advertising' },
            { name: 'Creative Display Ads', href: '/services/paid-media-and-advertising' },
            { name: 'Local Targeting Strategies', href: '/services/paid-media-and-advertising' },
            { name: 'Conversion Tracking', href: '/services/paid-media-and-advertising' },
          ],
        },

        {
          name: 'Content Marketing',
          href: '/services/compelling-content-marketing',
          subItems: [
            { name: 'Content Audit', href: '/services/compelling-content-marketing' },
            { name: 'Blogs & Articles', href: '/services/compelling-content-marketing' },
            { name: 'Social Media Posts', href: '/services/compelling-content-marketing' },
            { name: 'Infographics', href: '/services/compelling-content-marketing' },
            { name: 'Email Marketing Draft', href: '/services/compelling-content-marketing' },
            { name: 'Website Copies', href: '/services/compelling-content-marketing' },
            { name: 'Guest Posting', href: '/services/compelling-content-marketing' },
            { name: 'Google Business Profile Posts', href: '/services/compelling-content-marketing' },
          ],
        },
      ],
    },

    {
      label: 'Resources',
      value: 'resources',
      href: '#',
      subItems: [
        { name: 'Career', href: '/career' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Blog', href: '/blog' },
      ],
    },

    {
      label: 'Contact Us',
      value: 'contact',
      href: '/contact',
    },
  ],

  homeWebsite: {
    TermsNConditions: '/terms-and-conditions',
    PrivacyPolicy: '/privacy-policy',
  },

  ecommerceNav: [
    { label: 'Home', value: 'home', href: '/expert-content-solutions' },
    { label: 'Services', value: 'services', href: '/expert-content-solutions#products' },
    { label: 'FAQs', value: 'faqs', href: '/expert-content-solutions#faqs' },
    { label: 'Pricing', value: 'pricing', href: '/expert-content-solutions#products' },
    { label: 'Contact', value: 'contact', href: '/expert-content-solutions#contact' },
  ],

  eCommerce: {
    home: '/expert-content-solutions',
    products: '/expert-content-solutions/#products',
    shop: '/expert-content-solutions/#products',
    cart: '/expert-content-solutions/cart',
    contentProductForm: (slug: string) =>
      `/expert-content-solutions/products/${slug}/form`,
    orders: '/expert-content-solutions/orders',
    orderDetails: (id: string) =>
      `/dashboard/shop/orders/order-details?orderNumber=${id}`,
    thankyouPage: '/expert-content-solutions/thankyou',
  },

  userDashboard: {
    website: '/expert-content-solutions',
    dashboard: '/dashboard',
    accountSettings: '/dashboard/user/profile-settings',
    passwordSettings: '/dashboard/user/profile-settings/password',
    cart: '/dashboard/shop/cart',
    orders: '/dashboard/shop/orders',
    tickets: '/dashboard/support/tickets',
    inbox: (tickedId: string) =>
      `/dashboard/support/inbox?tkt=${tickedId}`,
    invoices: '/dashboard/invoices',
    invoiceDetails: (id: string) =>
      `/dashboard/invoices/details?invoiceNumber=${id}`,
  },

  termsNconditions: 'https://www.adaired.com/terms-and-conditions',
  privacyPolicy: 'https://www.adaired.com/privacy-policy',
};
