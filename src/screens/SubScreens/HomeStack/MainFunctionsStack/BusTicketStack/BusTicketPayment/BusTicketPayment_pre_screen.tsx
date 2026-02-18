import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const BusTicketPayment_pre_screen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Demo</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("TicketConfirm", {
            busType: "Normal Express (2+2)",
            travelDate: "2025-12-25",
            departureTime: "08:30 AM",
            adult: 2,
            price: 30000,
            promotion: 0,
            totalPrice: 60000,
            boardingPoint: "Chan Mya Shwe Pyi Station",
          })
        }
      >
        <Text style={styles.buttonText}>Go To Ticket Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BusTicketPayment_pre_screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#2aa8a8",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
