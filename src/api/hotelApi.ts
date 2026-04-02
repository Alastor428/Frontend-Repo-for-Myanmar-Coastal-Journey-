import { buildApiQuery, requestJsonAuth, requestJsonPublic } from "./http";

export type BeachRef = { _id?: string; beachName?: string } | string;

export type HotelDto = {
  _id: string;
  hotelName: string;
  hotelRating: number;
  beach?: BeachRef;
  minRoomPrice?: number | null;
};

export type RoomDto = {
  _id: string;
  roomType: string;
  roomPricePerNight: number;
  roomCapacity: number;
  hotel?: unknown;
};

export type HotelListResponse = {
  success: boolean;
  data: HotelDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type HotelSingleResponse = {
  success: boolean;
  data: HotelDto;
};

export type RoomListResponse = {
  success: boolean;
  data: RoomDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type HotelBookingLineDto = {
  room?: RoomDto | string;
  checkInDate?: string;
  checkOutDate?: string;
  lengthOfStayNights?: number;
  numberOfRooms?: number;
  numberOfAdults?: number;
  lineTotalPrice?: number;
};

export type HotelBookingDto = {
  _id: string;
  hotel?: HotelDto | string;
  guestName?: string;
  status?: string;
  totalPrice: number;
  currency?: string;
  lineItems?: HotelBookingLineDto[];
  createdAt?: string;
  confirmedAt?: string;
};

export type HotelBookingListResponse = {
  success: boolean;
  data: HotelBookingDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function listHotelsByBeachName(
  beachName: string,
  opts?: { page?: number; limit?: number }
) {
  const q = buildApiQuery({
    beachName: beachName.trim(),
    page: opts?.page ?? 1,
    limit: opts?.limit ?? 50,
    sortBy: "hotelName",
    sortOrder: "asc",
  });
  return requestJsonPublic<HotelListResponse>(
    "GET",
    `/api/v1/hotels/filter/beach-name${q}`
  );
}

export function getHotelById(hotelId: string) {
  return requestJsonPublic<HotelSingleResponse>(
    "GET",
    `/api/v1/hotels/${encodeURIComponent(hotelId)}`
  );
}

export function listRoomsByHotel(
  hotelId: string,
  opts?: { page?: number; limit?: number }
) {
  const q = buildApiQuery({
    hotelId,
    page: opts?.page ?? 1,
    limit: opts?.limit ?? 20,
    sortBy: "roomPricePerNight",
    sortOrder: "asc",
  });
  return requestJsonPublic<RoomListResponse>(
    "GET",
    `/api/v1/rooms/filter/hotel${q}`
  );
}

export function createHotelBooking(
  accessToken: string,
  body: {
    hotel: string;
    guestName?: string;
    taxIncluded?: boolean;
    currency?: string;
    lineItems: Array<{
      room: string;
      checkInDate: string;
      checkOutDate: string;
      checkInTimeNote?: string;
      checkOutTimeNote?: string;
      numberOfRooms: number;
      numberOfAdults: number;
    }>;
  }
) {
  return requestJsonAuth<{ success: boolean; data: HotelBookingDto }>(
    "POST",
    "/api/v1/hotel-bookings",
    accessToken,
    body as Record<string, unknown>
  );
}

export function confirmHotelBooking(accessToken: string, bookingId: string) {
  return requestJsonAuth<{ success: boolean; data: HotelBookingDto }>(
    "PUT",
    `/api/v1/hotel-bookings/${encodeURIComponent(bookingId)}/confirm`,
    accessToken
  );
}

export function listMyHotelBookings(
  accessToken: string,
  opts?: { page?: number; limit?: number }
) {
  const q = buildApiQuery({
    page: opts?.page ?? 1,
    limit: opts?.limit ?? 30,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  return requestJsonAuth<HotelBookingListResponse>(
    "GET",
    `/api/v1/hotel-bookings${q}`,
    accessToken
  );
}

export function beachNameFromHotel(h: HotelDto): string {
  const b = h.beach;
  if (b && typeof b === "object" && "beachName" in b) {
    return String((b as { beachName?: string }).beachName ?? "—");
  }
  return "—";
}
