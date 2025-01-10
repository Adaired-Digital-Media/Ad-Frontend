import { DateComponent } from "@core/utils/dateComponent";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Manual priority mapping for specific services
  const manualPriorities: Record<string, number> = {
    "digital-marketing-company-usa": 1,
    "web-development-company-usa": 1,
    "seo-company-usa": 1,
    "digital-marketing-company-india": 1,
  };

  // Services URLs
  const Services = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/service/getServices`
  );

  const data = await Services.json();

  // Filter services by status === 'published' and map priorities
  const servicePaths: MetadataRoute.Sitemap = data
    .filter(({ status }: { status: string }) => status === "publish")
    .map(({ slug, updatedAt }: { slug: string; updatedAt: string }) => {
      // Use manual priority if available, otherwise fallback to default
      const priority = manualPriorities[slug] ?? 0.9;

      return {
        url: `${process.env.NEXT_PUBLIC_SITE_URI}/services/${slug}`,
        lastModified: DateComponent(updatedAt),
        changeFrequency: `weekly`,
        priority,
      };
    });

  // Case Studies
  const CaseStudies = await fetch(
    `${process.env.NEXT_PUBLIC_OLD_API_URI}/api/v1/case-studies/all`
  );
  const caseStudies = await CaseStudies.json();

  const caseStudiesPaths: MetadataRoute.Sitemap = caseStudies.result.map(
    ({ slug, updatedAt }: { slug: string; updatedAt: string }) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URI}/case-studies/${slug}`,
      lastModified: DateComponent(updatedAt),
      changeFrequency: `monthly`,
      priority: 0.5,
    })
  );

  // Blog URLs
  const Blogs = await fetch(
    `${process.env.NEXT_PUBLIC_OLD_API_URI}/api/v1/blog/findBlog`
  );
  const { result } = await Blogs.json();

  const blogPaths: MetadataRoute.Sitemap = result.map(
    ({ slug, updatedAt }: { slug: string; updatedAt: string }) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URI}/blog/${slug}`,
      lastModified: DateComponent(updatedAt),
      changeFrequency: `weekly`,
      priority: 0.5,
    })
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URI}/`,
      lastModified: `2024-06-24`,
      changeFrequency: `weekly`,
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URI}/about`,
      lastModified: `2024-06-24`,
      changeFrequency: `weekly`,
      priority: 1,
    },
    ...servicePaths,
    {
      url: `https://career.adaired.com/jobs/Careers`,
      lastModified: `2024-06-24`,
      changeFrequency: `monthly`,
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URI}/case-studies`,
      lastModified: `2024-06-24`,
      changeFrequency: `weekly`,
      priority: 0.5,
    },
    ...caseStudiesPaths,
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URI}/blog`,
      lastModified: `2024-06-24`,
      changeFrequency: `weekly`,
      priority: 0.65,
    },
    ...blogPaths,
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URI}/contact`,
      lastModified: `2024-06-24`,
      changeFrequency: `weekly`,
      priority: 0.5,
    },
  ];
}
