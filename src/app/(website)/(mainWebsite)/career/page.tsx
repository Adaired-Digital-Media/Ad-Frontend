'use client';
import { useEffect, useState } from 'react';
import PageBanner from '@/app/(website)/components/PageBanner';
import MaxWidthWrapper from '@/app/(website)/components/MaxWidthWrapper';
import { cn } from '@core/utils/class-names';
import { Skeleton } from '@core/ui/skeleton';
import Head from 'next/head';

type Props = {};

const Career = (props: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.1/embed_jobs.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.rec_embed_js) {
        // @ts-ignore
        window.rec_embed_js.load({
          widget_id: 'rec_job_listing_div',
          page_name: 'Careers',
          source: 'CareerSite',
          site: 'https://career.adaired.com',
          brand_color: '#1B5A96',
          empty_job_msg: 'No current Openings',
        });

        const target = document.getElementById('rec_job_listing_div');
        if (target) {
          const observer = new MutationObserver(() => {
            const hasLoader = target.querySelector('.cw-easyapply-loading');
            if (!hasLoader) {
              // Modify the DOM to wrap rec-job-info <ul> with the link
              const jobInfoUls = target.querySelectorAll('.rec-job-info');
              jobInfoUls.forEach((ul) => {
                const linkElement = ul.querySelector('.rec-job-title a');
                if (linkElement) {
                  const href = linkElement.getAttribute('href');
                  const targetAttr = linkElement.getAttribute('target');
                  const relAttr = linkElement.getAttribute('rel');

                  // Create a new <a> element to wrap the <ul>
                  const newLink = document.createElement('a');
                  newLink.setAttribute('href', href || '#');
                  if (targetAttr) newLink.setAttribute('target', targetAttr);
                  if (relAttr) newLink.setAttribute('rel', relAttr);

                  // Move the <ul> inside the new <a> element
                  ul.parentNode?.insertBefore(newLink, ul);
                  newLink.appendChild(ul);

                  // Remove the original link from rec-job-title but keep its text
                  const linkText = linkElement.textContent;
                  const titleLi = linkElement.parentNode;
                  if (titleLi && linkText) {
                    titleLi.textContent = linkText;
                  }
                }
              });

              setLoading(false);
              observer.disconnect();
            }
          });
          observer.observe(target, { childList: true, subtree: true });
        }
      }
    };
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Explore Exciting Career Opportunities at Adaired</title>
        <meta name="keywords" content="Career Opportunities" />
        <meta
          name="description"
          content="Explore job openings at Adaired and kickstart your career journey! Discover opportunities that match your skills and interests. Join our talented team!"
        />
        <meta property="og:title" content="Explore Exciting Career Opportunities at Adaired" />
        <meta
          property="og:description"
          content="Explore job openings at Adaired and kickstart your career journey! Discover opportunities that match your skills and interests. Join our talented team!"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/adaired/image/upload/v1754987472/r3oupwvtjkvltbdenwlb.jpg"
        />
        <meta property="og:type" content="website" />
      </Head>
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

        <div
          className={cn(
            `embed_jobs_head embed_jobs_with_style_1`,
            loading ? 'hidden' : ''
          )}
        >
          <div className="embed_jobs_head2">
            <div className="embed_jobs_head3">
              <div id="rec_job_listing_div"></div>
            </div>
          </div>
        </div>

        {loading && (
          <>
            <div className="flex flex-col items-end">
              <Skeleton className="mb-3 h-10 w-24 rounded" />
              <Skeleton className="mb-3 h-0.5 w-full rounded" />
            </div>
            <div className="my-4 flex gap-2">
              <Skeleton className="h-5 w-24 rounded" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <div className="grid gap-5 md:grid-cols-2 opt-md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded" />
              ))}
            </div>
          </>
        )}
      </MaxWidthWrapper>
    </>
  );
};

export default Career;