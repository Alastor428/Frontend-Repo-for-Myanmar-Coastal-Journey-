import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import BusTicket1 from "../screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTIcketSearch/BusTicket1";
import BusTicketSearchResultScreen from "../screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketSearchResult/BusTicketSearchResultScreen";
import BusTicketSeatSelectionScreen from "../screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketSeatSelection/BusTicketSeatSelectionScreen";
import Ngapali1Screen from "../screens/SubScreens/HomeStack/BeachStack/Ngapali/Ngapali1";
import OceanPearl from "../screens/SubScreens/HomeStack/BeachStack/Ngapali/Restaurants/OceanPearl";
import OurTeamScreen from "@/screens/SubScreens/SettingStack/OurTeamScreen";
import HotelBookingSearchScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/HotelBookingStack/HotelBookingSearchScreen";
import HotelResultScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/HotelBookingStack/HotelResultScreen";
import HotelDetailScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/HotelBookingStack/HotelDetailScreen";
import EditDateOfBirthScreen from "@/screens/SubScreens/SettingStack/EditDateOfBirthScreen";
import EditGenderScreen from "@/screens/SubScreens/SettingStack/EditGenderScreen";
import EditProfileScreen from "@/screens/SubScreens/SettingStack/EditProfileScreen";
import EditNameScreen from "@/screens/SubScreens/SettingStack/EditNameScreen";
import AccountSecurityScreen from "@/screens/SubScreens/SettingStack/AccountSecurityScreen";
import OldPasswordScreen from "@/screens/SubScreens/SettingStack/OldPasswordScreen";
import ChangePasswordScreen from "@/screens/SubScreens/SettingStack/ChangePasswordScreen";
import AboutUsScreen from "@/screens/SubScreens/SettingStack/AboutUsScreen";
import ReportAPloblemScreen from "@/screens/SubScreens/SettingStack/ReportAPloblemScreen";
import TourGuideSearchScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/TourGuideStack/TourGuideSearchScreen";
import TourGuideResultScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/TourGuideStack/TourGuideResultScreen";
import TourGuidePayment_screen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/TourGuideStack/TourGuidePaymentScreen";
import TourGuidePaymentComfirmScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/TourGuideStack/TourGuidePaymentComfirmScreen";
import TourGuidePaymentReceiptScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/TourGuideStack/TourGuidePaymentReceiptScreen";
import PackageSearchScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/PackageStack/PackageSearchScreen";
import PackageResultScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/PackageStack/PackageResultScreen";
import PackageDetailScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/PackageStack/PackageDetailScreen";
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
      <Stack.Screen
        name="HotelBookingSearchScreen"
        component={HotelBookingSearchScreen}
      />
      <Stack.Screen
        name="TourGuideSearchScreen"
        component={TourGuideSearchScreen}
      />
      <Stack.Screen
        name="TourGuideResultScreen"
        component={TourGuideResultScreen}
      />
      <Stack.Screen
        name="TourGuidePaymentScreen"
        component={TourGuidePayment_screen}
      />
      <Stack.Screen
        name="TourGuidePaymentComfirmScreen"
        component={TourGuidePaymentComfirmScreen}
      />
      <Stack.Screen
        name="TourGuidePaymentReceiptScreen"
        component={TourGuidePaymentReceiptScreen}
      />
      <Stack.Screen name="HotelResultScreen" component={HotelResultScreen} />
      <Stack.Screen name="HotelDetailScreen" component={HotelDetailScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen
        name="EditDateOfBirthScreen"
        component={EditDateOfBirthScreen}
      />
      <Stack.Screen name="EditGenderScreen" component={EditGenderScreen} />
      <Stack.Screen name="EditNameScreen" component={EditNameScreen} />
      <Stack.Screen
        name="AccountSecurityScreen"
        component={AccountSecurityScreen}
      />
      <Stack.Screen name="OldPasswordScreen" component={OldPasswordScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Stack.Screen name="OurTeamScreen" component={OurTeamScreen} />
      <Stack.Screen
        name="ReportAPloblemScreen"
        component={ReportAPloblemScreen}
      />
      <Stack.Screen
        name="PackageSearchScreen"
        component={PackageSearchScreen}
      />
      <Stack.Screen
        name="PackageResultScreen"
        component={PackageResultScreen}
      />
      <Stack.Screen
        name="PackageDetailScreen"
        component={PackageDetailScreen}
      />
    </Stack.Navigator>
  );
}
