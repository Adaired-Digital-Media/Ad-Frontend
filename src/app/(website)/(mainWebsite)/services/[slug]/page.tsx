import React from "react";
import type { Metadata } from "next";
import NavigationMenu from "@/components/NavigationMenu";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PageBanner from "@/components/PageBanner";

// Sections
import GetInTouchForm from "@/forms/GetInTouchForm";
import CTA from "@/components/PageDynamicSections/CTA";
import FaqSection from "@/components/PageDynamicSections/FaqSection";
import GridSection from "@/components/PageDynamicSections/GridSection";
import ProcessSection from "@/components/PageDynamicSections/ProcessSection";
import StickyScroll from "@/components/PageDynamicSections/StickyScrollSection";
import ImageWithIconbox from "@/components/PageDynamicSections/ImageWithIconboxSection";
import KeyFeatureListLayout from "@/components/PageDynamicSections/KeyFeatureListLayout";
import KeyFeatureCrossLayout from "@/components/PageDynamicSections/KeyFeatureCrossLayout";
import TwoColumnFeatureSection from "@/components/PageDynamicSections/TwoColumnFeatureSection";
import ServiceKeyFeaturesLayout from "@/components/PageDynamicSections/ServiceKeyFeaturesLayout";
import ImageWithDetailedFeatureDescription from "@/components/PageDynamicSections/ImageWithDetailedFeatureDescription";

const fetchservice = async (slug: string) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/service/getServices/${slug}`
  );
  const data = await result.json();
  return data;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const c = await params;
  const data = await fetchservice(c.slug);

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}`),
    title: data?.metaTitle ? data.metaTitle : data?.serviceName,
    description: data?.metaDescription ? data.metaDescription : "",
    alternates: {
      canonical: `/services/${c.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/service/getServices`
  );
  const data = await res.json();
  const newData = data;
  return newData.map((service: any) => ({
    slug: service.slug.toString(),
  }));
}
interface ServiceProps {
  params: {
    slug: string;
  };
}

const ServicePage: React.FC<ServiceProps> = async ({ params }) => {
  const c = await params;
  const fetchedService = await fetchservice(c.slug);
  const { bodyData } = fetchedService;

  return (
    <>
      <PageBanner title={fetchedService.serviceName} />
      <div className="space-y-12 md:space-y-24 pb-20">
        {bodyData ? (
          bodyData.map((data: any) => {
            switch (data.componentName) {
              case "TwoColumnFeatureSection":
                return (
                  <MaxWidthWrapper key={data.componentName}>
                    <div className="flex justify-between gap-10 mt-12">
                      <div className="w-full xl:w-[70%]">
                        <TwoColumnFeatureSection
                          colorScheme={fetchedService.colorScheme}
                          data={data}
                        />
                      </div>
                      <aside className="hidden xl:block w-[30%] ">
                        <div className="space-y-8 sticky top-28">
                          {fetchedService?.childServices?.length !== 0 && (
                            <NavigationMenu
                              colorScheme={fetchedService.colorScheme}
                              serviceName={fetchedService.serviceName}
                              childServices={fetchedService?.childServices}
                            />
                          )}
                          <GetInTouchForm
                            colorScheme={fetchedService.colorScheme}
                          />
                        </div>
                      </aside>
                    </div>
                  </MaxWidthWrapper>
                );

              case "KeyFeatureCrossLayout":
                return (
                  <MaxWidthWrapper key={data.componentName}>
                    <KeyFeatureCrossLayout
                      colorScheme={fetchedService.colorScheme}
                      data={data}
                    />
                  </MaxWidthWrapper>
                );

              case "ImagewithDetailedFeatureDescription":
                return (
                  <MaxWidthWrapper key={data.componentName}>
                    <ImageWithDetailedFeatureDescription
                      colorScheme={fetchedService.colorScheme}
                      data={data.body}
                    />
                  </MaxWidthWrapper>
                );

              case "FAQ":
                return (
                  <MaxWidthWrapper key={data.componentName}>
                    <FaqSection faqs={data.body.faq ?? []} />
                  </MaxWidthWrapper>
                );

              case "CallToAction":
                return (
                  <MaxWidthWrapper key={data.componentName}>
                    <CTA
                      title={data.body.title}
                      colorScheme={fetchedService.colorScheme}
                    />
                  </MaxWidthWrapper>
                );

              case "KeyFeatureListLayout":
                return (
                  <MaxWidthWrapper key={data.componentName}>
                    <KeyFeatureListLayout
                      colorScheme={fetchedService.colorScheme}
                      data={data.body}
                    />
                  </MaxWidthWrapper>
                );

              case "ServiceKeyFeaturesLayout":
                return (
                  <div key={data.componentName}>
                    <ServiceKeyFeaturesLayout
                      colorScheme={fetchedService.colorScheme}
                      data={data.body}
                    />
                  </div>
                );

              case "StickyScrollLayout":
                return (
                  <div key={data.componentName}>
                    <StickyScroll
                      colorScheme={fetchedService.colorScheme}
                      data={data.body}
                    />
                  </div>
                );

              case "ImageWithIconBoxList":
                return (
                  <div key={data.componentName}>
                    <ImageWithIconbox
                      colorScheme={fetchedService.colorScheme}
                      data={data.body}
                    />
                  </div>
                );

              // case "OurProcessLayout":
              //   return (
              //     <MaxWidthWrapper key={data.componentName}>
              //       <ProcessSection
              //         colorScheme={fetchedService.colorScheme}
              //         data={data.body}
              //       />
              //     </MaxWidthWrapper>
              //   );

              default:
                return null;
            }
          })
        ) : (
          <div className="flex justify-center">
            <div className="text-center text-2xl">
              No content found for this service.
            </div>
          </div>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: fetchedService.bodyScript,
        }}
      />
    </>
  );
};

export default ServicePage;
