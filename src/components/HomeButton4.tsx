import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const HomeButton4: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Pressable
          onPress={() => navigation.navigate("BusTicket")}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <MaterialCommunityIcons name="bus" size={24} color="#1CB5B0" />
        </Pressable>
        <Text style={[styles.iconLabel, styles.busText]} numberOfLines={1}>
          Bus Ticket
        </Text>
      </View>

      <View style={styles.item}>
        <Pressable
          onPress={() => alert("Hotel Booking")}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <FontAwesome5 name="hotel" size={24} color="#1CB5B0" />
        </Pressable>
        <Text style={[styles.iconLabel, styles.hotelText]} numberOfLines={1}>
          Hotel Booking
        </Text>
      </View>

      <View style={styles.item}>
        <Pressable
          onPress={() => alert("Tour Guide")}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="person" size={24} color="#1CB5B0" />
        </Pressable>
        <Text style={[styles.iconLabel, styles.tourText]} numberOfLines={1}>
          Tour Guide
        </Text>
      </View>
      <View style={styles.item}>
        <Pressable
          onPress={() => alert("About Us")}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="information-circle" size={24} color="#1CB5B0" />
        </Pressable>
        <Text style={[styles.iconLabel, styles.aboutText]} numberOfLines={1}>
          About Us
        </Text>
      </View>
    </View>
  );
};

export default HomeButton4;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 84,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  item: {
    width: 48,
    height: 84,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
  },

  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#E0F0F0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },

  iconLabel: {
    height: 16,
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    color: "#1E1E1E",
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },

  busText: { width: 60 },
  hotelText: { width: 88 },
  tourText: { width: 66 },
  aboutText: { width: 57 },
});
