import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRICE_PER_PERSON = 250000;
const MIN_TRAVELERS = 1;
const MAX_TRAVELERS = 10;

const BookPackageScreen = () => {
  const [travelers, setTravelers] = useState(1);

  const increase = () => {
    if (travelers < MAX_TRAVELERS) {
      setTravelers(travelers + 1);
    }
  };

  const decrease = () => {
    if (travelers > MIN_TRAVELERS) {
      setTravelers(travelers - 1);
    }
  };

  const total = travelers * PRICE_PER_PERSON;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

    
      <ImageBackground
        source={require("../../../../assets/ngapali_travel_package/aa.jpg")}
        style={styles.headerImage}
      >
        <View style={styles.headerTop}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.headerTitle}>Ngapali beach package</Text>
        </View>

        <View style={styles.durationBadge}>
          <Ionicons name="time-outline" size={14} color="#000" />
          <Text style={styles.durationText}> 3 Days 2 Night</Text>
        </View>
      </ImageBackground>

    
      <View style={styles.bookingContainer}>
        <View style={styles.dragIndicator} />

        <Text style={styles.title}>Book Your Package</Text>
        <Text style={styles.subtitle}>
          Myanmar Coastal Journey - 3 Days 2 Nights
        </Text>

      
        <View style={styles.travelerBox}>
          <Text style={styles.label}>Number of Travelers</Text>

          <View style={styles.counterRow}>
            <TouchableOpacity onPress={decrease} style={styles.circleBtn}>
              <Ionicons name="remove" size={18} color="#1aa7a1" />
            </TouchableOpacity>

            <Text style={styles.countText}>{travelers}</Text>

            <TouchableOpacity onPress={increase} style={styles.circleBtn}>
              <Ionicons name="add" size={18} color="#1aa7a1" />
            </TouchableOpacity>
          </View>

          <Text style={styles.limitText}>
            Min: 1 | Max: 10 travelers
          </Text>
        </View>

        
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Price per person</Text>
          <Text style={styles.rowValue}>250,000 MMK</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Number of travelers</Text>
          <Text style={styles.rowValue}>x {travelers}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total amount</Text>
          <Text style={styles.totalValue}>
            {total.toLocaleString()} MMK
          </Text>
        </View>

 
        <TouchableOpacity style={styles.paymentBtn}>
          <Text style={styles.paymentText}>Proceed to Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookPackageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerImage: {
    height: 250,
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: "space-between",
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "600",
  },

  durationBadge: {
    alignSelf: "flex-end",
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
  },

  durationText: {
    fontSize: 12,
  },

  bookingContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20,
  },

  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  travelerBox: {
    backgroundColor: "#e9f1f2",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },

  label: {
    fontWeight: "600",
    marginBottom: 10,
  },

  counterRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  circleBtn: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1aa7a1",
    justifyContent: "center",
    alignItems: "center",
  },

  countText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },

  limitText: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  rowLabel: {
    color: "#555",
  },

  rowValue: {
    fontWeight: "600",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  totalLabel: {
    fontWeight: "bold",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1aa7a1",
  },

  paymentBtn: {
    backgroundColor: "#1aa7a1",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  paymentText: {
    color: "#fff",
    fontWeight: "bold",
  },

  cancelBtn: {
    backgroundColor: "#ddd",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  cancelText: {
    color: "#666",
    fontWeight: "600",
  },
});