import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RoundTripTicketCardProps {
  from: string;
  to: string;
  price: number;
  busImage: ImageSourcePropType; 
  currency?: string;
}

const RoundTripTicketCard: React.FC<RoundTripTicketCardProps> = ({
  from,
  to,
  price,
  busImage,
  currency = "MMK",
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
   
        <View style={styles.logoWrapper}>
          <Image source={busImage} style={styles.busImage} />
        </View>


        <View style={styles.content}>
          <Text style={styles.title}>Round-trip Bus Tickets</Text>

          <View style={styles.routeRow}>
            <Text style={styles.location}>{from}</Text>

            <Ionicons
              name="swap-horizontal"
              size={20}
              color="#000"
              style={styles.swapIcon}
            />

            <Text style={styles.location}>{to}</Text>
          </View>

          <Text style={styles.price}>
            {price.toLocaleString()} {currency}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RoundTripTicketCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#DCE5E8",
    borderRadius: 25,
    padding: 20,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  busImage: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    fontWeight: "500",
  },
  swapIcon: {
    marginHorizontal: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00A89D",
  },
});