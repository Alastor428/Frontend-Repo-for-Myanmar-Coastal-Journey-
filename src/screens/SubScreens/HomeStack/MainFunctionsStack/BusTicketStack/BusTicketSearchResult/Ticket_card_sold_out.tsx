import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Soldout_TicketButton from "./Soldout_ticket_button";

interface Ticket {
  id: string;
  type: string;
  departureTime: string;
  price: string;
  duration: string;
}

const TicketCard_Soldout: React.FC<{ data: Ticket[] }> = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((ticket) => (
        <View key={ticket.id} style={styles.card}>
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../../../../../../assets/Logo/WW_logo.jpg")}
                style={styles.logoImage}
              />
            </View>
            <Text style={styles.typeName}>{ticket.type}</Text>
          </View>

          <View style={styles.middleSection}>
            <View style={styles.infoRow}>
              <Text>Departure Time</Text>
              <Text>{ticket.departureTime}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text>Price (MMK)</Text>
              <Text>{ticket.price}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
                      <Text>Duration</Text>
                      <Text>{ticket.duration}</Text>
                    </View>

          <View style={styles.buttonContainer}>
            <Soldout_TicketButton ticketId={ticket.id} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default TicketCard_Soldout;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  card: {
    width: 328,
    height: 216,
    marginTop: 20,
    borderRadius: 4,
    backgroundColor: "#79D7D414",
    padding: 16,
    justifyContent: "space-between",
    opacity: 0.6,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  typeName: {
    marginLeft: 100,
  },
  middleSection: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    alignItems: "center",
  },
});