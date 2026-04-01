import { buildApiQuery, requestJsonAuth, requestJsonPublic } from "./http";

export type BusShowTicketDto = {
  _id?: string;
  source?: string;
  destination?: string;
  departureDate?: string;
  ticketName?: string;
  isForeigner?: boolean;
};

export type BusShowSeatDto = {
  number: string;
  status: string;
  selectedBy?: string | { _id?: string };
};

export type BusShowDto = {
  _id: string;
  departureTime: string;
  price: number;
  seatLayout?: { row: string; seats: BusShowSeatDto[] }[];
  ticket: BusShowTicketDto | string;
};

export type BusSeatPurchaseDto = {
  _id: string;
  seatIds: string[];
  totalPrice: number;
  currency?: string;
  source: string;
  destination: string;
  departureTime: string;
  travelDate: string;
  ticketLabel?: string;
  transportType?: "Bus" | "Flight";
  passengerName?: string;
  passengerNrc?: string;
  createdAt?: string;
};

export type BusShowListResponse = {
  success: boolean;
  data: BusShowDto[];
};

export type BusShowSingleResponse = {
  success: boolean;
  data: BusShowDto;
};

export type ToggleSeatsResponse = {
  success: boolean;
  data: {
    show: BusShowDto;
    booking: {
      selectedSeatIds: string[];
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      currency: string;
    };
  };
};

export type ConfirmSeatsResponse = {
  success: boolean;
  data: {
    purchase: { _id: string };
    booking: { totalPrice: number };
  };
};

export type BusSeatPurchaseListResponse = {
  success: boolean;
  data: BusSeatPurchaseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function listBusShows(accessToken?: string) {
  if (accessToken) {
    return requestJsonAuth<BusShowListResponse>(
      "GET",
      "/api/v1/bus-seats",
      accessToken
    );
  }
  return requestJsonPublic<BusShowListResponse>("GET", "/api/v1/bus-seats");
}

export function getBusShow(accessToken: string, showId: string) {
  return requestJsonAuth<BusShowSingleResponse>(
    "GET",
    `/api/v1/bus-seats/${showId}`,
    accessToken
  );
}

export function toggleBusSeats(
  accessToken: string,
  showId: string,
  seatIds: string[]
) {
  return requestJsonAuth<ToggleSeatsResponse>(
    "POST",
    `/api/v1/bus-seats/${showId}/seats/selection`,
    accessToken,
    { seatIds }
  );
}

export function confirmBusSeats(
  accessToken: string,
  showId: string,
  body: {
    seatIds: string[];
    passengerName?: string;
    passengerNrc?: string;
    transportType?: "Bus" | "Flight";
    ticketLabel?: string;
  }
) {
  return requestJsonAuth<ConfirmSeatsResponse>(
    "POST",
    `/api/v1/bus-seats/${showId}/seats/confirm`,
    accessToken,
    body
  );
}

export function listMyBusSeatPurchases(
  accessToken: string,
  opts?: { page?: number; limit?: number }
) {
  const q = buildApiQuery({
    page: opts?.page ?? 1,
    limit: opts?.limit ?? 30,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  return requestJsonAuth<BusSeatPurchaseListResponse>(
    "GET",
    `/api/v1/bus-seats/my-bookings${q}`,
    accessToken
  );
}

export function countAvailableSeats(show: BusShowDto): number {
  if (!Array.isArray(show.seatLayout) || show.seatLayout.length === 0) {
    // List endpoint may omit seat layout for performance.
    return 1;
  }
  let n = 0;
  for (const row of show.seatLayout) {
    for (const s of row.seats) {
      if (s.status === "Available") n++;
    }
  }
  return n;
}

export function selectedByUserId(seat: BusShowSeatDto): string | undefined {
  const raw = seat.selectedBy;
  if (!raw) return undefined;
  if (typeof raw === "string") return raw;
  if (typeof raw === "object" && raw._id) return String(raw._id);
  return undefined;
}
