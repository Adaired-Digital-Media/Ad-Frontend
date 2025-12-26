import { MetadataRoute } from 'next';
import { DateComponent } from '@core/utils/dateComponent';
import { BaseURL } from '@/baseUrl';

// =====================
// Types
// =====================
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
  seo?: {
    lastModified?: string;
    changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority?: number;
  };
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
}

// =====================
// Manual priority mapping
// =====================
const manualPriorities: Record<string, number> = {
  'digital-marketing-company-usa': 1,
  'web-development-company-usa': 1,
  'seo-company-usa': 1,
  'digital-marketing-company-india': 1,
};

// =====================
// Sitemap
// =====================
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUri = process.env.NEXT_PUBLIC_SITE_URI;
  const backendApiUri = BaseURL;

  if (!siteUri || !backendApiUri) {
    console.error('❌ Missing environment variables for sitemap generation');
    return [];
  }

  try {
    // ---------------------
    // Fetch APIs in parallel
    // ---------------------
    const [servicesRes, caseStudiesRes, blogsRes] = await Promise.all([
      fetch(`${backendApiUri}/service/getServices`, { cache: 'no-store' }),
      fetch(`${backendApiUri}/case-study/read`, { cache: 'no-store' }),
      fetch(`${backendApiUri}/blog/read?status=publish`, { cache: 'no-store' }),
    ]);

    // ---------------------
    // Parse safely
    // ---------------------
    const servicesJson: ApiResponse<Service> = servicesRes.ok
      ? await servicesRes.json()
      : { success: false, message: '', data: [] };

    const caseStudiesJson: ApiResponse<CaseStudy> = caseStudiesRes.ok
      ? await caseStudiesRes.json()
      : { success: false, message: '', data: [] };

    const blogsJson: ApiResponse<Blog> = blogsRes.ok
      ? await blogsRes.json()
      : { success: false, message: '', data: [] };

    const services = Array.isArray(servicesJson.data) ? servicesJson.data : [];

    const caseStudies = Array.isArray(caseStudiesJson.data)
      ? caseStudiesJson.data
      : [];

    const blogs = Array.isArray(blogsJson.data) ? blogsJson.data : [];

    // ---------------------
    // Dynamic paths
    // ---------------------
    const servicePaths: MetadataRoute.Sitemap = services
      .filter((service) => service.status === 'publish')
      .map((service) => ({
        url: `${siteUri}/services/${service.slug}`,
        lastModified:
          DateComponent(service.updatedAt) || new Date(service.updatedAt),
        changeFrequency: 'weekly',
        priority: manualPriorities[service.slug] ?? 0.9,
      }));

    const caseStudyPaths: MetadataRoute.Sitemap = caseStudies.map(
      (caseStudy) => ({
        url: `${siteUri}/case-studies/${caseStudy.slug}`,
        lastModified:
          DateComponent(caseStudy.updatedAt) || new Date(caseStudy.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    );

    const blogPaths: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${siteUri}/blog/${blog.slug}`,
      lastModified: blog?.seo?.lastModified
        ? DateComponent(blog.seo.lastModified)
        : DateComponent(blog.updatedAt) || new Date(blog.updatedAt),
      changeFrequency: blog?.seo?.changeFrequency ?? 'weekly',
      priority: blog?.seo?.priority ?? 0.5,
    }));

    // ---------------------
    // Static paths
    // ---------------------
    const staticPaths: MetadataRoute.Sitemap = [
      {
        url: `${siteUri}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${siteUri}/about`,
        lastModified: new Date('2024-06-24'),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${siteUri}/career`,
        lastModified: new Date('2024-06-24'),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${siteUri}/case-studies`,
        lastModified: new Date('2024-06-24'),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        url: `${siteUri}/blog`,
        lastModified: new Date('2024-06-24'),
        changeFrequency: 'weekly',
        priority: 0.65,
      },
      {
        url: `${siteUri}/contact`,
        lastModified: new Date('2024-06-24'),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ];

    // ---------------------
    // Final sitemap
    // ---------------------
    return [...staticPaths, ...servicePaths, ...caseStudyPaths, ...blogPaths];
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return [];
  }
}
