import { routes } from '@/config/routes';
import { CouponType } from '@core/config/enums';

export type HeaderItems = (typeof routes.websiteNav)[number];

export type CartItem = {
  _id: string;
  featuredImage: string;
  name: string;
  description: string;
  userId: string;
  formId: string;
  category: string;
  subCategory: string;
  minimumQuantity?: number;
  slug: string;
  price: number;
  quantity: number;
  pricingType: string;
  stock: number;
  images: string[];
  tags?: string[];
  priority?: number;
  keywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalLink?: string;
  status: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface ProductCategory {
  _id: string;
  userId: string;
  name: string;
  description: string;
  parentCategory: string | null;
  children: ProductCategory[] | string[];
  products: CartItem[] | string[];
  slug: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  canonicalLink: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Coupon {
  id: string;
  name: string;
  type: CouponType;
  slug: string;
  amount?: string;
  code?: string;
}

export interface Address {
  customerName?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  street?: string;
}

export interface GoogleMapLocation {
  lat?: number;
  lng?: number;
  street_number?: string;
  route?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  formattedAddress?: string;
}

export type ProductColor = {
  name?: string;
  code?: string;
};

export type Product = {
  id: number;
  slug?: string;
  title: string;
  description?: string;
  price: number;
  sale_price?: number;
  thumbnail: string;
  colors?: ProductColor[];
  sizes?: number[];
};

export type PosProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  size: number;
  discount?: number;
};
export interface CalendarEvent {
  id?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  title: string;
  description?: string;
  location?: string;
}

export interface FlightingCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  meta?: {
    model: string;
    hours: string;
    stop: string;
  };
  class: string;
  bucket: {
    luggage?: string;
    bag?: string;
  };
  airlines?: string;
  routes?: {
    arrivalDate: Date | string;
    arrivalTime: Date | string;
    departureDate: Date | string;
    departureTime: Date | string;
    departureCityCode: string;
    departureCity: string;
    departureTerminal: string;
    arrivalCityCode: string;
    arrivalCity: string;
    arrivalTerminal: string;
    layover: {
      layoverCityCode: string;
      layoverCity: string;
      layoverTerminal: string;
      layoverTime: string;
    }[];
  };
  cheapest?: boolean;
  best?: boolean;
  quickest?: boolean;
}