import {
  IApproachSection,
  IBHWServices,
  IHeroSection,
  IStandOutSection,
  ISurferSEOSection,
  IFAQSection,
} from '../../types/LandingpageTypes';

export const HeroSectionDetails: IHeroSection = {
  title: "Empower Your Brand's Story With Stellar Content!",
  description:
    "Get noticed online with specialized SEO-driven content writing solutions that engage, inform, and convert your audience. Our expert writers craft compelling articles, blogs, and web content tailored to your brand's unique voice, ensuring that every piece connects to your target market.",
  buttonText: 'Place Your Order',
  buttonLink: '/expert-content-solutions#products',
  phoneNumber: '+91 89074-00008',
  imageUrl: 'BHW_banner_VTtvR',
};

export const StandOutSectionDetails: IStandOutSection = {
  subHeadingIconUrl: 'streamline:graph-bar-increase-solid',
  subHeadingText: 'Why We Stand Out',
  isSvg: false,
  title: 'Empowering Your Brand With Tailored Strategies And Proven Expertise',
  description:
    "<p>At Adaired Digital Media, we understand that quality content is the backbone of effective digital marketing. We don’t believe in a one-size-fits-all approach. By leveraging tools like <span className='text-[#F39019] font-nunito font-bold'> SurferSEO </span>, we optimize our content to ensure it meets the latest search engine standards and drives organic traffic.</p><p>With a portfolio of successful campaigns across various industries, we’ve helped many businesses and yielded tangible results. Here is what sets us apart:</p>",
  listItems: [
    'Industry-Specific Expertise',
    '100% Human-Crafted Content, CopyScape Passed',
    'Timely Delivery, Every Time, With Accuracy Guaranteed',
    'Consistency in Quality—A Promise We Keep',
  ],
};

export const ProductSectionDetails = {
  subHeadingIconUrl: '/assets/icons/bulbTick.svg',
  subHeadingText: 'Our Content Solutions',
  isSvg: true,
  title:
    "<h2 className='font-poppins font-semibold text-[30px] leading-[42px]'>We Go Beyond The Ordinary: <span className='text-[#1C5B98] font-poppins font-semibold text-[30px] leading-[42px]'>Explore Our Innovative Content Portfolio</span></h2>",
};

export const ApproachSectionDetails: IApproachSection = {
  title: 'Our Proven Approach To Content Creation ',
  description:
    'We tailor every piece of content to align perfectly with your brand:',
  iconList: [
    {
      icon: 'assets/icons/approach-1.svg',
      title: 'Know Your Goals',
      description:
        "We start by conducting a thorough dive into your brand's objectives to clearly understand your vision and expectations.",
    },
    {
      icon: 'assets/icons/approach-2.svg',
      title: 'Feedback & Revisions',
      description:
        'We work closely with you to gather feedback and make adjustments, ensuring the final product meets your expectations.',
    },
    {
      icon: 'assets/icons/approach-3.svg',
      title: 'Performance Review ',
      description:
        "After delivery, we assess the content's impact, analyzing its performance to meet your goals and deliver the desired results.",
    },
    {
      icon: 'assets/icons/approach-4.svg',
      title: 'Tailored Content',
      description:
        'Our talented writers create content that resonates with your target audience, ensuring it effectively captures their interest.',
    },
    {
      icon: 'assets/icons/approach-5.svg',
      title: 'Delivery & Support',
      description:
        'You can rely on us to deliver high-quality content, every time, with a dedicated team available for any questions.',
    },
    {
      icon: 'assets/icons/approach-6.svg',
      title: 'Continuous Improvement',
      description:
        'We focus on continuous improvement, refining the content to keep it effective and relevant.',
    },
  ],
};

export const SurferSEOSectionDetails: ISurferSEOSection = {
  icon: 'assets/icons/surferSEO.svg',
  title:
    "<span className='uppercase bg-[#f39019]/10 rounded-lg px-[10px] font-semibold text-3xl font-poppins whitespace-nowrap'>Surfer seo</span> : Our key to content success",
  iconList: [
    {
      icon: 'fluent:arrow-down-16-filled',
      title: 'Real-Time Analysis',
      description: 'Offers immediate feedback, scoring content from 0 to 100.',
    },
    {
      icon: 'fluent:arrow-down-16-filled',
      title: 'Competitor Insights',
      description:
        "Analyzes competitors' average word counts (1,500+ words) and keyword usage.",
    },
    {
      icon: 'fluent:arrow-down-16-filled',
      title: 'Guided Creation',
      description:
        'Suggests optimal keyword density (1-2%) and structured headings.',
    },
    {
      icon: 'fluent:arrow-down-16-filled',
      title: 'Performance Tracking',
      description: 'Monitors organic traffic growth and keyword rankings.',
    },
  ],
  image: {
    src: 'https://res.cloudinary.com/adaired/image/upload/v1735899368/surferSEO_COZlL.png',
    alt: 'Surfer SEO - image 1',
  },
};

export const BHWServices: IBHWServices[] = [
  {
    _id: '1',
    name: 'Creative Writing',
    description: 'Creative Writing',
    slug: 'creative-writing',
    products: [
      {
        imgUrl: '/assets/icons/product-1.svg',
        title: 'Infographics',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-2.svg',
        title: 'Newsletters',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-3.svg',
        title: 'Social Media',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-4.svg',
        title: 'Google Business Profile  Descriptions',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-5.svg',
        title: 'Infographics',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
    ],
    status: 'active',
  },
  {
    _id: '2',
    name: 'Blogs',
    description: 'Blogs',
    slug: 'blogs',
    products: [
      {
        imgUrl: '/assets/icons/product-3.svg',
        title: 'Social Media',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-1.svg',
        title: 'Infographics',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-5.svg',
        title: 'Infographics',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-2.svg',
        title: 'Newsletters',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-4.svg',
        title: 'Google Business Profile  Descriptions',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
    ],
    status: 'active',
  },
  {
    _id: '3',
    name: 'Website Content',
    description: 'Website Content',
    slug: 'website-content',
    products: [
      {
        imgUrl: '/assets/icons/product-2.svg',
        title: 'Newsletters',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-5.svg',
        title: 'Infographics',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-3.svg',
        title: 'Social Media',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-1.svg',
        title: 'Infographics',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-4.svg',
        title: 'Google Business Profile  Descriptions',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
    ],
    status: 'active',
  },
  {
    _id: '4',
    name: 'Copywriting',
    description: 'Copywriting',
    slug: 'copywriting',
    products: [
      {
        imgUrl: '/assets/icons/product-2.svg',
        title: 'Newsletters',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-4.svg',
        title: 'Google Business Profile  Descriptions',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-5.svg',
        title: 'Infographics',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-1.svg',
        title: 'Infographics',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-3.svg',
        title: 'Social Media',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
    ],
    status: 'active',
  },
  {
    _id: '5',
    name: 'Reviews',
    description: 'Reviews',
    slug: 'reviews',
    products: [
      {
        imgUrl: '/assets/icons/product-2.svg',
        title: 'Newsletters',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-1.svg',
        title: 'Infographics',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-3.svg',
        title: 'Social Media',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-5.svg',
        title: 'Infographics',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
      {
        imgUrl: '/assets/icons/product-4.svg',
        title: 'Google Business Profile  Descriptions',
        buttonText: 'Order Now',
        buttonLink: '/landing-page',
      },
    ],
    status: 'active',
  },
];

export const FAQSectionDetails: IFAQSection[] = [
  {
    title: 'What is your policy on revisions and feedback?',
    content:
      'We’re dedicated to ensuring your complete satisfaction and are happy to work with you until the content meets your expectations.',
  },
  {
    title: 'Are your payment methods secure?',
    content:
      'Yes, we handle every transaction securely to provide a smooth and safe experience for our clients.',
  },
  {
    title: 'What if we need content outside your normal TAT?',
    content:
      'We understand that urgent needs may arise, and we’re happy to accommodate such requests. Get in touch to know more!',
  },
  {
    title: 'How can I cancel or pause my content order?',
    content:
      'If you need to cancel or pause your order, please reach out to our support team. Ideally, within 24 hours of placing your order, discuss your options',
  },
  {
    title: 'How Do I Reach Out To You?',
    content:
      'You can reach out to us via our website form, email, or support line for any inquiries.',
  },
  {
    title: 'Do You Offer Automated Invoices?',
    content:
      'Yes, once you’ve made the payment, you will receive the invoice directly to your registered email.',
  },
];
