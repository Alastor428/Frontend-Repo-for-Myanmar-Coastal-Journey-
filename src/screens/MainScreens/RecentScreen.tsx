import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { loadAuthSession } from "@/auth/authStorage";
import {
  listMyTourGuideBookings,
  type TourGuideBookingDto,
  type TourGuideDto,
} from "@/api/tourGuideApi";
import {
  listMyBusSeatPurchases,
  type BusSeatPurchaseDto,
} from "@/api/busSeatApi";
import {
  listMyTravelPackageBookings,
  type PackageBookingDto,
} from "@/api/packageApi";
import {
  listMyHotelBookings,
  type HotelBookingDto,
} from "@/api/hotelApi";

function guideNameFromBooking(b: TourGuideBookingDto): string {
  const tg = b.tourGuide;
  if (tg && typeof tg === "object" && "name" in tg) {
    return (tg as TourGuideDto).name;
  }
  return "Tour guide";
}

function guideGenderFromBooking(b: TourGuideBookingDto): string {
  const tg = b.tourGuide;
  if (tg && typeof tg === "object" && "gender" in tg) {
    return String((tg as TourGuideDto).gender ?? "—");
  }
  return "—";
}

function busPurchaseToReceiptParams(p: BusSeatPurchaseDto) {
  const when = p.createdAt ?? "";
  const timeStr =
    typeof when === "string"
      ? when.slice(0, 19).replace("T", " ")
      : new Date().toLocaleString();
  const travel =
    typeof p.travelDate === "string"
      ? p.travelDate.slice(0, 10)
      : String(p.travelDate).slice(0, 10);

  return {
    amount: p.totalPrice,
    recipient: p.ticketLabel || "Bus Ticket",
    departureTime: p.departureTime,
    transactionTime: timeStr,
    transactionNo: String(p._id),
    transactionTo: p.ticketLabel || "Wave Way Bus",
    totalAmount: p.totalPrice,
    travelDate: travel,
    seat: p.seatIds.join(", "),
    paymentMethod: "App",
    nrcNumber: p.passengerNrc || "—",
    passportNumber: p.passengerNrc || "—",
    userName: p.passengerName || "—",
  };
}

function bookingToReceiptParams(b: TourGuideBookingDto) {
  const gname = guideNameFromBooking(b);
  const when = b.confirmedAt || b.createdAt || b.startDate;
  const timeStr =
    typeof when === "string"
      ? when.slice(0, 19).replace("T", " ")
      : new Date().toLocaleString();

  return {
    transactionTime: timeStr,
    transactionNo: String(b._id),
    transactionTo: "Wave Way",
    totalAmount: String(b.totalPrice),
    rentalStart:
      typeof b.startDate === "string"
        ? b.startDate.slice(0, 10)
        : String(b.startDate),
    rentalEnd:
      typeof b.endDate === "string"
        ? b.endDate.slice(0, 10)
        : String(b.endDate),
    guideName: gname,
    gender: guideGenderFromBooking(b),
    paymentMethod: b.status === "Confirmed" ? "Paid (app)" : "Pending",
    nrcNumber: "—",
    userName: b.guestName ?? "—",
    status: b.status,
  };
}

const RecentScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("transport");

  const [tourGuideRows, setTourGuideRows] = useState<
    {
      id: string;
      name: string;
      price: number;
      date: string;
      screen: string;
      params: ReturnType<typeof bookingToReceiptParams>;
    }[]
  >([]);
  const [tourGuideLoading, setTourGuideLoading] = useState(false);
  const [tourGuideHint, setTourGuideHint] = useState<string | null>(null);

  const [busRows, setBusRows] = useState<
    {
      id: string;
      name: string;
      price: number;
      date: string;
      screen: string;
      params: ReturnType<typeof busPurchaseToReceiptParams>;
    }[]
  >([]);
  const [busLoading, setBusLoading] = useState(false);
  const [busHint, setBusHint] = useState<string | null>(null);

  const [hotelRows, setHotelRows] = useState<
    {
      id: string;
      name: string;
      price: number;
      date: string;
      screen: string;
      params: any;
    }[]
  >([]);
  const [hotelLoading, setHotelLoading] = useState(false);
  const [hotelHint, setHotelHint] = useState<string | null>(null);

  const [packageRows, setPackageRows] = useState<
    {
      id: string;
      name: string;
      price: number;
      date: string;
      screen: string;
      params: any;
    }[]
  >([]);
  const [packageLoading, setPackageLoading] = useState(false);
  const [packageHint, setPackageHint] = useState<string | null>(null);

  const loadTourBookings = useCallback(async () => {
    setTourGuideHint(null);
    setTourGuideLoading(true);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setTourGuideRows([]);
        setTourGuideHint("Sign in to see your tour guide bookings.");
        return;
      }
      const res = await listMyTourGuideBookings(session.accessToken, {
        page: 1,
        limit: 30,
      });
      const rows = (res.data ?? []).map((b) => ({
        id: String(b._id),
        name: `${guideNameFromBooking(b)} (Tour guide)`,
        price: b.totalPrice,
        date: (b.createdAt ?? b.startDate ?? "").toString().slice(0, 10),
        screen: "TourGuidePaymentReceiptScreen",
        params: bookingToReceiptParams(b),
      }));
      setTourGuideRows(rows);
    } catch {
      setTourGuideRows([]);
      setTourGuideHint("Could not load tour guide bookings.");
    } finally {
      setTourGuideLoading(false);
    }
  }, []);

  const loadBusPurchases = useCallback(async () => {
    setBusHint(null);
    setBusLoading(true);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setBusRows([]);
        setBusHint("Sign in to see your bus tickets.");
        return;
      }
      const res = await listMyBusSeatPurchases(session.accessToken, {
        page: 1,
        limit: 30,
      });
      const rows = (res.data ?? []).map((p) => ({
        id: `bus-${p._id}`,
        name: `${p.transportType ?? "Bus"} (${p.source} → ${p.destination})`,
        price: p.totalPrice,
        date: (p.createdAt ?? "").toString().slice(0, 10),
        screen:
          p.transportType === "Flight"
            ? "FlightTicketSuccessReceipt"
            : "BusTicketSuccessReceipt",
        params: busPurchaseToReceiptParams(p),
      }));
      setBusRows(rows);
    } catch {
      setBusRows([]);
      setBusHint("Could not load bus tickets.");
    } finally {
      setBusLoading(false);
    }
  }, []);

  const loadHotelBookings = useCallback(async () => {
    setHotelHint(null);
    setHotelLoading(true);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setHotelRows([]);
        setHotelHint("Sign in to see your hotel bookings.");
        return;
      }

      const res = await listMyHotelBookings(session.accessToken, {
        page: 1,
        limit: 30,
      });

      const rows = (res.data ?? []).map((b: HotelBookingDto) => {
        const hotelObj = b.hotel && typeof b.hotel === "object" ? b.hotel : null;
        const hotelName =
          hotelObj && "hotelName" in hotelObj
            ? String((hotelObj as any).hotelName ?? "Hotel")
            : "Hotel";

        const li0 = b.lineItems?.[0] as any;
        const rooms = Number(li0?.numberOfRooms ?? 1);
        const adults = Number(li0?.numberOfAdults ?? 1);
        const nights = Number(li0?.lengthOfStayNights ?? 1);
        const checkInDate = li0?.checkInDate ? String(li0.checkInDate).slice(0, 10) : "";
        const checkOutDate = li0?.checkOutDate ? String(li0.checkOutDate).slice(0, 10) : "";
        const totalPrice = Number(b.totalPrice ?? 0) || 0;

        return {
          id: `hotel-${b._id}`,
          name: `${hotelName} (${checkInDate || "—"})`,
          price: totalPrice,
          date: String(b.createdAt ?? checkInDate ?? "").slice(0, 10),
          screen: "HotelBookingSuccess",
          params: {
            hotelName,
            guestName: b.guestName ?? "Guest",
            phone: "",
            rooms,
            adults,
            nights,
            totalPrice,
            paymentType: "MPU",
            remark: "",
            checkInDate,
            checkOutDate,
          },
        };
      });

      setHotelRows(rows);
    } catch (e) {
      setHotelRows([]);
      setHotelHint("Could not load hotel bookings.");
      // eslint-disable-next-line no-console
      console.error("Hotel bookings load failed:", e);
    } finally {
      setHotelLoading(false);
    }
  }, []);

  const loadPackageBookings = useCallback(async () => {
    setPackageHint(null);
    setPackageLoading(true);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setPackageRows([]);
        setPackageHint("Sign in to see your package bookings.");
        return;
      }
      const res = await listMyTravelPackageBookings(session.accessToken, {
        page: 1,
        limit: 30,
      });

      const rows = (res.data ?? []).map((b: PackageBookingDto) => {
        const tp = b.travelPackage ?? {};
        const pkgName = tp?.packageName ?? "Travel Package";
        const toBeach =
          tp?.toBeach && typeof tp.toBeach === "object" && "beachName" in tp.toBeach
            ? String((tp.toBeach as any).beachName ?? "")
            : "";
        const nights = Number(tp?.hotel?.nights ?? 1);
        const days = nights + 1;

        return {
          id: `package-${b._id}`,
          name: `${pkgName}${toBeach ? ` (${toBeach})` : ""}`,
          price: Number(b.totalPrice ?? 0),
          date: String(b.createdAt ?? "").slice(0, 10),
          screen: "PackageBookingSuccess",
          params: {
            packageName: pkgName,
            travelers: b.numberOfPeople ?? 1,
            totalAmount: String(b.totalPrice ?? 0),
            paymentType: (b.paymentMethod ?? "MPU") as string,
            duration: `${days} Days ${nights} Night`,
            remark: "",
          },
        };
      });

      setPackageRows(rows);
    } catch (e) {
      setPackageRows([]);
      setPackageHint(e instanceof Error ? e.message : "Could not load package bookings.");
    } finally {
      setPackageLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadTourBookings();
      void loadBusPurchases();
      void loadHotelBookings();
      void loadPackageBookings();
    }, [loadTourBookings, loadBusPurchases, loadHotelBookings, loadPackageBookings])
  );

  const data: Record<string, any[]> = {
    transport: busRows,

    tourguide: tourGuideRows,

    hotel: hotelRows,

    package: packageRows,
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.screen, item.params)}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} MMK</Text>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );

  const listData = data[activeTab];
  const showTourLoading = activeTab === "tourguide" && tourGuideLoading;
  const showBusLoading = activeTab === "transport" && busLoading;
  const showHotelLoading = activeTab === "hotel" && hotelLoading;
  const showPackageLoading = activeTab === "package" && packageLoading;

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {["transport", "tourguide", "hotel", "package"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {showTourLoading || showBusLoading ? (
        <ActivityIndicator style={{ marginTop: 24 }} size="large" />
      ) : null}

      {activeTab === "tourguide" && tourGuideHint ? (
        <Text style={styles.hint}>{tourGuideHint}</Text>
      ) : null}

      {activeTab === "transport" && busHint ? (
        <Text style={styles.hint}>{busHint}</Text>
      ) : null}

      {activeTab === "hotel" && hotelHint ? (
        <Text style={styles.hint}>{hotelHint}</Text>
      ) : null}

      {activeTab === "package" && packageHint ? (
        <Text style={styles.hint}>{packageHint}</Text>
      ) : null}

      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !showTourLoading && !showBusLoading && !showHotelLoading && !showPackageLoading ? (
            <Text style={styles.empty}>No records found</Text>
          ) : null
        }
      />
    </View>
  );
};

export default RecentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  hint: {
    textAlign: "center",
    color: "#888",
    marginBottom: 8,
    fontSize: 13,
  },
  tabContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  tab: {
    fontSize: 13,
    color: "#999",
  },
  activeTab: {
    color: "#2bb6a3",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#2bb6a3",
    paddingBottom: 3,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  price: {
    marginTop: 6,
    fontSize: 15,
    color: "#2bb6a3",
    fontWeight: "bold",
  },
  date: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#999",
  },
});
