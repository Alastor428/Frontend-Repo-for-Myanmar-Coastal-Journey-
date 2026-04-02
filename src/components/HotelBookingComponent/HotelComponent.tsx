import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { ImageSourcePropType } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BookNowButton from "./BookNowButton";

export type HotelBookingFlowContext = {
  beachName: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  nights: number;
};

interface HotelComponentProps {
  hotelId: string;
  imageUrl: ImageSourcePropType;
  title: string;
  mapsUrl: string;
  rating: string;
  price: string;
  bookingContext: HotelBookingFlowContext;
}

const HotelComponent: React.FC<HotelComponentProps> = ({
  hotelId,
  imageUrl,
  title,
  mapsUrl,
  rating,
  price,
  bookingContext,
}) => {
  const navigation = useNavigation<any>();
  const [bookmarked, setBookmarked] = useState(false);

  const goDetail = () => {
    navigation?.navigate("HotelDetailScreen", {
      hotelId,
      hotelName: title,
      rating,
      bookingContext,
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.85}>
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={imageUrl} style={styles.image} />
          <View style={styles.bookmarkIcon}>
            <IconButton
              icon={bookmarked ? "bookmark" : "bookmark-outline"}
              size={26}
              iconColor={bookmarked ? "#FFD700" : "#fff"}
              style={{
                marginLeft: 232,
                marginTop: 4,
                backgroundColor: "rgb(255,255,255,0.09)",
              }}
              onPress={() => setBookmarked((p) => !p)}
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.row}>
            <IconButton
              icon="star"
              size={16}
              iconColor="#FFD51F"
              style={{ margin: 0 }}
            />
            <Text style={styles.text}>{rating}</Text>
          </View>
          <View style={styles.row}>
            <IconButton
              icon="map-marker"
              size={16}
              iconColor="#C49172"
              style={{ margin: 0 }}
            />
            <Text
              style={styles.locationText}
              onPress={() => Linking.openURL(mapsUrl)}
            >
              View on map
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "#1CB5B0",
              width: "50%",
              height: 56,
              justifyContent: "center",
              alignItems: "center",
              borderBottomLeftRadius: 8,
            }}
          >
            <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
              From
            </Text>
            <Text style={{ fontSize: 14, color: "#fff", fontWeight: "600" }}>
              {price}
            </Text>
          </View>
          <View style={{ width: "50%", borderBottomRightRadius: 8 }}>
            <BookNowButton onPress={goDetail} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default HotelComponent;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bookmarkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  text: {
    fontSize: 14,
  },
  locationText: {
    fontSize: 14,
    color: "#1cb5b0",
    textDecorationLine: "underline",
  },
});
