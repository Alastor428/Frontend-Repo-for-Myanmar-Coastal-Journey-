import { buildApiQuery, requestJsonAuth } from "./http";

export type TourGuideBeach = { _id?: string; beachName?: string } | null;

export type TourGuideDto = {
  _id: string;
  name: string;
  phone?: string;
  experienceYears?: number;
  gender?: string;
  languages?: string[];
  pricePerDay: number;
  currency?: string;
  availability?: string;
  /** Present when API received startDate+endDate: Busy if booked in range or profile Busy */
  rangeStatus?: "Available" | "Busy";
  beach?: TourGuideBeach;
};

export type TourGuideListResponse = {
  success: boolean;
  data: TourGuideDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TourGuideBookingDto = {
  _id: string;
  user?: unknown;
  tourGuide?: TourGuideDto | string;
  guestName?: string;
  status: string;
  confirmedAt?: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  pricePerDay: number;
  currency: string;
  totalPrice: number;
  createdAt?: string;
};

export type TourGuideBookingListResponse = {
  success: boolean;
  data: TourGuideBookingDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TourGuideBookingSingleResponse = {
  success: boolean;
  data: TourGuideBookingDto;
};

export function listTourGuides(
  accessToken: string,
  opts?: {
    page?: number;
    limit?: number;
    availableOnly?: boolean;
    /** Sent as query param; backend matches Beach.beachName (case-insensitive) */
    beachName?: string;
    /** ISO strings; both required by backend when filtering free/busy dates */
    startDate?: string;
    endDate?: string;
  }
) {
  const params: Record<string, string | number | boolean | undefined> = {
    page: opts?.page ?? 1,
    limit: opts?.limit ?? 50,
    availableOnly: opts?.availableOnly ?? true,
    sortOrder: "asc",
  };
  const bn = opts?.beachName?.trim();
  if (bn) params.beachName = bn;
  if (opts?.startDate && opts?.endDate) {
    params.startDate = opts.startDate;
    params.endDate = opts.endDate;
  }
  const q = buildApiQuery(params);
  return requestJsonAuth<TourGuideListResponse>(
    "GET",
    `/api/v1/tour-guides${q}`,
    accessToken
  );
}

export function listMyTourGuideBookings(
  accessToken: string,
  opts?: { page?: number; limit?: number }
) {
  const q = buildApiQuery({
    page: opts?.page ?? 1,
    limit: opts?.limit ?? 20,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  return requestJsonAuth<TourGuideBookingListResponse>(
    "GET",
    `/api/v1/tour-guide-bookings${q}`,
    accessToken
  );
}

export function createTourGuideBooking(
  accessToken: string,
  body: {
    tourGuide: string;
    guestName?: string;
    startDate: string;
    endDate: string;
    currency?: string;
  }
) {
  return requestJsonAuth<TourGuideBookingSingleResponse>(
    "POST",
    "/api/v1/tour-guide-bookings",
    accessToken,
    body as Record<string, unknown>
  );
}

export function confirmTourGuideBooking(accessToken: string, bookingId: string) {
  return requestJsonAuth<TourGuideBookingSingleResponse>(
    "PUT",
    `/api/v1/tour-guide-bookings/${encodeURIComponent(bookingId)}/confirm`,
    accessToken,
    {}
  );
}
