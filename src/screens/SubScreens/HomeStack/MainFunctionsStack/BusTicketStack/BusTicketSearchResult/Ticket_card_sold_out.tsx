import React from "react";
import { View, Text, StyleSheet, Image ,ScrollView} from "react-native";
import Soldout_TicketButton from "./Soldout_ticket_button";

interface Ticket {
  id: string;
  type: string;
  departureTime: string;
  price: string;
}

const ticketData: Ticket[] = [
  {
    id: "ticket_buy_1",
    type: "Normal Express (2+2)",
    departureTime: "08:00 am",
    price: "75,000 MMK",
  },
  {
    id: "ticket_buy_2",
    type: "Normal Express (2+2)",
    departureTime: "05:00 pm",
    price: "75,000 MMK",
  },
];
const TicketCard_Soldout: React.FC = () => {
  return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
   {ticketData.map((ticket) => (
    <View style={styles.card}>
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require(("../../../../../../../assets/Logo/WW_logo.jpg"))}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.typeName}>{ticket.type}</Text>
      </View>

   
      <View style={styles.middleSection} >
        <View style={styles.infoRow} >
          <Text style={styles.infoLabel} > Departure Time </Text>
          <Text style={styles.infoValue}>{ticket.departureTime}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Price (MMK)</Text>
          <Text style={styles.infoValue}>{ticket.price}</Text>
        </View>
      </View>
      <View style={styles.buttoncontainer}>
      <Soldout_TicketButton ticketId={ticket.id}/> </View>
    </View> 
  ))}
    </ScrollView>
  );
};

export default TicketCard_Soldout;

const styles = StyleSheet.create({
    container: {
    paddingVertical: 16,
    alignItems: "center", 
    gap: 10,


  },
  card: {
    width: 328,
    height: 216,
    marginTop: 111,
    
    borderRadius: 4,
    backgroundColor: "#79D7D414",
    padding: 16,
    justifyContent: "space-between",
    opacity:1
  },

  topSection: {
    width: 328,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  logoContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1,
    marginTop:8,
    
  },

  logoImage: {
    width: 60,
    height: 60,
  },

  typeName: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 12,
    color: "#000000",
    marginLeft: 100
  },

  middleSection: {
    flexDirection: "column",
    gap: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    alignItems: "center",
  },

  infoLabel: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 12,
    color: "#000000",
  },

  infoValue: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 12,
    color: "#000000",
  },

  buttoncontainer:{
    alignItems: "center"
  }
});
