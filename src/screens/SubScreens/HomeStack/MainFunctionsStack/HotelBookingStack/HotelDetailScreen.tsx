import React, { useCallback, useState } from "react";
import {
  View,
  ScrollView,
  ImageSourcePropType,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import HotelRoomComponent from "@/components/HotelBookingComponent/HotelRoomComponent";
import {
  getHotelById,
  listRoomsByHotel,
  beachNameFromHotel,
  type RoomDto,
} from "@/api/hotelApi";

const HERO: ImageSourcePropType = require("../../../../../../assets/Ngapali/Hotels/hotel_photo.jpg");
const ROOM_IMG: ImageSourcePropType = require("../../../../../../assets/Ngapali/Hotels/DiamondHotel.webp");

const HotelDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const hotelId = route.params?.hotelId as string | undefined;
  const paramName = route.params?.hotelName as string | undefined;
  const bookingContext = route.params?.bookingContext as
    | {
        beachName: string;
        checkIn: string;
        checkOut: string;
        rooms: number;
        adults: number;
        nights: number;
      }
    | undefined;

  const [isExpanded, setIsExpanded] = useState(false);
  const [hotelName, setHotelName] = useState(paramName ?? "Hotel");
  const [rating, setRating] = useState<string>("—");
  const [beachLabel, setBeachLabel] = useState("—");
  const [mapsUrl, setMapsUrl] = useState("");
  const [overview, setOverview] = useState("");
  const [rooms, setRooms] = useState<RoomDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!hotelId) {
      setHint("Missing hotel.");
      setLoading(false);
      return;
    }
    setHint(null);
    setLoading(true);
    try {
      const [hRes, rRes] = await Promise.all([
        getHotelById(hotelId),
        listRoomsByHotel(hotelId, { limit: 20 }),
      ]);
      const h = hRes.data;
      setHotelName(h.hotelName);
      setRating(String(h.hotelRating ?? "—"));
      const bname = beachNameFromHotel(h);
      setBeachLabel(bname);
      setMapsUrl(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${bname} ${h.hotelName}`
        )}`
      );
      setOverview(
        `Stay at ${h.hotelName} near ${bname}. Rated ${h.hotelRating ?? "—"}★. ` +
          `Choose a room below for your dates (${bookingContext?.nights ?? "?"} nights). ` +
          `Amenities and exact location may vary; use map link for directions.`
      );
      setRooms(rRes.data ?? []);
    } catch (e) {
      setHint(e instanceof Error ? e.message : "Could not load hotel.");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, [hotelId, bookingContext?.nights]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          width: "100%",
          paddingBottom: 80,
          paddingTop: 24,
        }}
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              marginTop: 40,
            }}
          >
            <IconButton
              icon="chevron-left"
              size={32}
              iconColor="#000"
              onPress={() => navigation?.goBack?.()}
              style={{
                margin: 0,
                padding: 0,
                backgroundColor: "rgb(255,255,255,0.09)",
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: "auto",
                marginRight: "auto",
                color: "#000",
                maxWidth: "70%",
              }}
              numberOfLines={2}
            >
              {hotelName}
            </Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 24 }}
            size="large"
            color="#1CB5B0"
          />
        ) : null}
        {hint ? (
          <Text style={{ textAlign: "center", color: "#c00", padding: 16 }}>
            {hint}
          </Text>
        ) : null}

        <View style={{ width: "100%" }}>
          <Image source={HERO} style={{ width: "100%", height: 196 }} />
        </View>
        <View style={{ paddingHorizontal: 32, marginTop: 24 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              textDecorationLine: "underline",
            }}
          >
            Overview
          </Text>
          <Text style={{ marginTop: 8, fontSize: 13, color: "#555" }}>
            {rating}★ · {beachLabel}
          </Text>
          <View style={{ marginTop: 16 }}>
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 12,
                color: "#555",
              }}
              numberOfLines={isExpanded ? undefined : 3}
            >
              {overview}
            </Text>
            <TouchableOpacity
              onPress={() => setIsExpanded(!isExpanded)}
              style={{ paddingTop: 4 }}
            >
              <Text style={{ color: "#1CB5B0", fontWeight: "bold" }}>
                {isExpanded ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <View style={{ flexDirection: "row" }}>
              <IconButton
                icon="map-marker"
                size={24}
                iconColor="#1CB5B0"
                style={{ marginLeft: -8 }}
              />
              <Text style={{ marginTop: 16, marginLeft: -8 }}>{beachLabel}</Text>
            </View>
            {mapsUrl ? (
              <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                <Text
                  onPress={() => Linking.openURL(mapsUrl)}
                  style={{
                    marginTop: 16,
                    fontSize: 12,
                    color: "#1CB5B0",
                    marginLeft: 8,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  view map
                </Text>
                <IconButton
                  icon="chevron-right"
                  size={20}
                  iconColor="#1CB5B0"
                  style={{ marginHorizontal: -8 }}
                />
              </View>
            ) : null}
          </View>

          <Text
            style={{
              marginTop: 20,
              fontSize: 14,
              fontWeight: "500",
              textDecorationLine: "underline",
            }}
          >
            Rooms
          </Text>
        </View>
        <View style={{ paddingHorizontal: 32, marginTop: 16 }}>
          {rooms.map((room) => (
            <HotelRoomComponent
              key={room._id}
              roomId={room._id}
              hotelId={hotelId ?? ""}
              imageUrl={ROOM_IMG}
              roomType={room.roomType}
              bedType="Standard"
              area="—"
              limit={`Up to ${room.roomCapacity} guests`}
              price={`${Math.round(room.roomPricePerNight).toLocaleString()} MMK/night`}
              pricePerNight={room.roomPricePerNight}
              status="available"
              view="Room from catalog"
              hotelName={hotelName}
              beachName={beachLabel}
              checkIn={bookingContext?.checkIn ?? ""}
              checkOut={bookingContext?.checkOut ?? ""}
              nights={bookingContext?.nights ?? 1}
              roomsCount={bookingContext?.rooms ?? 1}
              adults={bookingContext?.adults ?? 1}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HotelDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginBlockStart: 0,
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 24,
    justifyContent: "center",
  },
});
