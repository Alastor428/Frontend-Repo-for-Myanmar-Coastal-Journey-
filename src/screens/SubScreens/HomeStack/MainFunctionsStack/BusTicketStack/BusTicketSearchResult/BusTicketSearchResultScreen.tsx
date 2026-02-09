import React from "react";
import { View, StyleSheet } from "react-native";
import TicketCard_Buy from "./Ticket_card_buy";

const BusTicketSearchResultScreen = () => {
  return (
    <View style={styles.outerContainer}>
      <TicketCard_Buy />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#EFF3F4",
  },
});

export default BusTicketSearchResultScreen;
