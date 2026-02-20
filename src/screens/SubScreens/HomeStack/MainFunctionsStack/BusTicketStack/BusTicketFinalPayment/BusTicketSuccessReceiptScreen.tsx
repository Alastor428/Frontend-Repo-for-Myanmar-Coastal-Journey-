import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BusTicketSuccessReceiptScreen = ({ route, navigation }: any) => {

  const {
    amount,
    recipient,
    departureTime,
    transactionTime,
    transactionNo,
    transactionTo,
    totalAmount,
    travelDate,
    seat,
    paymentMethod,
    nrcNumber,
    userName,
  }  = route?.params || {};

  return (
    <View style={styles.container}>
     
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark" size={32} color="#fff" />
      </View>

      <Text style={styles.successText}>Payment successful</Text>

      <Text style={styles.amountText}>-{amount} MMK</Text>
      <Text style={styles.recipientText}>Recipient : {recipient}</Text>

  
      <View style={styles.divider} />

    
      <Row label="Departure Time" value={departureTime} />
      <Row label="Transaction Time" value={transactionTime} />
      <Row label="Transaction No." value={transactionNo} />
      <Row label="Transaction To" value={transactionTo} />
      <Row label="Total Amount" value={`${totalAmount} MMK`} />
      <Row label="Travel date" value={travelDate} />
      <Row label="Departure Time" value={departureTime} />
      <Row label="Purchase seat" value={seat} />
      <Row label="Payment method" value={paymentMethod} />
      <Row label="NRC Number" value={nrcNumber} />
      <Row label="User Name" value={userName} />

   
      <TouchableOpacity
        style={styles.okButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.okText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BusTicketSuccessReceiptScreen;


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
