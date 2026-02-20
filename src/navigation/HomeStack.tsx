import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/MainScreens/HomeScreen";
import BusTicket1 from "../screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTIcketSearch/BusTicket1";
import Ngapali1Screen from "../screens/SubScreens/HomeStack/BeachStack/Ngapali/Ngapali1";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      id="HomeStack"
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeMain"
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="BusTicket" component={BusTicket1} />
      <Stack.Screen name="Ngapali1" component={Ngapali1Screen} />
    </Stack.Navigator>
  );
}
