export const USER_ROLES = [
  "guest",
  "customer",
  "member",
  "ticket_agent",
  "customer_support",
  "operations_staff",
  "finance_staff",
  "content_editor",
  "system_admin"
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const STAFF_ROLES = [
  "ticket_agent",
  "customer_support",
  "operations_staff",
  "finance_staff",
  "content_editor",
  "system_admin"
] as const;

export type StaffRole = (typeof STAFF_ROLES)[number];

export const TRIP_TYPES = ["one_way", "round_trip", "multi_city"] as const;
export type TripType = (typeof TRIP_TYPES)[number];

export const PASSENGER_TYPES = ["adult", "child", "infant"] as const;
export type PassengerType = (typeof PASSENGER_TYPES)[number];

export const FARE_FAMILIES = [
  "pho_thong_tiet_kiem",
  "pho_thong_linh_hoat",
  "thuong_gia"
] as const;
export type FareFamily = (typeof FARE_FAMILIES)[number];

export const BOOKING_STATUSES = [
  "draft",
  "held",
  "awaiting_payment",
  "paid",
  "ticketed",
  "checked_in",
  "changed",
  "cancelled",
  "refunded"
] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const PAYMENT_STATUSES = [
  "pending",
  "processing",
  "paid",
  "failed",
  "expired",
  "refunded"
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const TICKET_STATUSES = [
  "reserved",
  "issued",
  "changed",
  "boarded",
  "cancelled"
] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const FLIGHT_STATUSES = [
  "scheduled",
  "on_time",
  "boarding",
  "delayed",
  "departed",
  "landed",
  "cancelled"
] as const;
export type FlightStatus = (typeof FLIGHT_STATUSES)[number];

export const SUPPORT_TICKET_STATUSES = [
  "new",
  "open",
  "awaiting_customer",
  "escalated",
  "resolved",
  "closed"
] as const;
export type SupportTicketStatus = (typeof SUPPORT_TICKET_STATUSES)[number];

export const CONTENT_TYPES = [
  "banner",
  "blog",
  "faq",
  "promotion",
  "airport_guide",
  "policy_page"
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const NOTIFICATION_TYPES = [
  "booking_created",
  "payment_received",
  "flight_changed",
  "check_in_opened",
  "refund_processed",
  "support_updated"
] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export type LocaleCode = "vi" | "en";

export interface LocalizedText {
  vi: string;
  en: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  description?: string;
}

export interface QuickService {
  title: string;
  subtitle: string;
  href: string;
}

export interface DestinationSpotlight {
  code: string;
  city: string;
  airport: string;
  priceFrom: number;
  highlights: string[];
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
}

export interface FlightResult {
  code: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  status: FlightStatus;
  fareFamily: FareFamily;
  price: number;
  seatsLeft: number;
}

export interface FareComparison {
  fareFamily: FareFamily;
  title: string;
  price: number;
  perks: string[];
}

export interface AncillaryService {
  code: string;
  name: string;
  description: string;
  price: number;
}

export interface RoleRule {
  role: UserRole;
  canAccess: string[];
  restrictedFrom: string[];
}

export interface SupportItem {
  title: string;
  description: string;
  channel: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
}

export interface BackofficeModule {
  key: string;
  title: string;
  summary: string;
  href: string;
  highlights: string[];
  roles: StaffRole[];
}

export interface AuditEntry {
  actor: string;
  action: string;
  target: string;
  time: string;
}
