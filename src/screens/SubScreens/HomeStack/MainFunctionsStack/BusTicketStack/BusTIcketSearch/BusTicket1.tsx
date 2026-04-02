import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { IconButton } from "react-native-paper";
import SourceComponent from "../../../../../../components/BusTicketComponent/SourceComponent";
import DestinationComponent from "../../../../../../components/BusTicketComponent/DestinationComponent";
import DateComponent from "../../../../../../components/BusTicketComponent/DateComponent";
import PeopleCountComponent from "../../../../../../components/BusTicketComponent/No.ofPeopleComponent";
import PassengerComponent from "../../../../../../components/BusTicketComponent/PassengerTypeComponent";
import SearchComponent from "../../../../../../components/BusTicketComponent/SearchButton";

const { width } = Dimensions.get("window");

function formatLocalYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const BusTicket1: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState<Date | undefined>();
  const [source, setSource] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation?.goBack?.()}
          style={{ margin: 0, padding: 0 }}
        />
        <Text style={styles.headerText}>Travel Tickets</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../../../../../../assets/Other/TravelTicket.png")}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.desContainer}>
        <View style={styles.sourceDest}>
          <SourceComponent value={source} onChange={setSource} />
          <View style={styles.destSpacer}>
            <DestinationComponent
              value={destination}
              onChange={setDestination}
            />
          </View>
        </View>
        <View style={styles.swapIcon}>
          <Image
            source={require("../../../../../../../assets/Other/icon.png")}
            style={styles.swapImage}
          />
        </View>
      </View>
      <View style={styles.formSection}>
        <DateComponent
          label="Depart on"
          value={travelDate}
          onConfirm={setTravelDate}
        />
      </View>
      <View style={styles.formSection}>
        <PeopleCountComponent
          label="No. of Passengers"
          value={passengers}
          onChange={setPassengers}
          min={1}
          max={20}
        />
      </View>
      {/* <PassengerComponent /> */}
      <View style={styles.button}>
        <SearchComponent
          onPress={() =>
            navigation?.navigate("BusTicketSearchResult", {
              source,
              destination,
              travelDate: travelDate ? formatLocalYmd(travelDate) : undefined,
            })
          }
        />
      </View>
    </ScrollView>
  );
};

export default BusTicket1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 32,
    width: "100%",
    alignSelf: "flex-start",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Poppins",
  },
  imageWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },
  bannerImage: {
    width: 328,
    height: 158,
    borderColor: "#1CB5B0",
    borderWidth: 1,
    borderRadius: 4,
  },
  desContainer: {
    flexDirection: "row",
    width: 328,
    alignItems: "flex-start",
    marginTop: 4,
  },
  sourceDest: {
    flex: 1,
    marginTop: 4,
  },
  destSpacer: {
    marginTop: 16,
  },
  swapIcon: {
    marginTop: 24,
    marginLeft: 8,
  },
  swapImage: {
    width: 20,
    height: 104,
    // marginTop: 44,
  },
  formSection: {
    width: 328,
    marginTop: 8,
  },
  type: {
    flexDirection: "row",
    width: 328,
    marginTop: 8,
    gap: 8,
  },
  button: {
    width: 328,
    marginTop: 32,
  },
});
