import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";
import TicketCard_Buy from "./Ticket_card_buy";

const BusTicketSearchResultScreen: React.FC<{ navigation?: any }> = ({
  navigation,
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation?.goBack?.()}
          style={{ margin: 0, padding: 0 }}
        />
        <Text style={styles.headerText}>Search Results</Text>
      </View>
      <TicketCard_Buy />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#EFF3F4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingLeft: 16,
    paddingBottom: 8,
    backgroundColor: "#EFF3F4",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 28,
    fontFamily: "Poppins",
  },
});

export default BusTicketSearchResultScreen;
