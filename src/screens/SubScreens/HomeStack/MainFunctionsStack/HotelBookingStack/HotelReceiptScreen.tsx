import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HotelBookingSuccessScreen = ({ route, navigation }: any) => {
  const {
    hotelName,
    guestName,
    phone,
    rooms,
    adults,
    nights,
    totalPrice,
    paymentType,
    checkInDate,
    checkOutDate,
    remark,
  } = route?.params || {};

  const transactionNo = `HT-${Date.now()}`;
  const transactionTime = new Date().toLocaleString();

  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark" size={32} color="#fff" />
      </View>

      {/* Title */}
      <Text style={styles.successText}>Booking Successful</Text>

      {/* Amount */}
      <Text style={styles.amountText}>-{totalPrice?.toLocaleString()} MMK</Text>
      <Text style={styles.recipientText}>Guest: {guestName}</Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Details */}
      <Row label="Hotel" value={hotelName} />
      <Row label="Guest Name" value={guestName} />
      <Row label="Phone" value={phone} />
      <Row label="Rooms" value={`${rooms}`} />
      <Row label="Adults" value={`${adults}`} />
      <Row label="Nights" value={`${nights}`} />
      <Row label="Check-in" value={checkInDate} />
      <Row label="Check-out" value={checkOutDate} />
      <Row label="Payment Method" value={paymentType} />
      <Row label="Transaction No." value={transactionNo} />
      <Row label="Transaction Time" value={transactionTime} />
      <Row label="Total Amount" value={`${totalPrice} MMK`} />
      {remark ? <Row label="Remark" value={remark} /> : null}

      {/* OK Button */}
      <TouchableOpacity
        style={styles.okButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.okText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HotelBookingSuccessScreen;

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#fff",
  },
  iconWrapper: {
    alignSelf: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2bb6a3",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  successText: {
    textAlign: "center",
    marginTop: 10,
    color: "#2bb6a3",
    fontSize: 16,
  },
  amountText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  recipientText: {
    textAlign: "center",
    color: "#555",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  label: {
    color: "#666",
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
  },
  okButton: {
    backgroundColor: "#2bb6a3",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 30,
  },
  okText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});