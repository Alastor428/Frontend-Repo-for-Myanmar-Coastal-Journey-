import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";
import SeatLayout from "./Bus_ticket_seat_layout";
import SeatLegend from "./Bus_fixed_sample_seat";

const BusTicketSeatSelectionScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  
  const seatSelectionData = {
    bookedSeats: ["1A", "3B", "4C"], // pre-booked seats
    seatPrice: 75000,                 // price per seat
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation?.goBack?.()}
          style={{ margin: 0, padding: 0 }}
        />
        <Text style={styles.headerText}>Select Seat</Text>
      </View>

      <SeatLegend />

      <View style={{ flex: 1 }}>
        <SeatLayout
          bookedSeatsInit={seatSelectionData.bookedSeats}
          seatPrice={seatSelectionData.seatPrice}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: "#EFF3F4" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 32,
    paddingBottom: 8,
    backgroundColor: "#EFF3F4",
  },
  headerText: { fontSize: 20, fontWeight: "bold", marginLeft: "auto", marginRight: "auto", fontFamily: "Poppins" },
});

export default BusTicketSeatSelectionScreen;