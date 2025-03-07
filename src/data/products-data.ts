export type ProductType = {
  _id: string;
  featuredImage: string;
  name: string;
  description: string;
  category: Category;
  subCategory: string[];
  minimumQuantity: number;
  minimumWords: number | null;
  slug: string;
  pricePerUnit: number;
  pricingType: "perQuantity" | "perWord";
  stock: number;
  images: string[];
  tags: string[];
  priority: number;
  keywords: string[];
  formId: string;
  metaTitle: string;
  metaDescription: string;
  canonicalLink: string;
  status: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

interface Category {
  _id: string;
  name: string;
  description: string;
  parentCategory: string | null;
  children: string[];
  products: string[];
  slug: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  canonicalLink: string;
  status: "Active" | "Inactive";
  createdBy: string;
  updatedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
