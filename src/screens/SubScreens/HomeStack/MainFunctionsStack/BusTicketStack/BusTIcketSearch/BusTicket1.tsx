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
import TicketTypeComponent from "../../../../../../components/BusTicketComponent/TicketTypeComponent";
import PassengerComponent from "../../../../../../components/BusTicketComponent/PassengerTypeComponent";
import SearchComponent from "../../../../../../components/BusTicketComponent/SearchButton";

const { width } = Dimensions.get("window");
const BusTicket1: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState<Date | undefined>();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation?.goBack?.()}
          style={{ margin: 0, padding: 0 }}
        />
        <Text style={styles.headerText}>Bus Tickets</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../../../../../../assets/Other/image.png")}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.desContainer}>
        <View style={styles.sourceDest}>
          <SourceComponent />
          <View style={styles.destSpacer}>
            <DestinationComponent />
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
          label="Adult"
          value={passengers}
          onChange={setPassengers}
          min={1}
          max={20}
        />
      </View>
      <View style={styles.type}>
        <TicketTypeComponent />
        <PassengerComponent />
      </View>
      <View style={styles.button}>
        <SearchComponent
          onPress={() => navigation?.navigate("BusTicketSearchResult")}
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
    paddingTop: 40,
    paddingLeft: 16,
    width: "100%",
    alignSelf: "flex-start",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 60,
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
