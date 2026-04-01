import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { IconButton } from "react-native-paper";
import SeatLegend from "../BusTicketSeatSelection/Bus_fixed_sample_seat";

const FLIGHT_ROWS = 8;
const FLIGHT_SEAT_PRICE = 250000;
const BOOKED_FLIGHT_SEATS = ["1A", "2B", "3C"];
const SEAT_LABELS = ["A", "B", "C", "D"]; // 2 left, 2 right

// Generate seat layout dynamically
const generateSeats = (
  rows: number,
  seatLabels: string[]
): { row: number; left: string[]; right: string[] }[] => {
  const seats = [];
  for (let i = 1; i <= rows; i++) {
    const half = seatLabels.length / 2;
    seats.push({
      row: i,
      left: seatLabels.slice(0, half).map((label) => `${i}${label}`),
      right: seatLabels.slice(half).map((label) => `${i}${label}`),
    });
  }
  return seats;
};

const FlightTicketSeatSelectionScreen: React.FC<{ navigation?: any }> = ({
  navigation,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>(BOOKED_FLIGHT_SEATS);

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return; // cannot select booked
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const confirmBooking = () => {
    if (selectedSeats.length === 0) {
      Alert.alert("No seats selected");
      return;
    }
    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    const totalAmount = selectedSeats.length * FLIGHT_SEAT_PRICE;
    setSelectedSeats([]);
    Alert.alert(
      "Seats booked successfully!",
      `Total Amount Paid: ${totalAmount} MMK`
    );
  };

  const seatsData = generateSeats(FLIGHT_ROWS, SEAT_LABELS);

  const renderSeat = (seat: string) => {
    let bgColor = "#2EAD32"; // available
    if (bookedSeats.includes(seat)) bgColor = "#FF4D4D"; // booked
    else if (selectedSeats.includes(seat)) bgColor = "#FFD700"; // selected

    return (
      <Pressable
        key={seat}
        onPress={() => toggleSeat(seat)}
        style={[styles.seat, { backgroundColor: bgColor }]}
      >
        <Text style={styles.seatText}>{seat}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation?.goBack?.()}
          style={{ margin: 0, padding: 0 }}
        />
        <Text style={styles.headerText}>Select Flight Seat</Text>
      </View>

        {/* Legend */}
        <SeatLegend />

      {/* Driver / Pilot Section */}
      <View style={styles.driverContainer}>
        <Text style={styles.driverText}>Pilot</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Seat Grid */}
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

        {/* Summary Card */}
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
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}
            </Text>

            <Text
              style={[styles.summaryDataText, { textAlign: "center", flex: 0.7 }]}
            >
              {selectedSeats.length}
            </Text>

            <Text
              style={[styles.summaryDataText, { textAlign: "right", flex: 1.2 }]}
            >
              {selectedSeats.length * FLIGHT_SEAT_PRICE} MMK
            </Text>
          </View>

          <Pressable
            style={[
              styles.buyButton,
              selectedSeats.length === 0 && styles.disabledButton,
            ]}
<<<<<<< HEAD
            onPress={confirmBooking}
=======
            onPress={navigation.navigate.bind(null, "FlightTicketPaymentScreen", {
              selectedSeats,
              seatPrice: FLIGHT_SEAT_PRICE,
            }) }
>>>>>>> origin/LPPK
          >
            <Text style={styles.buyButtonText}>Buy Ticket</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlightTicketSeatSelectionScreen;

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: "#EFF3F4" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
    paddingHorizontal: 32,
    paddingBottom: 8,
    backgroundColor: "#EFF3F4",
  },
  headerText: { fontSize: 20, fontWeight: "bold", marginLeft: "auto", marginRight: "auto", fontFamily: "Poppins" },
  container: { padding: 16, alignItems: "center" },
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
  driverText: { color: "#ffffff", fontWeight: "600", fontSize: 12, textAlign: "center" },
  busContainer: { backgroundColor: "#F6FBFB", padding: 12, borderRadius: 8 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  rowNumber: { width: 20, textAlign: "center", fontSize: 12, marginRight: 6 },
  leftSeats: { flexDirection: "row", gap: 6 },
  rightSeats: { flexDirection: "row", gap: 6 },
  aisle: { width: 80 },
  seat: { width: 36, height: 36, borderRadius: 4, justifyContent: "center", alignItems: "center" },
  seatText: { color: "white", fontSize: 10, fontWeight: "600" },
  summaryCard: { marginTop: 24, width: "100%", backgroundColor: "#F6FBFB", borderRadius: 4, paddingBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 },
  summaryHeaderRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, paddingTop: 15, paddingBottom: 10 },
  summaryHeaderText: { fontSize: 14, fontWeight: "500", color: "#000", flex: 1 },
  summaryDivider: { height: 1, backgroundColor: "#000", marginHorizontal: 12, marginBottom: 15 },
  summaryDataRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, marginBottom: 25, width: "100%", alignItems: "flex-start" },
  summaryDataText: { fontSize: 16, color: "#000", flexWrap: "wrap" },
  buyButton: { backgroundColor: "#1db0a9", marginHorizontal: 60, paddingVertical: 12, borderRadius: 8, alignItems: "center", justifyContent: "center", elevation: 3 },
  disabledButton: { backgroundColor: "#A0A0A0" },
  buyButtonText: { color: "white", fontSize: 18, fontWeight: "500" },
});