import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const CyclingButton: React.FC = () => {
  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => alert("Cycling")}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.pressed,
        ]}
      >
        <MaterialIcons name="pedal-bike" size={24} color="#1CB5B0" />
      </Pressable>

      <Text style={[styles.iconLabel, styles.cyclingText]} numberOfLines={1}>
        Cycling
      </Text>
    </View>
  );
};

export default CyclingButton;

const styles = StyleSheet.create({
  item: {
    width: 48,
    height: 84,
    alignItems: "center",
    gap: 12,
  },

  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ffffff",
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

  cyclingText: {
    width: 72,
  },
});
