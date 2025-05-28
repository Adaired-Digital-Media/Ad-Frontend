import { CouponType } from "../config/enums";

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

export interface CartItem {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image: string;
  color?: ProductColor | null;
  price: number;
  salePrice?: number;
  quantity: number;
  size: number;
  stock?: number;
  discount?: number;
}

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

export type LayoverAirPortOptionType = {
  id: number;
  name: string;
  isGroupTitle?: boolean;
  checked?: boolean;
  disabled?: boolean;
};

export type TanTableProductsDataType = {
  
  productId: string;
  productImage?: string;
  productName: string;
  category?: string;
  quantity: number;
  pricePerUnit: string;
  totalPrice: string;
};

// ***************************************************************

export interface UserTypes {
  _id?: string;
  image?: string | null;
  name: string;
  userName?: string;
  email: string;
  password?: string | null;
  contact?: string | null;
  isAdmin?: boolean;
  role: string | RoleTypes;
  googleId?: string;
  orderHistory?: OrderHistoryItem[];
  cart?: string;
  wishlist?: WishlistItem[];
  status?: string;
  isVerifiedUser?: boolean;
  refreshToken?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderHistoryItem {
  orderId: string;
  date?: string | Date;
}

export interface WishlistItem {
  productId: string;
  dateAdded?: string | Date;
}

export interface RoleTypes {
  _id?: string;
  name: string;
  description: string;
  status: boolean;
  permissions: PermissionTypes[];
  users: UserTypes[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface PermissionTypes {
  module: string;
  permissions: number[];
}

export interface PermissionModule {
  _id?: string;
  name: string;
  value: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
export const PERMISSIONS = {
  Create: 0,
  Read: 1,
  Update: 2,
  Delete: 3,
};

export const roleActions = [
  {
    id: 1,
    name: "Add User",
  },
  {
    id: 2,
    name: "Rename",
  },
  {
    id: 3,
    name: "Remove Role",
  },
];

export type ProductType = {
  _id?: string;
  featuredImage: string;
  name: string;
  description: string;
  category: ProductCategoryType;
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

export interface ProductCategoryType {
  _id?: string;
  name: string;
  description?: string;
  parentCategory?: string | null;
  children?: string[];
  products?: string[];
  slug?: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalLink?: string;
  status?: "Active" | "Inactive";
  createdBy?: string;
  updatedBy?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface OrderType {
  _id?: string;
  userId?: UserTypes;
  orderNumber?: string;
  products: ProductType[];
  totalQuantity: number;
  totalPrice: number;
  couponDiscount: number;
  finalPrice: number;
  couponId?: string | null;
  paymentId: string;
  invoiceId: string;
  zohoInvoiceId: string;
  paymentUrl: string;
  status: "Pending" | "Processing" | "Confirmed" | "Cancelled" | "Completed";
  paymentStatus: "Unpaid" | "Paid" | "Refunded" | "Failed";
  paymentMethod: "Razorpay" | "Stripe";
  paymentDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface InvoiceTypes {
  _id: string;
  invoiceNumber: string;
  orderId: OrderType;
  userId?: UserTypes;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: "Unpaid" | "Paid" | "Overdue" | "Cancelled";
  dueDate: Date;
  issuedDate: Date;
  paymentMethod: "Razorpay" | "Stripe" | "Manual";
  paymentId: string | null;
  zohoInvoiceId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceStats {
  newInvoices: {
    count: number;
    percentageChange: number;
    trend: "increased" | "decreased" | "unchanged";
  };
  totalAmount: {
    total: number;
    percentageChange: number;
    trend: "increased" | "decreased" | "unchanged";
  };
  finalAmount: {
    total: number;
    percentageChange: number;
    trend: "increased" | "decreased" | "unchanged";
  };
  allInvoices: number;
  paidInvoices: number;
  overdueInvoices: number;
  dailyInvoices: number;
  chartData: {
    newInvoices: { day: string; invoices: number; date: string }[];
    totalAmount: { day: string; total: number; date: string }[];
    finalAmount: { day: string; final: number; date: string }[];
  };
}