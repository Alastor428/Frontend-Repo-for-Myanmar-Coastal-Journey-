import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PackagePaymentMethodModal from "../../PackageStack/PackagePaymentMethodModal";

interface TicketData {
  busType: string;
  travelDate: string;
  departureTime: string;
  adult: number;
  price: number;
  promotion: number;
  totalPrice: number;
  boardingPoint: string;
}

const BusTicketPayment_pre_screen = ({ navigation }: any) => {
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const dummyTicketData: TicketData = {
    busType: "Normal Express (2+2)",
    travelDate: "2025-12-25",
    departureTime: "08:30 AM",
    adult: 2,
    price: 30000,
    promotion: 0,
    totalPrice: 60000,
    boardingPoint: "Chan Mya Shwe Pyi Station",
  };

  const paymentTotalAmount = dummyTicketData.totalPrice.toString();
  const paymentTravelers = dummyTicketData.adult;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Demo</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsPaymentModalVisible(true)}
      >
        <Text style={styles.buttonText}>Confirm & Pay</Text>
      </TouchableOpacity>
      
      <PackagePaymentMethodModal
        visible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        totalAmount={paymentTotalAmount} // string now
        travelers={paymentTravelers}
      />
    </View>
  );
};

export default BusTicketPayment_pre_screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Poppins",
    color: "#111827",
  },

  button: {
    backgroundColor: "#1CB5B0",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins",
  },
});