import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SeatLegend = () => {
  return (
    <View style={styles.legendCard}>
      <View style={styles.legendItem}>
        <View style={[styles.legendBox, { backgroundColor: "#2EAD32" }]} />
        <Text style={styles.legendText}>Available Seat</Text>
      </View>

      <View style={styles.legendItem}>
        <View style={[styles.legendBox, { backgroundColor: "#FFD700" }]} />
        <Text style={styles.legendText}>Selected Seat</Text>
      </View>

      <View style={styles.legendItem}>
        <View style={[styles.legendBox, { backgroundColor: "#FF4D4D" }]} />
        <Text style={styles.legendText}>Unavailable Seat</Text>
      </View>
    </View>
  );
};

export default SeatLegend;

const styles = StyleSheet.create({
  legendCard: {
    marginTop:50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F6FBFB",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 12,
    width:"90%",
    marginLeft:20,


    
  },

  legendItem: {
    alignItems: "center",
  },

  legendBox: {
    width: 36,            // SMALL ICON (like photo)
    height: 36,
    borderRadius: 4,
    marginBottom: 4,
  },

  legendText: {
    fontSize: 10,
    color: "#333",
    textAlign: "center",
  },
});
