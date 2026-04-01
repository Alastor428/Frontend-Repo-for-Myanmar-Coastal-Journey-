import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getBusShow,
  toggleBusSeats,
  type BusShowDto,
  type BusShowSeatDto,
  selectedByUserId,
} from "@/api/busSeatApi";

const ROWS = 11;

const generateSeats = () => {
  const seats: { row: number; left: string[]; right: string[] }[] = [];
  for (let i = 1; i <= ROWS; i++) {
    seats.push({
      row: i,
      left: [`${i}A`, `${i}B`],
      right: [`${i}C`, `${i}D`],
    });
  }
  return seats;
};

const seatsData = generateSeats();

function findSeat(show: BusShowDto, seatId: string): BusShowSeatDto | null {
  for (const row of show.seatLayout ?? []) {
    const s = row.seats.find((x) => x.number === seatId);
    if (s) return s;
  }
  return null;
}

type SeatUiState = "available" | "mine" | "other" | "unavailable";

function seatUiState(
  show: BusShowDto,
  seatId: string,
  userId: string
): SeatUiState {
  const s = findSeat(show, seatId);
  if (!s) return "unavailable";
  if (s.status === "Unavailable") return "unavailable";
  if (s.status === "Selected") {
    const owner = selectedByUserId(s);
    if (owner === userId) return "mine";
    return "other";
  }
  return "available";
}

function collectMySeatIds(show: BusShowDto, userId: string): string[] {
  const ids: string[] = [];
  for (const row of show.seatLayout ?? []) {
    for (const seat of row.seats) {
      if (seat.status === "Selected" && selectedByUserId(seat) === userId) {
        ids.push(seat.number);
      }
    }
  }
  return ids.sort();
}

export type ApiSeatLayoutProps = {
  showId: string;
  accessToken: string;
  userId: string;
  busType: string;
  travelDate: string;
  departureTime: string;
  source: string;
  destination: string;
  boardingPoint?: string;
  paymentScreen?: string;
  transportLabel?: string;
};

const SeatLayout: React.FC<ApiSeatLayoutProps> = ({
  showId,
  accessToken,
  userId,
  busType,
  travelDate,
  departureTime,
  source,
  destination,
  boardingPoint = "—",
  paymentScreen = "BusTicketPaymentScreen",
  transportLabel = "Bus seats",
}) => {
  const navigation = useNavigation<any>();
  const [show, setShow] = useState<BusShowDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [busySeat, setBusySeat] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getBusShow(accessToken, showId);
      setShow(res.data);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not load seats.";
      Alert.alert(transportLabel, msg);
      setShow(null);
    } finally {
      setLoading(false);
    }
  }, [accessToken, showId]);

  useEffect(() => {
    void load();
  }, [load]);

  const onToggleSeat = async (seatId: string) => {
    if (!show) return;
    const st = seatUiState(show, seatId, userId);
    if (st === "unavailable" || st === "other") return;
    setBusySeat(seatId);
    try {
      const res = await toggleBusSeats(accessToken, showId, [seatId]);
      setShow(res.data.show);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Seat could not be updated.";
      Alert.alert("Seat selection", msg);
    } finally {
      setBusySeat(null);
    }
  };

  const renderSeat = (seatId: string) => {
    if (!show) {
      return (
        <View key={seatId} style={[styles.seat, { backgroundColor: "#ccc" }]}>
          <Text style={styles.seatText}>{seatId}</Text>
        </View>
      );
    }
    const st = seatUiState(show, seatId, userId);
    let bgColor = "#2EAD32";
    if (st === "unavailable" || st === "other") bgColor = "#FF4D4D";
    else if (st === "mine") bgColor = "#FFD700";

    const locking = busySeat !== null;
    const disabled = st === "unavailable" || st === "other" || locking;

    return (
      <Pressable
        key={seatId}
        onPress={() => void onToggleSeat(seatId)}
        disabled={disabled}
        style={[styles.seat, { backgroundColor: bgColor }]}
      >
        {busySeat === seatId ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.seatText}>{seatId}</Text>
        )}
      </Pressable>
    );
  };

  const myIds = show ? collectMySeatIds(show, userId) : [];
  const seatPrice = show?.price ?? 0;
  const total = myIds.length * seatPrice;

  const goPayment = () => {
    if (!show || myIds.length === 0) {
      Alert.alert("No seats selected", "Choose at least one seat.");
      return;
    }
    navigation.navigate(paymentScreen, {
      totalAmount: String(total),
      adult: myIds.length,
      selectedSeats: myIds.join(", "),
      seatPrice,
      busType,
      travelDate,
      departureTime,
      boardingPoint,
      source,
      destination,
      showId,
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1db0a9" />
        <Text style={styles.loadingText}>Loading seats…</Text>
      </View>
    );
  }

  if (!show) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Could not load this trip.</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => void load()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.driverContainer}>
        <Text style={styles.driverText}>Driver</Text>
      </View>

      <View style={styles.busContainer}>
        {seatsData.map((item) => (
          <View key={item.row} style={styles.row}>
            <Text style={styles.rowNumber}>{item.row}</Text>
            <View style={styles.leftSeats}>
              {item.left.map((seat) => renderSeat(seat))}
            </View>
            <View style={styles.aisle} />
            <View style={styles.rightSeats}>
              {item.right.map((seat) => renderSeat(seat))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryHeaderRow}>
          <Text style={styles.summaryHeaderText}>Selected Seat</Text>
          <Text style={[styles.summaryHeaderText, { textAlign: "center" }]}>
            Number of Seat
          </Text>
          <Text style={[styles.summaryHeaderText, { textAlign: "right" }]}>
            Total Price
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryDataRow}>
          <Text style={[styles.summaryDataText, { flex: 1.5 }]}>
            {myIds.length > 0 ? myIds.join(", ") : "-"}
          </Text>
          <Text
            style={[styles.summaryDataText, { textAlign: "center", flex: 0.7 }]}
          >
            {myIds.length}
          </Text>
          <Text
            style={[styles.summaryDataText, { textAlign: "right", flex: 1.2 }]}
          >
            {total} MMK
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.buyButton,
            myIds.length === 0 && styles.disabledButton,
          ]}
          onPress={goPayment}
          disabled={myIds.length === 0}
        >
          <Text style={styles.buyButtonText}>Buy Ticket</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SeatLayout;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#EFF3F4",
  },
  loadingText: { marginTop: 12, color: "#333", fontSize: 15 },
  retryBtn: {
    marginTop: 16,
    backgroundColor: "#1db0a9",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: "#fff", fontWeight: "600" },
  container: { padding: 16, alignItems: "center", backgroundColor: "#EFF3F4" },
  driverContainer: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12,
    marginLeft: 32,
    marginTop: 4,
    marginRight: 230,
    width: 88,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  driverText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  busContainer: { backgroundColor: "#F6FBFB", padding: 12, borderRadius: 8 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  rowNumber: { width: 20, textAlign: "center", fontSize: 12, marginRight: 6 },
  leftSeats: { flexDirection: "row", gap: 6 },
  rightSeats: { flexDirection: "row", gap: 6 },
  aisle: { width: 80 },
  seat: {
    width: 36,
    height: 36,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  seatText: { color: "white", fontSize: 10, fontWeight: "600" },
  summaryCard: {
    marginTop: 24,
    width: "100%",
    backgroundColor: "#F6FBFB",
    borderRadius: 4,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  summaryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  summaryHeaderText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    flex: 1,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#000",
    marginHorizontal: 12,
    marginBottom: 15,
  },
  summaryDataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 25,
    width: "100%",
    alignItems: "flex-start",
  },
  summaryDataText: { fontSize: 16, color: "#000", flexWrap: "wrap" },
  buyButton: {
    backgroundColor: "#1db0a9",
    marginHorizontal: 60,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  disabledButton: { backgroundColor: "#A0A0A0" },
  buyButtonText: { color: "white", fontSize: 18, fontWeight: "500" },
});
