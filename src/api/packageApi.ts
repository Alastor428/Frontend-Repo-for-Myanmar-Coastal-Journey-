import { buildApiQuery, requestJsonAuth } from "./http";

export type TravelPackageDto = {
  _id: string;
  packageName: string;
  fromCity?: { cityName: string } | string;
  toBeach?: { beachName: string } | string;
  departOnDate?: string;
  departureTime?: string;
  pricePerPerson: number;
  busTicket?: {
    ticket?: { ticketName: string } | string;
    pricePerPerson: number;
  };
  hotel?: {
    hotel?: { hotelName: string; hotelRating?: number } | string;
    nights: number;
    feePerNightPerPerson: number;
  };
};

export type TravelPackageSearchResponse = {
  success: boolean;
  data: TravelPackageDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PackageBookingDto = {
  _id: string;
  numberOfPeople: number;
  totalPrice: number;
  currency?: string;
  status?: string;
  paymentMethod?: "VISA" | "MPU";
  createdAt?: string;
  travelPackage?: any;
};

export type PackageBookingListResponse = {
  success: boolean;
  data: PackageBookingDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function searchTravelPackages(
  accessToken: string,
  query: { from: string; to: string; departOnDate: string | Date; page?: number; limit?: number }
) {
  const q = buildApiQuery({
    from: query.from,
    to: query.to,
    departOnDate: query.departOnDate instanceof Date ? query.departOnDate.toISOString() : query.departOnDate,
    page: query.page ?? 1,
    limit: query.limit ?? 20,
    sortBy: "pricePerPerson",
    sortOrder: "asc",
  });

  return requestJsonAuth<TravelPackageSearchResponse>(
    "GET",
    `/api/v1/travel-packages${q}`,
    accessToken
  );
}

export function createTravelPackageBooking(
  accessToken: string,
  body: { travelPackage: string; numberOfPeople: number }
) {
  return requestJsonAuth<{ success: boolean; data: PackageBookingDto }>(
    "POST",
    `/api/v1/travel-package-bookings`,
    accessToken,
    body as Record<string, unknown>
  );
}

export function confirmTravelPayment(
  accessToken: string,
  bookingId: string,
  body: {
    paymentMethod: "VISA" | "MPU";
    cardNumber: string;
    cardPassword: string;
  }
) {
  return requestJsonAuth<{ success: boolean; data: PackageBookingDto }>(
    "POST",
    `/api/v1/travel-package-bookings/${encodeURIComponent(
      bookingId
    )}/confirm-payment`,
    accessToken,
    body as Record<string, unknown>
  );
}

export function listMyTravelPackageBookings(
  accessToken: string,
  opts?: { page?: number; limit?: number }
) {
  const q = buildApiQuery({
    page: opts?.page ?? 1,
    limit: opts?.limit ?? 30,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return requestJsonAuth<PackageBookingListResponse>(
    "GET",
    `/api/v1/travel-package-bookings${q}`,
    accessToken
  );
}

export function getTravelPackageById(accessToken: string, packageId: string) {
  return requestJsonAuth<{ success: boolean; data: TravelPackageDto }>(
    "GET",
    `/api/v1/travel-packages/${encodeURIComponent(packageId)}`,
    accessToken
  );
}

export function cityNameFromTravelPackage(p: TravelPackageDto): string {
  const v = p.fromCity;
  if (v && typeof v === "object" && "cityName" in v) return String((v as any).cityName ?? "—");
  return "—";
}

export function beachNameFromTravelPackage(p: TravelPackageDto): string {
  const v = p.toBeach;
  if (v && typeof v === "object" && "beachName" in v) return String((v as any).beachName ?? "—");
  return "—";
}

