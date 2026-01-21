import type { Metadata } from 'next';
import Home from './(mainWebsite)/home/Home';

export const metadata: Metadata = {
  title: 'Unveiling Adaired: Our History, Team, and Vision | Learn About Us',
  description:
    "Get to know Adaired better! Know our history, the people who make it happen, and the goals we aspire to. Experience Adaired's dedication to innovation.",
  alternates: {
    canonical: 'https://www.adaired.com',
  },
};

export default function HomePage() {
  return <Home />;
}
