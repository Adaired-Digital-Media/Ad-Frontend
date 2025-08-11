import { routes } from '@/config/routes';
import { CouponType } from '../@core/config/enums';

export type BackendErrorResponse = {
  message: string;
  errors?: Array<{
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
  }>;
};

export type HeaderItems = (typeof routes.websiteNav)[number];

export type UpdateCartItem = {
  cartItemId: string;
  wordCount?: number;
  quantity?: number;
  additionalInfo?: string;
  totalPrice?: number;
};

export type Product = {
  _id: string;
  featuredImage: string;
  name: string;
  description: string;
  category: ProductCategory;
  subCategory: any;
  minimumQuantity?: number;
  minimumWords?: number;
  slug: string;
  pricePerUnit: number;
  pricingType: string;
  stock: number;
  images: string[];
  tags?: string[];
  priority?: number;
  keywords?: string[];
  formId?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalLink?: string;
  status: string;
  isFreeProduct: boolean;
  createBy?: string;
  updateBy?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface ProductCategory {
  _id?: string;
  name?: string;
  description?: string;
  parentCategory?: string | null;
  children?: string[];
  products?: string[];
  slug?: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalLink?: string;
  status?: 'Active' | 'Inactive';
  createdBy?: string;
  updatedBy?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface OrderType {
  _id?: string;
  userId?: string;
  orderNumber?: string;
  products?: Product[];
  totalQuantity?: number;
  totalPrice?: number;
  discountedPrice?: number;
  couponId?: string;
  couponDiscount?: number;
  paymentId?: string;
  invoiceId?: string;
  zohoInvoiceId?: string;
  paymentUrl?: string;
  status: 'Pending' | 'Processing' | 'Confirmed' | 'Completed' | 'Cancelled';
  paymentStatus: 'Unpaid' | 'Paid' | 'Refunded' | 'Failed';
  paymentMethod: 'Razorpay' | 'Stripe';
  paymentDate?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
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

export interface ProductFormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'checkbox' | 'select' | 'radio';
  required: boolean;
}

export interface ProductFormData {
  [key: string]: string | number;
}

// ************ cart.types.ts **********

export type CartItem = {
  _id: string;
  product: Product;
  wordCount?: number;
  quantity: number;
  additionalInfo?: string;
  totalPrice?: number;
};
