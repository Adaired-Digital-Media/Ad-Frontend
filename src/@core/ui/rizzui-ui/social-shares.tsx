import {
  FaLinkedinIn,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa6';
const socialData = [
  {
    title: 'Facebook',
    icon: <FaFacebook className="h-auto w-4" />,
    link: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  },
  {
    title: 'Twitter',
    icon: <FaXTwitter className="h-auto w-4" />,
    link: process.env.NEXT_PUBLIC_TWITTER_URL || '',
  },
  {
    title: 'Instagram',
    icon: <FaInstagram className="h-auto w-4" />,
    link: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  },
  {
    title: 'LinkedIn',
    icon: <FaLinkedinIn className="h-auto w-4" />,
    link: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
  },
];

export default function SocialItems() {
  return (
    <div className="mt-8 flex items-center justify-center gap-6 py-6 md:mt-10 lg:mt-0 xl:py-8">
      {socialData.map((item) => (
        <a
          key={item.title}
          href={item.link}
          rel="norefferer"
          target="_blank"
          className="social-btn-shadow inline-block rounded-full bg-white p-3 text-gray-500 transition-all duration-300 hover:text-gray-1000 dark:bg-gray-100 dark:text-gray-700 dark:hover:text-gray-1000"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
