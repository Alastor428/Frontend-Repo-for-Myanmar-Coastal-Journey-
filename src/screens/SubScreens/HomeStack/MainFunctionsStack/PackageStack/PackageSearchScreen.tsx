import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Alert,
  Image,
} from "react-native";
import { IconButton } from "react-native-paper";
import SourceComponent from "../../../../../components/BusTicketComponent/SourceComponent";
import DestinationComponent from "../../../../../components/BusTicketComponent/DestinationComponent";
import DateComponent from "../../../../../components/BusTicketComponent/DateComponent";
// import PeopleCountComponent from "../../../../../components/BusTicketComponent/No.ofPeopleComponent";
// import TicketTypeComponent from "../../../../../components/BusTicketComponent/TicketTypeComponent";
// import PassengerComponent from "../../../../../components/BusTicketComponent/PassengerTypeComponent";
import SearchComponent from "../../../../../components/BusTicketComponent/SearchButton";
import PackageResultScreen from "./PackageResultScreen";

const { width } = Dimensions.get("window");
const PackageSearchScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [travelDate, setTravelDate] = useState<Date | undefined>();
  const [fromCity, setFromCity] = useState<string | null>(null);
  const [toBeach, setToBeach] = useState<string | null>(null);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation?.goBack?.()}
          style={{ margin: 0, padding: 0 }}
        />
        <Text style={styles.headerText}>Travel Packages</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../../../../../assets/Other/Package.png")}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.desContainer}>
        <View style={styles.sourceDest}>
          <SourceComponent value={fromCity} onChange={setFromCity} />
          <View style={styles.destSpacer}>
            <DestinationComponent value={toBeach} onChange={setToBeach} />
          </View>
        </View>
        <View style={styles.swapIcon}>
          <Image
            source={require("../../../../../../assets/Other/icon.png")}
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

      <View style={styles.button}>
        <SearchComponent
          onPress={() => {
            if (!fromCity || !toBeach || !travelDate) {
              Alert.alert(
                "Missing information",
                "Please choose source, destination, and depart date."
              );
              return;
            }
            navigation?.navigate("PackageResultScreen", {
              from: fromCity,
              to: toBeach,
              departOnDate: travelDate.toISOString(),
            });
          }}
        />
      </View>
    </ScrollView>
  );
};

export default PackageSearchScreen;
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
