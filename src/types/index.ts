export type UserRole = 'guest' | 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
}

export interface PropertyImage {
  url: string;
  publicId?: string;
  alt: string;
}

export interface Property {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  type: 'villa' | 'cottage' | 'suite' | 'farmhouse';
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: PropertyImage[];
  featured: boolean;
  isAvailable: boolean;
  size: number;
  location: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentMethod = 'card' | 'upi' | 'bank_transfer' | 'pay_at_property';
export type EventType = 'stay' | 'wedding' | 'corporate' | 'birthday' | 'party' | 'other';

export interface Booking {
  _id: string;
  bookingId?: string;
  user: string;
  property: Property | string;
  checkIn: string;
  checkOut: string;
  guests: number;
  adults?: number;
  children?: number;
  totalPrice: number;
  status: BookingStatus;
  specialRequests?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress?: string;
  eventType?: EventType;
  eventName?: string;
  cateringRequired?: boolean;
  decorationRequired?: boolean;
  dietaryRequirements?: string;
  paymentMethod?: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

export interface Review {
  _id: string;
  user: { name: string; avatar?: string };
  property: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  emailSent?: boolean;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface BookingFormData {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  adults?: number;
  children?: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress?: string;
  eventType?: EventType;
  eventName?: string;
  specialRequests?: string;
  cateringRequired?: boolean;
  decorationRequired?: boolean;
  dietaryRequirements?: string;
  paymentMethod?: PaymentMethod;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  preferredDate: string;
  guestCount: number;
  message: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  eventType: string;
  preferredDate: string;
  guestCount: number;
  status: string;
  createdAt: string;
}

export type ContactStatus = 'New' | 'Contacted' | 'Booked' | 'Closed';

export interface ContactEnquiryFull extends ContactEnquiry {
  _id: string;
  phone: string;
  message: string;
  updatedAt: string;
}

export interface PaginatedContactsResponse {
  success: boolean;
  data: ContactEnquiryFull[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
