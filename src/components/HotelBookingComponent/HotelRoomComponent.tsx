import React from "react";
import {
  View,
  Image,
  ImageSourcePropType,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

interface HotelComponentProps {
  imageUrl: ImageSourcePropType;
  roomType: string;
  bedType: string;
  area: string;
  limit: string;
  price: string;
  status: "available" | "busy";
  busyUntil?: string;
  view: string;
  hotelName?: string; // <-- Add this line
}

const HotelRoomComponent: React.FC<HotelComponentProps> = ({
  imageUrl,
  roomType,
  bedType,
  area,
  limit,
  price,
  status,
  busyUntil,
  view,
  hotelName, // <-- Accept hotelName
}) => {
  const isAvailable = status === "available";
  const navigation = useNavigation<any>();

  const numericPrice = price
    ? Number(price.replace(/,/g, "").replace(/ MMK\/night/, ""))
    : 0;

  return (
    <Card style={styles.card}>
      <View style={styles.innerCard}>
        <View style={styles.imageContainer}>
          <Image source={imageUrl} style={styles.image} />
        </View>

        <View style={styles.content}>
          <Text style={styles.roomType}>{roomType}</Text>
          {hotelName && <Text style={styles.hotelName}>{hotelName}</Text>}

          <Text
            style={[
              styles.status,
              { color: isAvailable ? "#1CB5B0" : "#D32F2F" },
            ]}
          >
            {isAvailable ? "Available" : "Busy"}
          </Text>

          {!isAvailable && busyUntil && (
            <Text style={styles.busyDate}>Busy until: {busyUntil}</Text>
          )}

          <View style={styles.iconRow}>
            <View style={styles.iconItem}>
              <IconButton icon="bed" size={18} iconColor="#1CB5B0" />
              <Text style={styles.iconText}>{bedType}</Text>
            </View>

            <View style={styles.iconItem}>
              <IconButton icon="ruler-square" size={18} iconColor="#1CB5B0" />
              <Text style={styles.iconText}>{area}</Text>
            </View>

            <View style={styles.iconItem}>
              <IconButton icon="account-group" size={18} iconColor="#1CB5B0" />
              <Text style={styles.iconText}>{limit}</Text>
            </View>
          </View>

          <Text style={styles.iconText}>{view}</Text>

          <View style={styles.priceSection}>
            <Text style={styles.todayPrice}>Today's Price</Text>
            <Text style={styles.price}>
              {numericPrice.toLocaleString()} MMK/night
            </Text>
            <Text style={styles.taxText}>includes tax & fees</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isAvailable ? "#1CB5B0" : "#ccc" },
            ]}
            disabled={!isAvailable}
            onPress={() => navigation.navigate("HotelPaymentScreen", {
              hotelName,
              roomType,
              price,
              location: "Ngapali",
              bedType,
              area,
              limit,
              view,
            })}
          >
            <Text style={styles.buttonText}>
              {isAvailable ? "Select Room" : "Unavailable"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default HotelRoomComponent;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 4,
    overflow: "hidden",
  },
  innerCard: {
    overflow: "hidden",
    borderRadius: 12,
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 15,
  },
  roomType: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hotelName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
  busyDate: {
    fontSize: 13,
    color: "#D32F2F",
    marginBottom: 6,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  iconItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    fontSize: 13,
  },
  priceSection: {
    marginVertical: 10,
  },
  todayPrice: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taxText: {
    fontSize: 12,
    color: "#555",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});