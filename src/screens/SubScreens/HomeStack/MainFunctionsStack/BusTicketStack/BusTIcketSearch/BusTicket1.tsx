import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  Linking,
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
const BusTicket1: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState<Date | undefined>();
    return (
    <ScrollView style={styles.container}>
        <View  style={styles.header}>
            <IconButton
                icon="chevron-left"   
                size={32}
                onPress={() => {
                Linking.openURL("myapp://BusTicketHome");
                }}
                style={{ margin: 0, padding: 0 }} 
            />  
            <Text style={styles.headerText}>Bus Tickets</Text>
        </View>
        <View>
            <Image
                source={require("../../../../../../../assets/Other/image.png")}
                style={{ 
                    width: 328,
                    height: 158,
                    marginLeft: 32,
                    marginTop: 12,
                    borderColor: "#1CB5B0",
                    borderWidth: 1,
                    borderRadius:4,
                 }}
                resizeMode="cover"
            />  
        </View>
        <View style={styles.desContainer}>
            <View>
                <View style={{ marginLeft: 32, marginTop: 4 }}>
                    <SourceComponent />
                </View>
                <View style={{ marginLeft: 32, marginTop: 16 }}>
                    <DestinationComponent />
                </View>
            </View>
            <View>
                <Image
                    source={require("../../../../../../../assets/Other/icon.png")}
                style={{ 
                    marginLeft: 8,
                    marginTop: 24,
                 }}
                 />
            </View>
        </View>
        <View style={styles.date}>
            <DateComponent
              label="Depart on"
              value={travelDate}
              onConfirm={setTravelDate}
            />
        </View>
        <View style={styles.date}>
          <PeopleCountComponent
            label="Adult"
            value={passengers}
            onChange={setPassengers}
            min={1}
            max={20}
          />
        </View>
        <View style={styles.type}>
          <View>
            <TicketTypeComponent/>
          </View>
          <View style={styles.passenger}>
            <PassengerComponent/>
          </View>
        </View>
        <View style={styles.button}>
          <SearchComponent 
          onPress={() => {
          console.log("Search button pressed");}}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingLeft: 32, 
    justifyContent: "flex-start", 
    width: "100%",
  },
    headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 60,
    fontFamily: "Poppins",
  },
  desContainer:{
    flexDirection: "row"
  },
  date: {
    paddingHorizontal: 32,
    marginTop: 8,
  },
  type:{
    flexDirection: "row",
    paddingHorizontal: 32,
  },
  passenger:{
    marginLeft: 8,
  },
  button:{
    marginLeft:32,
    paddingTop: 32,
  }
}); 