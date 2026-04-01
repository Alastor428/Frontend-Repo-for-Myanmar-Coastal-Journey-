import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type TourGuideReceiptParams = {
  transactionTime?: string;
  transactionNo?: string;
  transactionTo?: string;
  totalAmount?: string;
  rentalStart?: string;
  rentalEnd?: string;
  guideName?: string;
  gender?: string;
  paymentMethod?: string;
  nrcNumber?: string;
  userName?: string;
  status?: string;
};

const GuidePaymentSuccessScreen = ({ navigation, route }: any) => {
  const p = (route?.params as TourGuideReceiptParams) || {};

  const receiptData = {
    transactionTime:
      p.transactionTime ?? `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    transactionNo: p.transactionNo ?? "—",
    transactionTo: p.transactionTo ?? "Wave Way",
    totalAmount: p.totalAmount ?? "0",
    rentalStart: p.rentalStart ?? "—",
    rentalEnd: p.rentalEnd ?? "—",
    guideName: p.guideName ?? "—",
    gender: p.gender ?? "—",
    paymentMethod: p.paymentMethod ?? "—",
    nrcNumber: p.nrcNumber ?? "—",
    userName: p.userName ?? "—",
    status: p.status ?? "Confirmed",
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark" size={32} color="#fff" />
      </View>

      <Text style={styles.successText}>Payment Successful</Text>

      <Text style={styles.amountText}>
        {Number(receiptData.totalAmount).toLocaleString()} MMK
      </Text>

      <View style={styles.divider} />

      <Row label="Status" value={receiptData.status} />
      <Row label="Transaction Time" value={receiptData.transactionTime} />
      <Row label="Transaction No." value={receiptData.transactionNo} />
      <Row label="Transaction To" value={receiptData.transactionTo} />
      <Row
        label="Total Amount"
        value={`${Number(receiptData.totalAmount).toLocaleString()} MMK`}
      />
      <Row label="Start date" value={receiptData.rentalStart} />
      <Row label="End date" value={receiptData.rentalEnd} />
      <Row label="Guide Name" value={receiptData.guideName} />
      <Row label="Gender" value={receiptData.gender} />
      <Row label="Payment Method" value={receiptData.paymentMethod} />
      <Row label="NRC Number" value={receiptData.nrcNumber} />
      <Row label="Guest Name" value={receiptData.userName} />

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
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
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
