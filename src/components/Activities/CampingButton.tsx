import React from "react";
import { View, Text, StyleSheet, Pressable ,Image} from "react-native";

const CampingButton: React.FC = () => {
  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => alert(" Camping ")}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.pressed,
        ]}
      >
      <Image
          source={require("../../../assets/activities/Campsite.png")} 
          style={styles.iconImage}
         resizeMode="contain"
        />
      </Pressable>

      <Text style={[styles.iconLabel, styles.cyclingText]} numberOfLines={1}>
         Camping
      </Text>
    </View>
  );
};

export default CampingButton;

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
  iconImage: {
    width: 32,
    height: 32,
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
