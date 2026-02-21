import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import BusTicket1 from "../screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTIcketSearch/BusTicket1";
import BusTicketSearchResultScreen from "../screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketSearchResult/BusTicketSearchResultScreen";
import BusTicketSeatSelectionScreen from "../screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketSeatSelection/BusTicketSeatSelectionScreen";
import Ngapali1Screen from "../screens/SubScreens/HomeStack/BeachStack/Ngapali/Ngapali1";
import OceanPearl from "../screens/SubScreens/HomeStack/BeachStack/Ngapali/Restaurants/OceanPearl";
import EditDateOfBirthScreen from "@/screens/SubScreens/SettingStack/EditDateOfBirthScreen";
import EditGenderScreen from "@/screens/SubScreens/SettingStack/EditGenderScreen";
import EditProfileScreen from "@/screens/SubScreens/SettingStack/EditProfileScreen";
import EditNameScreen from "@/screens/SubScreens/SettingStack/EditNameScreen";
import AccountSecurityScreen from "@/screens/SubScreens/SettingStack/AccountSecurityScreen";
import OldPasswordScreen from "@/screens/SubScreens/SettingStack/OldPasswordScreen";
import ChangePasswordScreen from "@/screens/SubScreens/SettingStack/ChangePasswordScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      id="RootStack"
      screenOptions={{ headerShown: false }}
      initialRouteName="MainTabs"
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="BusTicket" component={BusTicket1} />
      <Stack.Screen
        name="BusTicketSearchResult"
        component={BusTicketSearchResultScreen}
      />
      <Stack.Screen
        name="BusTicketSeatSelection"
        component={BusTicketSeatSelectionScreen}
      />
      <Stack.Screen name="Ngapali1" component={Ngapali1Screen} />
      <Stack.Screen name="OceanPearl" component={OceanPearl} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="EditDateOfBirthScreen" component={EditDateOfBirthScreen} />
      <Stack.Screen name="EditGenderScreen" component={EditGenderScreen} />
      <Stack.Screen name="EditNameScreen" component={EditNameScreen} />
      <Stack.Screen name="AccountSecurityScreen" component={AccountSecurityScreen} />
      <Stack.Screen name="OldPasswordScreen" component={OldPasswordScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
