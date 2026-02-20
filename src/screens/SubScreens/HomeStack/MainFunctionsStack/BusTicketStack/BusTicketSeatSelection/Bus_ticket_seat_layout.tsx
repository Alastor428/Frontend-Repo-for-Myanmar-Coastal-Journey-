import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const ROWS = 11;
let SEAT_PRICE = 75000;
const bookedSeatsInit = ["1C", "2D", "5B", "7A"];

const generateSeats = () => {
  const seats = [];
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

const SeatLayout: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>(bookedSeatsInit);

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return;
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
    const totalAmount = selectedSeats.length * SEAT_PRICE;
    setSelectedSeats([]);
    Alert.alert(
      "Seats booked successfully!",
      `Total Amount Paid: ${totalAmount} MMK`
    );
  };

  const renderSeat = (seat: string) => {
    let bgColor = "#2EAD32";
    if (bookedSeats.includes(seat)) bgColor = "#FF4D4D";
    else if (selectedSeats.includes(seat)) bgColor = "#FFD700";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF3F4" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* DRIVER SECTION */}
        <View style={styles.driverContainer}>
          <Text style={styles.driverText}>Driver</Text>
        </View>

        {/* SEAT GRID SECTION */}
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

        {/* SUMMARY CARD SECTION */}
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

          {/* FIXED: This row now wraps text to a new line when full */}
          <View style={styles.summaryDataRow}>
            <Text style={[styles.summaryDataText, { flex: 1.5 }]}>
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}
            </Text>

            <Text
              style={[
                styles.summaryDataText,
                { textAlign: "center", flex: 0.7 },
              ]}
            >
              {selectedSeats.length}
            </Text>

            <Text
              style={[
                styles.summaryDataText,
                { textAlign: "right", flex: 1.2 },
              ]}
            >
              {selectedSeats.length * SEAT_PRICE} MMK
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.buyButton,
              selectedSeats.length === 0 && styles.disabledButton,
            ]}
            onPress={confirmBooking}
            disabled={selectedSeats.length === 0}
            activeOpacity={0.7}
          >
            <Text style={styles.buyButtonText}>Buy Ticket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeatLayout;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#EFF3F4",
  },
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
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  busContainer: {
    backgroundColor: "#F6FBFB",
    padding: 12,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
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
  summaryDataText: {
    fontSize: 16,
    color: "#000",
    flexWrap: "wrap",
  },
  buyButton: {
    backgroundColor: "#1db0a9",
    marginHorizontal: 60,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  buyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
