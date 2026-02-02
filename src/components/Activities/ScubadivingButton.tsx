import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ScubadivingButton: React.FC = () => {
  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => alert("Scuba diving")}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.pressed,
        ]}
      >
        <MaterialCommunityIcons
          name="diving-scuba"
          size={24}
          color="#1CB5B0"
        />
      </Pressable>

      <Text style={[styles.iconLabel, styles.text]} numberOfLines={1}>
        Scuba diving
      </Text>
    </View>
  );
};

export default ScubadivingButton;

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

  text: {
    width: 88,
  },
});
