import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GuidePaymentSuccessScreen = ({ navigation }: any) => {
  // Hardcoded receipt data
  const receiptData = {
    transactionTime: "10/01/2026 00:33:10",
    transactionNo: "000000000001",
    transactionTo: "Wave Way",
    totalAmount: "40,000",
    rentalDate: "2026-01-12",
    guideName: "Nandar",
    gender: "Female",
    paymentMethod: "KBZ Pay",
    nrcNumber: "13/NASANA(N)071666",
    userName: "Pa Pa",
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark" size={32} color="#fff" />
      </View>

      <Text style={styles.successText}>Payment Successful</Text>

      <Text style={styles.amountText}>{receiptData.totalAmount} MMK</Text>

      <View style={styles.divider} />

      <Row label="Transaction Time" value={receiptData.transactionTime} />
      <Row label="Transaction No." value={receiptData.transactionNo} />
      <Row label="Transaction To" value={receiptData.transactionTo} />
      <Row label="Total Amount" value={`${receiptData.totalAmount} MMK`} />
      <Row label="Rental Date" value={receiptData.rentalDate} />
      <Row label="Guide Name" value={receiptData.guideName} />
      <Row label="Gender" value={receiptData.gender} />
      <Row label="Payment Method" value={receiptData.paymentMethod} />
      <Row label="NRC Number" value={receiptData.nrcNumber} />
      <Row label="User Name" value={receiptData.userName} />

      <TouchableOpacity
        style={styles.okButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.okText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuidePaymentSuccessScreen;

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
