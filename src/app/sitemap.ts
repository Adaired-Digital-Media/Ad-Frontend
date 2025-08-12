import { MetadataRoute } from 'next';
import { DateComponent } from '@core/utils/dateComponent';

// Define interfaces for type safety
interface Service {
  slug: string;
  updatedAt: string;
  status: string;
}

interface CaseStudy {
  slug: string;
  updatedAt: string;
}

interface Blog {
  _id: string;
  slug: string;
  updatedAt: string;
  status: string;
  seo: any;
}

interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog[];
}
// Manual priority mapping for services
const manualPriorities: Record<string, number> = {
  'digital-marketing-company-usa': 1,
  'web-development-company-usa': 1,
  'seo-company-usa': 1,
  'digital-marketing-company-india': 1,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Validate environment variables
  const siteUri = process.env.NEXT_PUBLIC_SITE_URI;
  const backendApiUri = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const oldApiUri = process.env.NEXT_PUBLIC_OLD_API_URI;

  if (!siteUri || !backendApiUri || !oldApiUri) {
    console.error('Missing environment variables for sitemap generation');
    return [];
  }

  try {
    // Fetch all data in parallel
    const [servicesResponse, caseStudiesResponse, blogsResponse] =
      await Promise.all([
        fetch(`${backendApiUri}/service/getServices`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch(`${oldApiUri}/api/v1/case-studies/all`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch(`${backendApiUri}/blog/read?status=publish`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }),
      ]);

    // Check responses
    if (!servicesResponse.ok)
      throw new Error(`Services fetch failed: ${servicesResponse.statusText}`);
    if (!caseStudiesResponse.ok)
      throw new Error(
        `Case studies fetch failed: ${caseStudiesResponse.statusText}`
      );
    if (!blogsResponse.ok)
      throw new Error(`Blogs fetch failed: ${blogsResponse.statusText}`);

    // Parse JSON
    const services: Service[] = await servicesResponse.json();
    const caseStudies: { result: CaseStudy[] } =
      await caseStudiesResponse.json();
    const blogs: BlogResponse = await blogsResponse.json();

    // Service paths
    const servicePaths: MetadataRoute.Sitemap = services
      .filter((service) => service.status === 'publish')
      .map((service) => ({
        url: `${siteUri}/services/${service.slug}`,
        lastModified:
          DateComponent(service.updatedAt) || new Date(service.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: manualPriorities[service.slug] ?? 0.9,
      }));

    // Case study paths
    const caseStudiesPaths: MetadataRoute.Sitemap = caseStudies.result.map(
      (caseStudy) => ({
        url: `${siteUri}/case-studies/${caseStudy.slug}`,
        lastModified:
          DateComponent(caseStudy.updatedAt) || new Date(caseStudy.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })
    );

    // Blog paths
    const blogPaths: MetadataRoute.Sitemap = blogs.data.map((blog) => ({
      url: `${siteUri}/blog/${blog.slug}`,
      lastModified: blog?.seo?.lastModified
        ? DateComponent(blog?.seo?.lastModified)
        : DateComponent(blog.updatedAt) || new Date(blog.updatedAt),
      changeFrequency: blog?.seo?.changeFrequency || ('weekly' as const),
      priority: blog?.seo?.priority || 0.5,
    }));

    // Static routes
    const staticPaths: MetadataRoute.Sitemap = [
      {
        url: `${siteUri}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: `${siteUri}/about`,
        lastModified: new Date('2024-06-24'),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: `${siteUri}/career`,
        lastModified: new Date('2024-06-24'),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${siteUri}/case-studies`,
        lastModified: new Date('2024-06-24'),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      },
      {
        url: `${siteUri}/blog`,
        lastModified: new Date('2024-06-24'),
        changeFrequency: 'weekly' as const,
        priority: 0.65,
      },
      {
        url: `${siteUri}/contact`,
        lastModified: new Date('2024-06-24'),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      },
    ];

    return [...staticPaths, ...servicePaths, ...caseStudiesPaths, ...blogPaths];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
}
