import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ImageSourcePropType,
} from "react-native";
import { IconButton } from "react-native-paper";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import HotelComponent from "@/components/HotelBookingComponent/HotelComponent";
import {
  listHotelsByBeachName,
  type HotelDto,
  beachNameFromHotel,
} from "@/api/hotelApi";

const PLACEHOLDER: ImageSourcePropType = require("../../../../../../assets/Ngapali/Hotels/hotel_photo.jpg");

const HotelResultScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const beachName = route.params?.beachName as string | undefined;
  const checkIn = route.params?.checkIn as string | undefined;
  const checkOut = route.params?.checkOut as string | undefined;
  const rooms = Number(route.params?.rooms ?? 1) || 1;
  const adults = Number(route.params?.adults ?? 1) || 1;
  const nights = Number(route.params?.nights ?? 1) || 1;

  const [hotels, setHotels] = useState<HotelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!beachName?.trim()) {
      setHotels([]);
      setHint("No beach selected.");
      setLoading(false);
      return;
    }
    setHint(null);
    setLoading(true);
    try {
      const res = await listHotelsByBeachName(beachName.trim(), { limit: 50 });
      setHotels(res.data ?? []);
      if (!res.data?.length) {
        setHint(
          `No hotels found for "${beachName}". Run the backend seed if the database is empty.`
        );
      }
    } catch (e) {
      setHotels([]);
      setHint(e instanceof Error ? e.message : "Could not load hotels.");
    } finally {
      setLoading(false);
    }
  }, [beachName]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  const bookingContext = {
    beachName: beachName ?? "",
    checkIn: checkIn ?? "",
    checkOut: checkOut ?? "",
    rooms,
    adults,
    nights,
  };

  return (
    <View style={styles.container}>
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
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: "auto",
              marginRight: "auto",
              color: "#000",
            }}
          >
            Hotel Results
          </Text>
        </View>
        {beachName ? (
          <Text style={styles.sub}>{beachName}</Text>
        ) : null}
      </View>

      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 24 }}
          size="large"
          color="#1CB5B0"
        />
      ) : null}
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}

      <FlatList
        data={hotels}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 80 }}
        renderItem={({ item }) => {
          const from =
            item.minRoomPrice != null
              ? `${Math.round(item.minRoomPrice).toLocaleString()} Ks / night`
              : "See rooms";
          return (
            <HotelComponent
              hotelId={item._id}
              imageUrl={PLACEHOLDER}
              title={item.hotelName}
              rating={String(item.hotelRating ?? "—")}
              price={from}
              mapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${beachNameFromHotel(item)} ${item.hotelName}`
              )}`}
              bookingContext={bookingContext}
            />
          );
        }}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>
              No listings to show. Pick a beach on the previous screen.
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default HotelResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBlockStart: 0,
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  sub: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  hint: {
    textAlign: "center",
    paddingHorizontal: 24,
    color: "#666",
    marginBottom: 8,
  },
  empty: {
    textAlign: "center",
    marginTop: 32,
    color: "#999",
    paddingHorizontal: 24,
  },
});
