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

/* ---------------- HELPERS ---------------- */

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
  return {
    totalAmount: p.totalPrice,
  };
}

function bookingToReceiptParams(b: TourGuideBookingDto) {
  return {
    totalAmount: String(b.totalPrice),
  };
}

/* ---------------- MAIN SCREEN ---------------- */

const RecentScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("transport");
  const [sortType, setSortType] = useState<"high" | "low">("high");

  const [tourGuideRows, setTourGuideRows] = useState<any[]>([]);
  const [busRows, setBusRows] = useState<any[]>([]);
  const [hotelRows, setHotelRows] = useState<any[]>([]);
  const [packageRows, setPackageRows] = useState<any[]>([]);

  const [tourGuideLoading, setTourGuideLoading] = useState(false);
  const [busLoading, setBusLoading] = useState(false);
  const [hotelLoading, setHotelLoading] = useState(false);
  const [packageLoading, setPackageLoading] = useState(false);

  const [tourGuideHint, setTourGuideHint] = useState<string | null>(null);
  const [busHint, setBusHint] = useState<string | null>(null);
  const [hotelHint, setHotelHint] = useState<string | null>(null);
  const [packageHint, setPackageHint] = useState<string | null>(null);

  /* ---------------- LOAD FUNCTIONS ---------------- */

  const loadTourBookings = useCallback(async () => {
    setTourGuideLoading(true);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setTourGuideHint("Sign in to see your tour guide bookings.");
        return;
      }
      const res = await listMyTourGuideBookings(session.accessToken, { page: 1, limit: 30 });

      setTourGuideRows(
        (res.data ?? []).map((b) => ({
          id: String(b._id),
          name: guideNameFromBooking(b),
          price: b.totalPrice,
          date: String(b.createdAt ?? "").slice(0, 10),
          screen: "TourGuidePaymentReceiptScreen",
          params: bookingToReceiptParams(b),
        }))
      );
    } catch {
      setTourGuideHint("Error loading tour guides");
    } finally {
      setTourGuideLoading(false);
    }
  }, []);

  const loadBusPurchases = useCallback(async () => {
    setBusLoading(true);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setBusHint("Sign in to see your bus tickets.");
        return;
      }

      const res = await listMyBusSeatPurchases(session.accessToken, { page: 1, limit: 30 });

      setBusRows(
        (res.data ?? []).map((p) => ({
          id: String(p._id),
          name: `${p.source} → ${p.destination}`,
          price: p.totalPrice,
          date: String(p.createdAt ?? "").slice(0, 10),
          screen: "BusTicketSuccessReceipt",
          params: busPurchaseToReceiptParams(p),
        }))
      );
    } catch {
      setBusHint("Error loading bus");
    } finally {
      setBusLoading(false);
    }
  }, []);

  const loadHotelBookings = useCallback(async () => {
    setHotelLoading(true);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setHotelHint("Sign in to see hotel bookings.");
        return;
      }

      const res = await listMyHotelBookings(session.accessToken, { page: 1, limit: 30 });

      setHotelRows(
        (res.data ?? []).map((b: any) => ({
          id: String(b._id),
          name: b.hotel?.hotelName || "Hotel",
          price: b.totalPrice,
          date: String(b.createdAt ?? "").slice(0, 10),
          screen: "HotelBookingSuccess",
          params: {},
        }))
      );
    } catch {
      setHotelHint("Error loading hotels");
    } finally {
      setHotelLoading(false);
    }
  }, []);

  const loadPackageBookings = useCallback(async () => {
    setPackageLoading(true);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setPackageHint("Sign in to see packages.");
        return;
      }

      const res = await listMyTravelPackageBookings(session.accessToken, { page: 1, limit: 30 });

      setPackageRows(
        (res.data ?? []).map((b: any) => ({
          id: String(b._id),
          name: b.travelPackage?.packageName || "Package",
          price: b.totalPrice,
          date: String(b.createdAt ?? "").slice(0, 10),
          screen: "PackageBookingSuccess",
          params: {},
        }))
      );
    } catch {
      setPackageHint("Error loading packages");
    } finally {
      setPackageLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTourBookings();
      loadBusPurchases();
      loadHotelBookings();
      loadPackageBookings();
    }, [])
  );

  const data: Record<string, any[]> = {
    transport: busRows,
    tourguide: tourGuideRows,
    hotel: hotelRows,
    package: packageRows,
  };

  /* ---------------- SORT ---------------- */

  const listData = [...data[activeTab]].sort((a, b) =>
    sortType === "high" ? b.price - a.price : a.price - b.price
  );

  /* ---------------- TOTAL ---------------- */

  const totalAmount = listData.reduce((sum, item) => sum + Number(item.price || 0), 0);

  /* ---------------- RENDER ---------------- */

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

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        {["transport", "tourguide", "hotel", "package"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SORT */}
      <View style={styles.sortRow}>
        <TouchableOpacity onPress={() => setSortType("high")}>
          <Text style={[styles.sortText, sortType === "high" && styles.activeSort]}>
            High
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortType("low")}>
          <Text style={[styles.sortText, sortType === "low" && styles.activeSort]}>
            Low
          </Text>
        </TouchableOpacity>
      </View>

      {/* TOTAL */}
      <View style={styles.amountBox}>
        <Text>Total Amount</Text>
        <Text style={styles.amount}>{totalAmount} MMK</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No records</Text>}
      />
    </View>
  );
};

export default RecentScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

    header: {
    width: "100%",
    height: 140,
    backgroundColor: "#74d7d9",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 30,
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  tab: { color: "#999" },

  activeTab: { color: "#2bb6a3", fontWeight: "bold" },

  sortRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },

  sortText: { marginLeft: 10, color: "#999" },

  activeSort: { color: "#2bb6a3", fontWeight: "bold" },

  amountBox: {
    margin: 20,
    padding: 10,
    backgroundColor: "#E8F9F8",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  amount: { color: "#1CB5B0", fontWeight: "bold" },

  card: {
    backgroundColor: "#f8f8f8",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },

  name: { fontWeight: "bold" },
  price: { color: "#2bb6a3" },
  date: { color: "#777" },

  empty: { textAlign: "center", marginTop: 30 },
});