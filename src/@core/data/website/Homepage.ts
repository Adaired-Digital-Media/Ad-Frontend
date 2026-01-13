import blog_1 from '../../../../public/assets/images/blogs/blog_01.png';
import blog_2 from '../../../../public/assets/images/blogs/blog_02.png';
import blog_3 from '../../../../public/assets/images/blogs/blog_03.png';
import visible from '../../../../public/assets/icons/visions.png';
import Transparent from '../../../../public/assets/icons/built_1.svg';
import Experienced from '../../../../public/assets/icons/Experienced_1.svg';
import Dedicated from '../../../../public/assets/icons/Dedicated_1.svg';
import customer from '../../../../public/assets/icons/customer.svg';
import goal from '../../../../public/assets/icons/goal.png';
import Web_Design from '../../../../public/assets/images/service/Web Design & Development.png';
import Digital_Creative from '../../../../public/assets/images/service/Paid Media & Advertising.png';
import seo2 from '../../../../public/assets/icons/service/seo_Img.png';

//services images
import SEO from '../../../../public/assets/images/service/SEO.png';
import AI_SEO from '../../../../public/assets/images/service/SSM.png';
import Content from '../../../../public/assets/images/service/Content.png';
import SMM from '../../../../public/assets/images/service/AI_SEO.png';
import GBP_1 from '../../../../public/assets/images/service/GBP_1.png';
import GBP_2 from '../../../../public/assets/images/service/GBP_3.png';
import GBP_3 from '../../../../public/assets/images/service/GBP_2.png';
import GBP_4 from '../../../../public/assets/images/service/GBP_4.png';

import Ad_1 from '../../../../public/assets/images/service/Ad_1.png';
import Ad_2 from '../../../../public/assets/images/service/Ad_2.png';
import Ad_3 from '../../../../public/assets/images/service/Ad_3.png';
import Ad_4 from '../../../../public/assets/images/service/Ad_4.png';

import web_1 from '../../../../public/assets/images/service/web_1.png';
import web_2 from '../../../../public/assets/images/service/web_2.png';
import web_3 from '../../../../public/assets/images/service/web_3.png';
import web_4 from '../../../../public/assets/images/service/web_4.png';

import White_SEO_1 from '../../../../public/assets/images/service/White_SEO_1.png';
import White_SEO_2 from '../../../../public/assets/images/service/White_SEO_2.png';
import White_SEO_3 from '../../../../public/assets/images/service/White_SEO_3.png';
import White_SEO_4 from '../../../../public/assets/images/service/White_SEO_4.png';
import White_Label_Services from '../../../../public/assets/images/service/White_Label_Services.png';
import App_1 from '../../../../public/assets/images/service/App_1.png';
import App_2 from '../../../../public/assets/images/service/App_4.png';
import App_3 from '../../../../public/assets/images/service/App_2.png';
import App_4 from '../../../../public/assets/images/service/App_3.png';
//services icons
import amazon from '../../../../public/assets/icons/service/amazon.png';
import app_1 from '../../../../public/assets/icons/service/app_1.png';
import app_2 from '../../../../public/assets/icons/service/app_2.png';
import app_3 from '../../../../public/assets/icons/service/app_3.png';
import app_4 from '../../../../public/assets/icons/service/app_4.png';
import seo from '../../../../public/assets/icons/service/seo.png';
import ai_seo from '../../../../public/assets/icons/service/ai_seo.png';
import content from '../../../../public/assets/icons/service/content.png';
import smm from '../../../../public/assets/icons/service/smm.png';
import Insta_Ads from '../../../../public/assets/icons/service/Insta_Ads.png';
import GBPSetup from '../../../../public/assets/icons/service/GBPSetup.png';
import FakeGBPReporting from '../../../../public/assets/icons/service/FakeGBPReporting.png';
import FakeGoogleReviewReporting from '../../../../public/assets/icons/service/FakeGoogleReviewReporting.png';
import GBPManagement from '../../../../public/assets/icons/service/GBPManagement.png';
import GoogleAds from '../../../../public/assets/icons/service/GoogleAds.png';
import html from '../../../../public/assets/icons/service/html.png';
import LinkBuilding from '../../../../public/assets/icons/service/LinkBuilding.png';
import shoppyfy from '../../../../public/assets/icons/service/shoppyfy.png';
import TikTokAds from '../../../../public/assets/icons/service/TikTokAds.png';
import LinkedInAds from '../../../../public/assets/icons/service/LinkedInAds.png';

import WhiteLabelFacebookAds from '../../../../public/assets/icons/service/WhiteLabelFacebookAds.png';
import WhiteLabelSEO from '../../../../public/assets/icons/service/WhiteLabelSEO.png';
import WhiteLabelSocialMedia from '../../../../public/assets/icons/service/WhiteLabelSocialMedia.png';
import wordpress from '../../../../public/assets/icons/service/wordpress.png';

import { StaticImageData } from 'next/image';

export interface ServiceItem {
  icon: StaticImageData;
  label: string;
  title: string;
  description: string;
  link: string;
  image?: StaticImageData; // ✅ OPTIONAL (important)
}

export interface ServiceSection {
  title: string;
  description: string;
  link?: string;
  list: ServiceItem[];
  mainSvg?: string;
  img?: StaticImageData;
  accentColor?: string;
}

export interface ServiceSectionDataType {
  subtitle: string;
  title: string;
  span: string;
  description: string;
  services: ServiceSection[];
}

export const SolutionsSectionData = {
  image: 'Static Website Images/about_main_anwqk5',
  subTitle: 'Solutions',
  title: 'Every Brand Has A Story, And We’re Here To Tell It Better!',
  description:
    'As a powerhouse digital agency, we craft bold ideas backed by data and fueled by creativity that attract attention, command authority, and convert consistently. If you want a partner that pushes limits and powers real growth, you’re in the right place.',
  points: [
    {
      icon: goal,
      title: 'Our Mission',
      description:
        'We work as your dedicated enterprise digital marketing agency, focused on outcomes, inspired by ideas, and committed to making your brand hard to ignore.',
    },
    {
      icon: visible,
      title: 'Our Vision',
      description:
        'We’re a team of expert strategists, and digital thinkers, a modern blend you’d expect from leading digital transformation agencies, who turn insights into ideas.',
    },
  ],
  cursive:
    'As a powerhouse digital agency, we craft bold ideas backed by data and fueled by creativity that attract attention, command authority, and convert consistently.',
  btnText: 'See What’s Next',
  btnHref: '/about',
};
export const AboutSectionData = {
  image: 'Static Website Images/about_main_anwqk5',
  subTitle: 'ABOUT US',
  title: 'Every Brand Has A Story, And We’re Here To Tell It Better!',
  description:
    'As a powerhouse digital agency, we craft bold ideas backed by data and fueled by creativity that attract attention, command authority, and convert consistently. If you want a partner that pushes limits and powers real growth, you’re in the right place.',
  points: [
    {
      icon: goal,
      title: 'Our Mission',
      description:
        'We work as your dedicated enterprise digital marketing agency, focused on outcomes, inspired by ideas, and committed to making your brand hard to ignore.',
    },
    {
      icon: visible,
      title: 'Our Vision',
      description:
        'We’re a team of expert strategists, and digital thinkers, a modern blend you’d expect from leading digital transformation agencies, who turn insights into ideas.',
    },
  ],
  cursive:
    'As a powerhouse digital agency, we craft bold ideas backed by data and fueled by creativity that attract attention, command authority, and convert consistently.',
  btnText: 'See What’s Next',
  btnHref: '/about',
};

export const ExpectSectionData = {
  image: 'Static Website Images/about_main_anwqk5',
  subTitle: 'Advance. Innovate. Achieve.',
  title: `A Journey Marked by Success, Creativity, and Progress`,
  description: `Our journey in digital marketing is defined by creativity, measurable success, and continuous progress. From SEO and paid campaigns to social media and analytics, we craft strategies that drive engagement, amplify brand visibility, and deliver sustainable growth, turning every campaign into tangible results and long-term business impact.`,
  points: [
    {
      icon: 'Static Website Images/homepage_about2',
      title: 'More visibility, More Opportunities',
      description:
        'From building identities to shaping conversations and driving measurable impact, we work as your dedicated enterprise digital marketing agency, focused on outcomes, inspired by ideas, and committed to making your brand hard to ignore.',
    },
    {
      icon: 'Static Website Images/homepage_about1',
      title: 'Higher Engagement Rates',
      description:
        'We’re a team of expert strategists, creators, designers, and digital thinkers, a modern blend you’d expect from leading digital transformation agencies, who turn insights into ideas. For us, it’s simple: brands don’t grow by accident. They grow with intention, consistency, and bold execution. That’s what we bring to the table.',
    },
    {
      icon: 'Static Website Images/homepage_about2',
      title: 'Stronger Brand Presence',
      description:
        'From building identities to shaping conversations and driving measurable impact, we work as your dedicated enterprise digital marketing agency, focused on outcomes, inspired by ideas, and committed to making your brand hard to ignore.',
    },
    {
      icon: 'Static Website Images/homepage_about1',
      title: 'Every Dollar Counts',
      description:
        'We’re a team of expert strategists, creators, designers, and digital thinkers, a modern blend you’d expect from leading digital transformation agencies, who turn insights into ideas. For us, it’s simple: brands don’t grow by accident. They grow with intention, consistency, and bold execution. That’s what we bring to the table.',
    },
  ],
  para2:
    'At Adaired Digital Media, we don’t just create strategies; we deliver measurable impact. Our approach transforms ideas into action and action into results that are important to your business.',
  btnHref: '/about',
  records: [
    {
      number: 8,
      suffix: '+ ',
      suffix2: 'years',
      name: 'Industry Expertise',
      description:
        'Trusted expertise creating solutions that drive performance, engagement, and measurable outcomes.',
    },
    {
      number: 80,
      suffix: '+ ',
      suffix2: 'Partners',
      name: 'Global Network',
      description:
        'Collaborating with 80+ partners across 11 countries, driving global innovation together.',
    },
    {
      number: 5,
      suffix: 'K+ ',
      suffix2: 'Projects Completed',
      name: 'Project Excellence',
      description:
        'Successfully completing 5,000+ projects worldwide, delivering impact, innovation, and excellence across borders.',
    },
    {
      number: 1500,
      suffix: '+ ',
      suffix2: 'Happy Clients',
      name: 'Trusted Relationships',
      description:
        'Serving 1,500+ happy clients with exceptional solutions, trust, and lasting satisfaction worldwide',
    },
  ],
};

export const WhyChooseSectionData = {
  image: 'Static Website Images/about_main_anwqk5',
  subTitle: 'WHY CHOOSE US',
  title: 'Why Choose Adaired as Your',
  span: 'Digital Growth Partner?',
  description:
    'Adaired combines expert-led digital strategies, dedicated account management, and real-time performance transparency to drive measurable growth. With an ROI-first mindset, we focus on scalable solutions that turn marketing investments into consistent, profitable results.',
  points: [
    {
      icon: Experienced,
      title: 'Experienced ',
      span: 'Digital Specialists',
      description:
        'Our team of certified SEO, Google Ads, and analytics professionals drives scalable brand growth using data-backed digital strategies.',
    },
    {
      icon: Dedicated,
      title: 'Dedicated ',
      span: 'Project Manager',
      description:
        'Each client works with one dedicated contact who understands goals, streamlines communication, and ensures smooth, timely project management.',
    },
    {
      icon: Transparent,
      title: 'Transparent',
      span: 'Real-Time Processes',
      description:
        'Our ROI-first approach ensures every strategy, campaign, and investment delivers measurable value, sustainable growth, and profitable results.',
    },
    {
      icon: customer,
      title: 'ROI-First',
      span: 'Approach',
      description:
        'Your success is our priority. We listen, we understand, and we tailor our solutions to your needs, not the other way around. ',
    },
  ],
};

export const CaseStudySectionData = {
  image: 'Static Website Images/about_main_anwqk5',
  subTitle: 'CASE STUDIES',
  title: 'Real Success Stories Showcasing',
  span: 'Our Impact, Innovation, and Client Achievements.',
  description:
    'Discover real success stories that highlight our impact, drive innovation, and celebrate client achievements. See how our solutions transform businesses, empower growth, and create measurable results across industries.',
  studies: [
    {
      image: 'Static Webstudy_3',
      labels: ['Organics', 'SEO'],
      title: 'Digital Agency Businesses',
      description:
        "Our team includes skilled digital experts who understand what works in today's competitive environment. From strategy to execution, we have years of hands-on expertise to help your brand grow faster and smarter.",
      bgColor: '#FFF4F3',
    },
    {
      image: 'Static Webstudy_3',
      labels: ['Organics', 'SEO'],
      title: 'Digital Agency Businesses',
      description:
        'Every client is assigned a single point of contact who understands your objectives, keeps everything on track, and ensures effective communication from beginning to end. There will be no confusion or delays, only seamless project management.',
      bgColor: '#D7EBFF',
    },
    {
      image: 'Static Webstudy_3',
      labels: ['Organics', 'SEO'],
      title: 'Digital Agency Businesses',
      description:
        'We believe in honesty at every step. You always know what we’re doing, why we’re doing it, and how it benefits your brand. Clear updates, open communication, and performance reports you can trust.',
      bgColor: '#E1F2E2',
    },
  ],
};

export const TestimonialSectionData = {
  image: 'Static Website Images/about_main_anwqk5',
  subTitle: 'Testimonials',
  title: 'What Our Clients Say About Us',
  span: '',
  description:
    'Discover client experiences that inspire, highlighting measurable results, innovative solutions, and the lasting impact we create across industries.',
  testimonials: [
    {
      image: 'Static Website Images/homepage_about2',
      name: '🚀 Media Buyer Wanted for',
      span: 'Explosive Dropshipping Launch',
      description:
        '"Great to work with. Clear, timely, detailed communication style. Receptive to feedback and recommendations. I would highly recommend working with Seema and team."',
      bgColor: '#FFF4F3',
      rating: 5,
    },
    {
      image: 'Static Website Images/homepage_about1',
      name: 'Shopify coding,',
      span: '',
      description:
        '"I work with Dheeraj whenever I have something to fix on my website. He is very fast, does his job very well, and delivers quickly. I’m confident that whenever I have something to adjust on my website, I will come back to him. He is so professional and expert"',
      bgColor: '#D7EBFF',
      rating: 5,
    },
    {
      image: 'Static Website Images/homepage_about2',
      name: 'SEO Specialist for Keyword Research,',
      span: '',
      description:
        '"Working with Seema has been an exceptionally professional experience. Her dedication and expertise make collaboration seamless, and I eagerly anticipate future opportunities to work alongside her. Thank you for the outstanding partnership!"',
      bgColor: '#E1F2E2',
      rating: 5,
    },
    {
      image: 'Static Website Images/homepage_about2',
      name: 'Shopify Expert for shipping integration',
      span: '',
      description:
        'Integrated a shipping courier on my shopify account. Very professional, responds very quickly and task done in 1 days for a pretty complex tasks. I recommend 100% dheeraj."',
      bgColor: '#FFF4F3',
      rating: 5,
    },
    {
      image: 'Static Website Images/homepage_about1',
      name: 'Setup Social Media Account',
      span: '',
      description:
        '"Thank you seema for your exceptional work and fast delivery. Your dedication and efficiency have truly exceeded my expectations. Your attention to detail and ability to meet deadlines have been invaluable."',
      bgColor: '#D7EBFF',
      rating: 5,
    },
  ],
};

export const LogoSliderSectionData = {
  title: 'Trusted By:',
  description:
    'The success of our clients is what determines our success. Below are a few of our favorite clients who we have worked for; we have reserved a spot for you!',
  logos: [
    {
      image: 'Static Website Images/trustedBy_1',
      alt: 'Logo 1',
    },
    {
      image: 'Static Website Images/trustedBy_2',
      alt: 'Logo 2',
    },
    {
      image: 'Static Website Images/trustedBy_3',
      alt: 'Logo 3',
    },
    {
      image: 'Static Website Images/trustedBy_4',
      alt: 'Logo 4',
    },
    {
      image: 'Static Website Images/trustedBy_5',
      alt: 'Logo 5',
    },
    {
      image: 'Static Website Images/trustedBy_6',
      alt: 'Logo 6',
    },
    {
      image: 'Static Website Images/trustedBy_7',
      alt: 'Logo 7',
    },
    {
      image: 'Static Website Images/trustedBy_8',
      alt: 'Logo 8',
    },
    {
      image: 'Static Website Images/trustedBy_9',
      alt: 'Logo 9',
    },
    {
      image: 'Static Website Images/trustedBy_10',
      alt: 'Logo 10',
    },
    {
      image: 'Static Website Images/trustedBy_11',
      alt: 'Logo 11',
    },
    {
      image: 'Static Website Images/trustedBy_12',
      alt: 'Logo 12',
    },
  ],
};

export const ServiceSectionData = {
  subtitle: 'Expert Marketing Solutions',
  title: '360° Digital Marketing Services for Modern',
  span: 'Business Needs',
  description: `Our success-driven digital marketing services integrate AI-enhanced SEO, advanced analytics, and conversion-focused strategies to strengthen brand presence, improve search performance, and accelerate measurable business growth.`,
  services: [
    {
      title: 'Digital Marketing',
      description:
        'We use AI-driven insights, advanced SEO, and result-driven strategies to boost brand reach, improve search rankings, and drive conversions.',
      list: [
        {
          icon: seo,
          image: SEO,
          label: 'Search Engine Optimization',
          title: 'Search Engine Optimization',
          description: `We provide Search Engine Optimization services that are aimed at increasing the presence online and driving meaningful engagement. We combine smart keyword targeting, technical optimization, and credible content to make your business achieve consistent rankings and sustainable organic growth.`,
          link: '/services/search-engine-optimization',
        },
        {
          icon: ai_seo,
          image: AI_SEO,
          label: 'AI SEO',
          title: 'AI SEO',
          description: `Our AI SEO solutions leverage artificial intelligence to analyze search behavior, optimize content, and improve rankings with precision. We use data-driven insights, automation, and predictive strategies to enhance visibility, target intent-driven keywords, and deliver measurable SEO performance.`,
          link: '/services/search-engine-optimization',
        },
        {
          icon: content,
          image: Content,
          label: 'Content Writing',
          title: 'Content Writing',
          description: `At Adaired, we craft strategic content designed to educate, engage, and convert audiences effectively. From blogs and web pages to compelling marketing copy, our content writing services enhance brand voice, boost search performance, build credibility, and support long-term digital growth through clear, consistent, and results-driven messaging.`,
          link: '/services/compelling-content-marketing',
        },
        {
          icon: smm,
          image: SMM,
          label: 'Social Media Management',
          title: 'Social Media Management',
          description: `We offer strategic social media management services that build brand presence, engages audiences, and drives growth. From content creation and scheduling to community management and performance tracking, our services help brands connect authentically, increase visibility, and achieve consistent results across all major social platforms.`,
          link: '/services/strategic-social-media-management',
        },
      ],
      mainSvg: 'Search Engine Optimization_eyQDn',
      img: seo2,
      accentColor: '#f89520',
      link: '/services/search-engine-optimization',
    },
    {
      title: 'Google Business Profile ',
      description:
        'We optimize your Google Business Profile with local SEO, review management, and continuous updates to boost visibility, engagement, and growth.',
      link: '/services/local-seo',
      list: [
        {
          icon: GBPManagement,
          image: GBP_1,
          label: 'GBP Management',
          title: 'GBP Management',
          description: `We provide expert Google Business Profile management to improve local visibility and customer engagement. From profile optimization and regular updates to review management and performance insights, our GBP services help businesses rank higher in local searches, attract nearby customers, and build trust through a strong local presence.`,
          link: '/services/local-seo',
        },
        {
          icon: GBPSetup,
          image: GBP_2,
          label: 'GBP Setup',
          title: 'GBP Setup',
          description: `At Adaired, we offer a complete Google Business Profile setup to ensure your business is accurately listed and optimized from day one. From creating and verifying your profile to adding essential business details, categories, and visuals, our GBP setup service builds a strong foundation for improved local visibility and customer trust.`,
          link: '/services/local-seo',
        },
        {
          icon: FakeGBPReporting,
          image: GBP_3,
          label: 'Fake GBP Reporting',
          title: 'Fake GBP Reporting',
          description: `We provide professional fake Google Business Profile reporting to help protect your brand’s local presence. Our team identifies and reports fraudulent or spam listings, ensuring compliance with Google guidelines and reducing unfair competition, so your legitimate business can rank accurately and maintain trust in local search results.`,
          link: '/services/local-seo',
        },
        {
          icon: FakeGoogleReviewReporting,
          image: GBP_4,
          label: 'Fake Google Review Reporting',
          title: 'Fake Google Review Reporting',
          description: `Safeguard your business from fake Google reviews. We identify fraudulent or malicious reviews, collect evidence, and report them to Google through official channels. Our professional process helps restore trust, protect your online reputation, maintain credibility, and ensure your business profile accurately reflects genuine customer feedback.`,
          link: '/services/local-seo',
        },
      ],
      mainSvg: 'Web Dev_JjQ6b',
      img: Web_Design,
      accentColor: '#038eb0',
    },
    {
      title: 'Pay Per Click',
      description:
        'Maximize ROI with precision PPC campaigns, combining AI-driven targeting, analytics, and optimization to efficiently generate qualified leads.',
      link: '/services/paid-media-and-advertising',
      list: [
        {
          icon: GoogleAds,
          image: Ad_1,
          label: 'Google Ads',
          title: 'Google Ads',
          description: `Maximize your online visibility and drive targeted traffic with our Google Ads management. We create, optimize, and monitor high-performing campaigns to increase leads, boost sales, and improve ROI. Our expert approach ensures your ads reach the right audience at the right time for measurable business growth.`,
          link: '/services/paid-media-and-advertising',
        },
        {
          icon: TikTokAds,
          image: Ad_2,
          label: 'Meta Ads (Fb/Insta)',
          title: 'Meta Ads (Fb/Insta)',
          description: `Grow your brand with targeted Meta Ads on Facebook and Instagram. We design, manage, and optimize campaigns that reach the right audience, boost engagement, and drive conversions. Our data-driven strategies maximize ROI, increase visibility, and help your business connect with customers where they spend the most time online.`,
          link: '/services/paid-media-and-advertising',
        },
        {
          icon: LinkedInAds,
          image: Ad_3,
          label: 'LinkedIn Ads',
          title: 'LinkedIn Ads',
          description: `Reach the right professionals with targeted LinkedIn Ads. We create, manage, and optimize campaigns to generate leads, increase brand authority, and drive B2B growth. Our strategic approach ensures your ads engage decision-makers, maximize ROI, and strengthen your professional presence on the world’s leading business network.`,
          link: '/services/paid-media-and-advertising',
        },
        {
          icon: Insta_Ads,
          image: Ad_4,
          label: 'TikTok Ads',
          title: 'TikTok Ads',
          description: `Capture attention and drive results with TikTok Ads. We create, manage, and optimize engaging campaigns that reach your target audience, boost brand awareness, and increase conversions. Our creative, data-driven approach ensures your content goes viral, maximizes ROI, and connects your business with a younger, trend-focused audience.`,
          link: '/services/paid-media-and-advertising',
        },
      ],
      mainSvg: 'Pay Per Click_pdGDn',
      img: Digital_Creative,
      accentColor: '#d71a1a',
    },
    {
      title: 'Web Design & Development',
      description:
        'Responsive, intuitive, and high-performing websites that increase engagement, enhance usability, and deliver real, measurable results.',
      link: '/services/web-design-and-development-services',
      list: [
        {
          icon: wordpress,
          image: web_1,
          label: 'WordPress Development',
          title: 'WordPress Development',
          description: `Build a powerful, professional website with our WordPress Development services. We design, develop, and customize responsive sites tailored to your brand, ensuring fast performance, SEO optimization, and user-friendly navigation. From blogs to e-commerce, we deliver secure, scalable solutions that help your business grow online effectively.`,
          link: '/services/shopify-development',
        },
        {
          icon: shoppyfy,
          image: web_2,
          label: 'Shopify Development',
          title: 'Shopify Development',
          description: `Launch and grow your online store with our Shopify Development services. We design, build, and customize responsive, secure, and user-friendly e-commerce websites. From product management to payment integration, our solutions drive sales, enhance customer experience, and help your business succeed in the competitive world of online retail.`,
          link: '/services/search-engine-optimization',
        },
        {
          icon: amazon,
          image: web_3,
          label: 'eCommerce Web Development',
          title: 'eCommerce Web Development',
          description: `Transform your online business with our eCommerce Web Development services. We create responsive, secure, and user-friendly websites tailored to your brand, optimized for performance and conversions. From product catalogs to payment gateways, our solutions drive sales, enhance customer experience, and help your business thrive in the digital marketplace.`,
          link: '/services/web-design-and-development-services',
        },
        {
          icon: html,
          image: web_4,
          label: 'Custom Web Development',
          title: 'Custom Web Development',
          description: `Bring your vision to life with our Custom Web Development services. We design and build tailored websites that meet your unique business needs, ensuring responsive design, seamless functionality, and scalability. Our solutions enhance user experience, boost performance, and provide a strong digital presence to help your business grow online.`,
          link: '/services/web-design-and-development-services',
        },
      ],
      mainSvg: 'Logo Design_PpqcI',
      img: Web_Design,
      accentColor: '#5c34b1',
    },
    {
      title: 'White Label Services ',
      description:
        'Expand your offerings effortlessly with our White Label Services. We offer fully branded solutions, expert support, and seamless integration for business growth.',
      link: '/services/search-engine-optimization',
      list: [
        {
          icon: WhiteLabelSEO,
          image: White_SEO_1,
          label: 'White Label SEO',
          title: 'White Label SEO',
          description: `We help you boost your agency’s offerings with White Label SEO from Adaired. We deliver expert SEO services under your brand, so you can expand without extra overhead. From keyword research to link building and reporting, we handle all the technical work while you keep full client ownership. Together, we help you scale your business, enhance results, and maintain your brand reputation effortlessly.`,
          link: '/services/search-engine-optimization',
        },
        {
          icon: WhiteLabelSocialMedia,
          image: White_SEO_2,
          label: 'White Label Social Media',
          title: 'White Label Social Media',
          description: `At Adaired, we help you expand your agency’s services with White Label Social Media services. We create, manage, and optimize social media campaigns under your brand, so you can deliver results without extra overhead. From content creation to scheduling and analytics, we handle the work while you retain full client ownership.`,
          link: '/services/search-engine-optimization',
        },
        {
          icon: WhiteLabelFacebookAds,
          image: White_SEO_3,
          label: 'White Label Facebook Ads',
          title: 'White Label Facebook Ads',
          description: `We help your agency scale with White Label Facebook Ads. We handle ad strategy, creation, targeting, and reporting under your brand, so you deliver results without extra overhead. You keep full client ownership while we drive performance, boost ROI, and protect your brand reputation.`,
          link: '/services/search-engine-optimization',
        },
        {
          icon: LinkBuilding,
          image: White_SEO_4,
          label: 'White Label Link Building',
          title: 'White Label Link Building',
          description: `We help your agency grow with White Label Link Building from Adaired. We handle outreach, content placement, and quality backlink acquisition under your brand, so you deliver results without extra overhead. You keep full client ownership while we boost domain authority, improve rankings, and protect your brand reputation.`,
          link: '/services/search-engine-optimization',
        },
      ],
      mainSvg: 'Logo Design_PpqcI',
      img: White_Label_Services,
      accentColor: '#5c34b1',
    },
    {
      title: 'Mobile App Development',
      link: '/services/web-design-and-development-services',
      description:
        'We help you create high-performing mobile apps. Our team manages design, development, and deployment, delivering apps that engage users and grow your business.',
      list: [
        {
          icon: app_1,
          image: App_1,
          label: 'IOS App Development',
          title: 'IOS App Development',
          description: `We specialize in iOS App Development, creating seamless, high-performing apps for iPhone and iPad. From design and coding to testing and deployment, we handle everything under your brand, helping you deliver quality apps while retaining full client ownership.`,
          link: '/services/web-design-and-development-services',
        },
        {
          icon: app_2,
          image: App_2,
          label: 'Android App Development',
          title: 'Android App Development',
          description: `At Adaired, we specialize in Android App Development, building high-performing, user-friendly apps for all Android devices. From design and coding to testing and deployment, we handle everything under your brand, helping you deliver apps while retaining full client ownership.`,
          link: '/services/web-design-and-development-services',
        },
        {
          icon: app_3,
          image: App_3,
          label: 'Cross-Platform',
          title: 'Cross-Platform',
          description: `At Adaired, we specialize in Cross-Platform App Development, creating apps that work flawlessly on both iOS and Android. From design and coding to testing and deployment, we handle the technical work under your brand, helping you deliver quality apps and scale your business effortlessly.`,
          link: '/services/web-design-and-development-services',
        },
        {
          icon: app_4,
          image: App_4,
          label: 'Wearables',
          title: 'Wearables',
          description: `We specialize in Wearable App Development at Adaired, creating apps for smartwatches, fitness trackers, and other wearable devices. From design to development and integration, we deliver seamless, high-performing apps under your brand, helping you enhance user engagement, provide real-time data, and expand your digital offerings effortlessly.`,
          link: '/services/web-design-and-development-services',
        },
      ],
      mainSvg: 'Logo Design_PpqcI',
      img: Web_Design,
      accentColor: '#5c34b1',
    },
  ],
};

export const GrowthSectionData = {
  images: [
    {
      src: 'Static Website Images/TeamsBig',
      alt: 'Growth Image',
      height: 800,
      width: 800,
      className:
        'max-w-[500px] lg:max-w-full after:absolute after:-top-3 after:-right-3 md:after:-top-6 md:after:-right-6 after:border-2 after:border-[#BC1D8D] after:h-[90%] after:w-[90%] after:-z-10',
    },
    {
      src: 'Static Website Images/TeamsSmall',
      alt: 'Growth Image',
      height: 100,
      width: 300,
      className:
        'absolute top-3/4 left-1/2 -translate-x-1/2 xl:translate-x-0 xl:top-auto xl:left-auto xl:bottom-[20%] xl:right-[-20%]',
    },
  ],
  subTitle: 'Holistic Expertise',
  title: 'Digital Marketing Experts Dedicated To Your Growth',
  description:
    'Adaired has helped numerous companies develop their brands with its digital marketing services worldwide. We understand the importance of leads, sales, and return on investment when it comes to digital marketing. Our clients come from all industries of every size.',
  features: [
    'Comprehensive Services',
    'Industry Expertise',
    'Client-Centric Approach',
    'Tailored Solutions',
  ],
  description_II:
    'Our digital marketing agency provides a wide range of services, from initial brand development to a globally syndicated advertising campaign, all of which are customized to meet the unique needs of our clients.',
  pinkBorderText:
    'We strive to surpass your expectations, providing unparalleled quality in our online marketing services.',
  btnText: 'Learn More',
  btnHref: '/about',
};

export const AwardsSectionData = [
  {
    image: 'Static Website Images/badge1',
    alt: 'badge_image_1',
  },
  {
    image: 'Static Website Images/badge2',
    alt: 'badge_image_2',
  },
  {
    image: 'Static Website Images/badge3',
    alt: 'badge_image_3',
  },
  {
    image: 'Static Website Images/badge4',
    alt: 'badge_image_4',
  },
  {
    image: 'Static Website Images/badge5',
    alt: 'badge_image_5',
  },
  {
    image: 'Static Website Images/badge6',
    alt: 'badge_image_6',
  },
  {
    image: 'Static Website Images/badge7',
    alt: 'badge_image_7',
  },
  {
    image: 'Static Website Images/badge8',
    alt: 'badge_image_8',
  },
];

export const ContactSectionData = {
  image: 'Static Website Images/contact_us_image',
  subTitle: 'Contact Us',
  title: 'Power your business growth with',
  span: 'trusted strategies that work',
  description:
    'Accelerate your business growth with expert guidance, practical solutions, and proven strategies that help you seize opportunities, overcome challenges, and achieve lasting success.',
  contactDetails: [
    {
      href: 'mailto:info@adaired.com',
      imageSrc: '/assets/images/gmail.svg',
      alt: 'Gmail Logo',
      text: 'info@adaired.com',
    },
    {
      href: 'https://api.whatsapp.com/send?phone=918907400008',
      imageSrc: '/assets/images/whatsapp.svg',
      alt: 'Whatsapp Logo',
      text: 'Adaired Digital',
    },
    // {
    //   href: 'skype:live:.cid.46cf67c456a5bb0c?chat',
    //   imageSrc: '/assets/images/skype.svg',
    //   alt: 'Skype Logo',
    //   text: 'Adaired Digital',
    // },
    // {
    //   href: 'https://telegram.me/adaired',
    //   imageSrc: '/assets/images/telegram.svg',
    //   alt: 'Telegram Logo',
    //   text: 'Adaired Digital Media',
    // },
  ],
};

export const BlogSectionData = {
  image: 'Static Website Images/about_main_anwqk5',
  subTitle: 'OUR BlOGS',
  title: 'Stay Ahead With The Latest',
  span: 'Market Insights',
  description:
    'Discover the latest insights, tips, and stories on our blog. Stay updated with the latest trends, ideas, and inspiration. ',
  blogs: [
    {
      image: blog_1,
      label: '02 Jan, 2026',
      title:
        'The Science Behind a Good Logo for Business and High-Impact Website Design',
      description:
        'In a highly competitive digital marketplace, your brand has only a few seconds to make an impression.  Your customers will notice two things in ',
      bgColor: '#FFF4F3',
      rating: 5,
      link: '/good-logo-for-business-and-website-design-science',
    },
    {
      image: blog_2,
      label: '30 Dec, 2025',
      title:
        'What to Expect from a Digital Marketing Agency USA: A Complete Guide for Businesses',
      description:
        'In today’s competitive online landscape, having a strong digital presence is no longer optional;',
      bgColor: '#D7EBFF',
      link: '/what-to-expect-from-a-digital-marketing-agency-usa',
      rating: 5,
    },
    {
      image: blog_3,
      label: '26 Dec, 2025',
      title: 'The Complete Web Design Process For Successful Business',
      description:
        'Looking for website design services in the USA ? Bringing a website to life is more than just technical work. It’s a creative',
      bgColor: '#E1F2E2',
      link: '/web-design-process-for-business',
      rating: 5,
    },
  ],
};

export const FAQSSectionData = {
  image: 'Static Website Images/about_main_anwqk5',
  subTitle: 'FAQS',
  title: 'Questions You Have, Answers You Need',
  span: 'Have questions? Our FAQ section provides clear, concise answers about our services to guide you effortlessly.',
  description:
    'Stay ahead of the digital curve with expert insights, practical strategies, and the latest trends designed to help your brand grow with confidence.',
  faqs: [
    {
      image: blog_1,
      title: 'What services does Adaired provide?',
      description:
        'Adaired is a full-service digital agency that provides SEO, web design and development, branding, UI/UX, content marketing, social media management, paid advertising, and performance-based digital strategies. Everything we do is customized for your specific business goals, ensuring measurable growth rather than simply maintaining an online presence.',
      bgColor: '#FFF4F3',
      rating: 5,
    },
    {
      image: blog_2,
      title: 'How does Adaired deal with new projects?',
      description:
        'We begin by learning about your brand, goals, target audience, and challenges. Before moving forward with execution, we develop a clear strategy based on data and insights. Every project has a structured, transparent process that ensures alignment, clarity, and results at all stages.',
      bgColor: '#D7EBFF',
      rating: 5,
    },
    {
      image: blog_3,
      title: 'Do you work with startups or established brands?',
      description: `We collaborate with both. Whether you're a startup building a digital platform or an established brand looking to grow, we tailor our approach to your stage of development, industry, and objectives. Our strategies are adaptable, scalable, and designed to grow with your company.`,
      bgColor: '#E1F2E2',
      rating: 5,
    },
    {
      image: blog_2,
      title: 'What is the average time frame for a project?',
      description:
        'Project timelines differ depending on the scope and complexity of the task. Smaller projects may take a few weeks to complete, whereas larger, multi-service campaigns may require months. We will provide you with a clear timeline once we have determined your requirements.',
      bgColor: '#D7EBFF',
      rating: 5,
    },
    {
      image: blog_3,
      title: 'Will I be involved during the process?',
      description:
        'Absolutely. We believe collaboration leads to better results. You’ll have a dedicated project manager who keeps you informed, gathers feedback, and ensures your vision is reflected throughout the project. You’re involved at key stages, without being overwhelmed.',
      bgColor: '#E1F2E2',
      rating: 5,
    },
  ],
};
