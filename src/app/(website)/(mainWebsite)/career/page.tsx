import PageBanner from '@/app/(website)/components/PageBanner';
import MaxWidthWrapper from '@/app/(website)/components/MaxWidthWrapper';
import JobList from '@/app/(website)/components/_zoho-job-listing';

// Define static metadata for the Career page
export const metadata = {
  title: 'Explore Exciting Career Opportunities at Adaired',
  description:
    'Explore job openings at Adaired and kickstart your career journey! Discover opportunities that match your skills and interests. Join our talented team!',
  keywords: 'Career Opportunities',
  openGraph: {
    title: 'Explore Exciting Career Opportunities at Adaired',
    description:
      'Explore job openings at Adaired and kickstart your career journey! Discover opportunities that match your skills and interests. Join our talented team!',
    images: [
      {
        url: 'https://res.cloudinary.com/adaired/image/upload/v1754987472/r3oupwvtjkvltbdenwlb.jpg',
        width: 1200,
        height: 630,
        alt: 'Adaired Career Opportunities',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Exciting Career Opportunities at Adaired',
    description:
      'Explore job openings at Adaired and kickstart your career journey! Discover opportunities that match your skills and interests. Join our talented team!',
    images: [
      'https://res.cloudinary.com/adaired/image/upload/v1754987472/r3oupwvtjkvltbdenwlb.jpg',
    ],
  },
};

export default function CareerPage() {
  return (
    <>
      <PageBanner title="Career" />
      <MaxWidthWrapper className="py-10">
        <div className="flex flex-col items-start justify-center space-y-3 pb-5 md:items-center">
          <h2 className="font-dm text-2xl font-medium md:text-3xl">
            Start doing work that matters
          </h2>
          <p className="font-nunito text-base font-medium md:text-lg">
            Our philosophy is simple — hire a team of diverse, passionate people
            and foster a culture that empowers you to do your best work.
          </p>
        </div>
        <JobList />
      </MaxWidthWrapper>
    </>
  );
}
