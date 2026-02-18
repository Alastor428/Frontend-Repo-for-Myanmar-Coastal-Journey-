import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/BusTicketStack/BusTicketPayment_rootnav";
import { enableScreens } from "react-native-screens";
import BusTicketSearchResultScreen from "./src/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketSearchResult/BusTicketSearchResultScreen";

import BusTicketFinalPaymentScreen from "./src/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketFinalPayment/BusTicketFinalPaymentScreen";
import BusTicketSuccessReceiptScreen from "./src/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketFinalPayment/BusTicketSuccessReceiptScreen";
import BusTicketSeatSelectionScreen from "./src/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketSeatSelection/BusTicketSeatSelectionScreen";
import BeachPackageCard from "./src/components/Ngapali/Choosing_package_card";

enableScreens();

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    // <PaperProvider>
    //   <View style={styles.container}>
    //     <NavigationContainer>
    //       <RootNavigator />
    //     </NavigationContainer>
    //   </View>
    // </PaperProvider>
  //  <BusTicketFinalPaymentScreen/>
  //  <BusTicketSuccessReceiptScreen/>
  //  <BusTicketFinalPaymentScreen/>
  // <BusTicketSearchResultScreen/>
  <BusTicketSeatSelectionScreen/>



 
  
  );

};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
