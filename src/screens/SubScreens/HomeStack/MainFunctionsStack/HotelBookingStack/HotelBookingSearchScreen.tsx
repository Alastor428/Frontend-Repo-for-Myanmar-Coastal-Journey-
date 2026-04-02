import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { IconButton } from "react-native-paper";
import SearchComponent from "@/components/BusTicketComponent/SearchButton";
import SetDateComponent from "@/components/HotelBookingComponent/SetDateComponent";
import RoomTypeComponent from "@/components/HotelBookingComponent/RoomTypeComponent";
import Trending from "@/components/BeachComponent/Trending";
import HotelBeachDropdown from "@/components/HotelBookingComponent/HotelBeachDropdown";
import { useNavigation } from "@react-navigation/native";

function nightsBetween(start: Date, end: Date): number {
  const d0 = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const d1 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.max(1, Math.round((d1 - d0) / 86400000));
}

const HotelBookingSearchScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [beachName, setBeachName] = useState<string | null>(null);
  const [rooms, setRooms] = useState<number>(1);
  const [adults, setAdults] = useState<number>(1);

  const handleSearch = () => {
    if (!startDate || !endDate || !beachName?.trim()) {
      Alert.alert("Missing information", "Please choose a beach and both dates.");
      return;
    }
    if (startDate >= endDate) {
      Alert.alert(
        "Invalid dates",
        "Check-out must be the day after check-in or later."
      );
      return;
    }
    const nights = nightsBetween(startDate, endDate);
    navigation?.navigate("HotelResultScreen", {
      beachName: beachName.trim(),
      checkIn: startDate.toISOString(),
      checkOut: endDate.toISOString(),
      rooms,
      adults,
      nights,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={require("../../../../../../assets/Ngapali/Hotels/hotel_photo.jpg")}
            style={{
              width: 393,
              height: 226,
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
            }}
          />
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
                Hotel Booking
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 32,
            justifyContent: "center",
            alignItems: "center",
            marginTop: -80,
          }}
        >
          <View
            style={{
              marginBottom: 24,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              backgroundColor: "#fff",
              marginTop: -20,
              paddingVertical: 16,
              width: "100%",
              maxWidth: 360,
            }}
          >
            <HotelBeachDropdown value={beachName} onChange={setBeachName} />
            <View style={{ paddingHorizontal: 8, flexDirection: "row" }}>
              <View style={{ width: "48%" }}>
                <Text style={{ fontSize: 12, marginHorizontal: 8 }}>
                  Check-in
                </Text>
                <SetDateComponent
                  value={startDate}
                  onConfirm={(date) => setStartDate(date)}
                />
              </View>
              <View style={{ width: "48%", marginLeft: "auto" }}>
                <Text style={{ fontSize: 12, marginHorizontal: 8 }}>
                  Check-out
                </Text>
                <SetDateComponent
                  value={endDate}
                  onConfirm={(date) => setEndDate(date)}
                />
              </View>
            </View>
            <View style={{ paddingHorizontal: 8 }}>
              <RoomTypeComponent
                rooms={rooms}
                adults={adults}
                onChangeRooms={setRooms}
                onChangeAdults={setAdults}
              />
            </View>
            <View style={{ paddingHorizontal: 8, flexDirection: "row" }}>
              <View
                style={{
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              >
                <IconButton
                  icon="map"
                  size={24}
                  iconColor="#1CB5B0"
                  style={{
                    marginTop: 0,
                    marginLeft: 0,
                  }}
                />
              </View>
              <View style={{ marginLeft: "auto", width: "85%" }}>
                <SearchComponent onPress={handleSearch} />
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 32 }}>
          <Trending />
        </View>
        <View style={{ width: "100%", paddingHorizontal: 32, marginTop: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Offers</Text>
          <Image
            source={require("../../../../../../assets/Ngapali/NP5.png")}
            style={{ width: 327, height: 168, borderRadius: 8, marginTop: 16 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HotelBookingSearchScreen;

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
    justifyContent: "center",
    position: "absolute",
  },
});
