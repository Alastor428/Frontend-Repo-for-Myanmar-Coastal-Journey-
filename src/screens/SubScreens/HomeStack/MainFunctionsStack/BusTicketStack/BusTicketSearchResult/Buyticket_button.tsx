import React from "react";
import { Text, StyleSheet, Pressable, Alert } from "react-native";

interface Props {
  ticketId: string;
}

const BuyTicketButton: React.FC<Props> = ({ ticketId }) => {
  const handlePress = () => {
    Alert.alert("Success", `You bought ${ticketId}`);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.7 },
      ]}
      onPress={handlePress}
    >
      <Text style={styles.text}>Buy Ticket</Text>
    </Pressable>
  );
};

export default BuyTicketButton;

const styles = StyleSheet.create({
  button: {
    width: 196,
    height: 36,
    borderRadius: 4,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1CB5B0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    opacity: 1,
  },
  text: {
    width: 82,
    height: 24,
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "center",
    color: "#FFFFFF",
    opacity: 1,
  },
});
