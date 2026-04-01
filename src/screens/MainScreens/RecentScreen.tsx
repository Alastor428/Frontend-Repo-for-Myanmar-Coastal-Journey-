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

  useFocusEffect(
    useCallback(() => {
      void loadTourBookings();
      void loadBusPurchases();
    }, [loadTourBookings, loadBusPurchases])
  );

  const data: Record<string, any[]> = {
    transport: busRows,

    tourguide: tourGuideRows,

    hotel: [
      {
        id: "4",
        name: "Hotel Stay (Ngapali)",
        price: 120000,
        date: "2026-03-20",
        screen: "BusTicketSuccessReceipt",
        params: {
          amount: 120000,
          recipient: "Ngapali Resort",
          departureTime: "-",
          transactionTime: "2026-03-20 09:00 AM",
          transactionNo: "TXN888888",
          transactionTo: "Hotel",
          totalAmount: 120000,
          travelDate: "2026-03-25",
          seat: "-",
          paymentMethod: "AYA Pay",
          nrcNumber: "12/PaTaNa(N)999999",
          userName: "Swan Linn",
        },
      },
    ],

    package: [
      {
        id: "5",
        name: "Beach Package (3 Days)",
        price: 300000,
        date: "2026-03-15",
        screen: "BusTicketSuccessReceipt",
        params: {
          amount: 300000,
          recipient: "Travel Agency",
          departureTime: "6:00 AM",
          transactionTime: "2026-03-15 07:00 AM",
          transactionNo: "TXN999999",
          transactionTo: "Package",
          totalAmount: 300000,
          travelDate: "2026-03-18",
          seat: "-",
          paymentMethod: "KBZPay",
          nrcNumber: "12/YaKaNa(N)112233",
          userName: "Swan Linn",
        },
      },
    ],
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

      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !showTourLoading && !showBusLoading ? (
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
