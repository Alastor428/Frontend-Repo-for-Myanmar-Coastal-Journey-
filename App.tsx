import * as React from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import OceanPearl from "./src/screens/SubScreens/HomeStack/BeachStack/Ngapali/Restruants/OceanPearl";
import Ngapali1Screen from "./src/screens/SubScreens/HomeStack/BeachStack/Ngapali/Ngapali1";
import BusTicket1 from "./src/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTIcketSearch/BusTicket1";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <BusTicket1 />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
