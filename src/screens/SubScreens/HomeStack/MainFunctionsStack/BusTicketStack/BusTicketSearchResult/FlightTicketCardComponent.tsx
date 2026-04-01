// FlightTicketCardComponent.tsx
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import BuyTicketButton from "./Buyticket_button";
import Soldout_TicketButton from "./Soldout_ticket_button";

interface FlightTicket {
  id: string;
  showId: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: string;
  duration: string;
  status: "available" | "soldout";
  source: string;
  destination: string;
  travelDate: string;
  seatPrice: number;
  boardingPoint?: string;
}

interface Props {
  ticket: FlightTicket;
  navigation?: any;
}

const FlightTicketCard: React.FC<Props> = ({ ticket, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../../../../../assets/Logo/WW_logo.jpg")}
              style={styles.logoImage}
            />
          </View>
          <Text style={styles.typeName}>{ticket.airline}</Text>
        </View>

        {/* Middle Section */}
        <View style={styles.middleSection}>
          <View style={styles.infoRow}>
            <Text>Departure</Text>
            <Text>{ticket.departureTime}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Arrival</Text>
            <Text>{ticket.arrivalTime}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Price</Text>
            <Text>{ticket.price}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Duration</Text>
            <Text>{ticket.duration}</Text>
          </View>
        </View>

        {/* Button / Sold Out */}
        <View style={styles.buttonContainer}>
          {ticket.status === "available" ? (
            <BuyTicketButton 
              ticketId={ticket.id} 
              onPress={() => navigation?.navigate("FlightTicketSeatSelection", { ticket })}
            />
          ) : (
            <Soldout_TicketButton ticketId={ticket.id} />
          )}
        </View>
      </View>
    </View>
  );
};

export default FlightTicketCard;

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 10 },
  card: {
    width: 328,
    height: 216,
    marginTop: 20,
    borderRadius: 4,
    backgroundColor: "#79D7D414",
    padding: 16,
    justifyContent: "space-between",
  },
  topSection: { flexDirection: "row", alignItems: "center" },
  logoContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: { width: 60, height: 60 },
  typeName: { marginLeft: 100 },
  middleSection: { gap: 8 },
  infoRow: { flexDirection: "row", justifyContent: "space-between" },
  buttonContainer: { alignItems: "center" },
});