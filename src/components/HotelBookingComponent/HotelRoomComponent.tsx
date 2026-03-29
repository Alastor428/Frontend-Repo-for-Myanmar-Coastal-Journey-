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
}) => {
  const isAvailable = status === "available";

  return (
    <Card style={styles.card}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text style={styles.roomType}>{roomType}</Text>

        {/* Status */}
        <Text
          style={[
            styles.status,
            { color: isAvailable ? "#1CB5B0" : "#D32F2F" },
          ]}
        >
          {isAvailable ? "Available" : "Busy"}
        </Text>

        {/* Show busy date only if busy */}
        {!isAvailable && busyUntil && (
          <Text style={styles.busyDate}>
            Busy until: {busyUntil}
          </Text>
        )}

        {/* Icons */}
        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <IconButton icon="bed" size={18} iconColor="#1CB5B0" />
            <Text style={styles.iconText}>{bedType}</Text>
          </View>

          <View style={styles.iconItem}>
            <IconButton icon="ruler-square" size={18} iconColor="#1CB5B0"/>
            <Text style={styles.iconText}>{area}</Text>
          </View>

          <View style={styles.iconItem}>
            <IconButton icon="account-group" size={18} iconColor="#1CB5B0"/>
            <Text style={styles.iconText}>{limit}</Text>
          </View>
        </View>

        <View><Text style={styles.iconText}>{view}</Text></View>

        {/* Price */}
        <View style={styles.priceSection}>
          <Text style={styles.todayPrice}>Today's Price</Text>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.taxText}>include tax & fees</Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isAvailable ? "#1CB5B0" : "#ccc" },
          ]}
          disabled={!isAvailable}
        >
          <Text style={styles.buttonText}>
            {isAvailable ? "Select Room" : "Unavailable"}
          </Text>
        </TouchableOpacity>
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
    color: "#ooo",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taxText: {
    fontSize: 12,
    color: "#ooo",
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