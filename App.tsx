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
import BeachPackageCard from "./src/screens/SubScreens/TravelPackageStack/Travelpackage_card";
import BeachPackageScreen from "./src/screens/SubScreens/TravelPackageStack/BeachTravelPackageScreen";
import PackageIncludesScreen from "./src/screens/SubScreens/TravelPackageStack/Package_includesScreen";
import BookPackageScreen from "./src/screens/SubScreens/TravelPackageStack/TravelpackagePaymentScreen";
import TravelpackagePaymentchooseScreen from "./src/screens/SubScreens/TravelPackageStack/TravelpackagePaymentchooseScreen";
import TravelPackagesdirectionScreen from "./src/screens/SubScreens/TravelPackageStack/TravelPackage_directionScreeen";


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
  // <BusTicketSeatSelectionScreen/>
//  <BeachPackageScreen/> 
// {/* <PackageIncludesScreen/> */}
//  <BookPackageScreen/> 
// {/* <TravelpackagePaymentchooseScreen/> */}
// {/* <TravelPackagesdirectionScreen/> */}
<TravelPackagesdirectionScreen/>


  
  
  );

};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
