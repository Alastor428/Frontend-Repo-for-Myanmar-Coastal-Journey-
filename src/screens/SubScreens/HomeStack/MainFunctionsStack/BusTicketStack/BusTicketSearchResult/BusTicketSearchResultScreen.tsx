// BusTicketSearchResultScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { IconButton } from "react-native-paper";
import BusTicketCard from "./Ticket_card_buy";
import FlightTicketCard from "./FlightTicketCardComponent";
import Soldout_TicketButton from "./Soldout_ticket_button";
import BuyTicketButton from "./Buyticket_button";

interface BusTicket {
  id: string;
  type: string;
  departureTime: string;
  price: string;
  duration: string;
  status: "available" | "soldout";
}

interface FlightTicket {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: string;
  duration: string;
  status: "available" | "soldout";
}

const BusTicketSearchResultScreen: React.FC<{ navigation?: any }> = ({
  navigation,
}) => {
  const [activeTab, setActiveTab] = useState<"bus" | "flight">("bus");

  const busTickets: BusTicket[] = [
    {
      id: "bus1",
      type: "Normal Express (2+2)",
      departureTime: "08:00 am",
      price: "75,000 MMK",
      duration: "5h 30m",
      status: "available",
    },
    {
      id: "bus2",
      type: "Normal Express (2+2)",
      departureTime: "12:00 pm",
      price: "75,000 MMK",
      duration: "5h 30m",
      status: "soldout",
    },
  ];

  const flightTickets: FlightTicket[] = [
    {
      id: "flight1",
      airline: "Myanmar Airways",
      departureTime: "09:00 am",
      arrivalTime: "10:30 am",
      price: "250,000 MMK",
      duration: "1h 30m",
      status: "available",
    },
    {
      id: "flight2",
      airline: "Air KBZ",
      departureTime: "02:00 pm",
      arrivalTime: "03:30 pm",
      price: "300,000 MMK",
      duration: "1h 30m",
      status: "soldout",
    },
  ];

  return (
    <View style={styles.outerContainer}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation?.goBack?.()}
        />
        <Text style={styles.headerText}>Search Results</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "bus" && styles.activeTab]}
          onPress={() => setActiveTab("bus")}
        >
          <Text
            style={[styles.tabText, activeTab === "bus" && styles.activeText]}
          >
            Bus
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "flight" && styles.activeTab]}
          onPress={() => setActiveTab("flight")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "flight" && styles.activeText,
            ]}
          >
            Flight
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      // BusTicketSearchResultScreen.tsx
<ScrollView showsVerticalScrollIndicator={false}>
  {/* Bus Tickets */}
{activeTab === "bus" &&
    busTickets.map((ticket) => (
      <BusTicketCard key={ticket.id} ticket={ticket} navigation={navigation} />
    ))}

  {/* Flight Tickets */}
  {activeTab === "flight" &&
    (flightTickets.length === 0 ? (
      <Text style={{ textAlign: "center", marginTop: 50 }}>
        No flights available
      </Text>
    ) : (
      flightTickets.map((ticket) => (
        <FlightTicketCard
          key={ticket.id}
          ticket={ticket}
          navigation={navigation}
        />
      ))
    ))}
</ScrollView>
    </View>
  );
};

export default BusTicketSearchResultScreen;

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: "#ffff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Poppins",
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 32,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  activeTab: { backgroundColor: "#1CB5B0" },
  tabText: { color: "#000000", fontWeight: "500" },
  activeText: { color: "#FFFFFF" },
});