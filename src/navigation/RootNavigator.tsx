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
import FlightTicketSeatSelectionScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/FlightTicketSeat/FlightTicketSeatSelectionScreen";
import BusTicketPayment_pre_screen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketPayment/BusTicketPayment_pre_screen";
import BusTicketPaymentScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketPayment/BusTicketPaymentScreen";
import BusTicketFinalPaymentScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketFinalPayment/BusTicketFinalPaymentScreen";
import BusTicketSuccessReceiptScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketFinalPayment/BusTicketSuccessReceiptScreen";
import TicketPayment_screen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketPayment/BusTicketPaymentScreen";
import FlightTicketPaymentScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/FlightTicketPayment/FlightTicketPaymentScreen";
import FlightTicketFinalPaymentScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/FlightTicketPayment/FlightTicketFinalPaymentScreen";
import FlightTicketSuccessReceiptScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/FlightTicketPayment/FlightTicketReceipScreen";
import HotelBookingSuccessScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/HotelBookingStack/HotelReceiptScreen";
import HotelFinalPaymentScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/HotelBookingStack/HotelFinalPaymentScreen";
import HotelPaymentScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/HotelBookingStack/HotelPaymentScreen";
import PackageBookingSuccessScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/PackageStack/PackageReceiptScreen";
import PackagePaymentScreen from "@/screens/SubScreens/HomeStack/MainFunctionsStack/PackageStack/PackagePaymentScreen";
import SelfRegistrationScreen from "@/screens/SubScreens/HomeStack/BeachStack/Ngapali/SelfRegistrationScreen";
import ChaungThaScreen from "@/screens/SubScreens/HomeStack/BeachStack/ChaungTha/ChaungThar";
import NgweSaungScreen from "@/screens/SubScreens/HomeStack/BeachStack/NgweSaung/Ngwesaung";
import ShweThaungYanScreen from "@/screens/SubScreens/HomeStack/BeachStack/ShweThaungYan/ShweThaungYanScreen";
import MaungmaganScreen from "@/screens/SubScreens/HomeStack/BeachStack/Beach/MaungmaganScree";
import GawyangyiScreen from "@/screens/SubScreens/HomeStack/BeachStack/Beach/GawyangyiScreen";
import GwaScreen from "@/screens/SubScreens/HomeStack/BeachStack/Beach/GwaScreen";
import PaNyitScreen from "@/screens/SubScreens/HomeStack/BeachStack/Beach/PaNyitScreen";
import KanthayaScreen from "@/screens/SubScreens/HomeStack/BeachStack/Beach/KanthayaScree";
import SetseScreen from "@/screens/SubScreens/HomeStack/BeachStack/Beach/SetseScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      id="RootStack"
      screenOptions={{ headerShown: false }}
      initialRouteName="MainTabs"
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      {/* Bus Ticket */}
      <Stack.Screen name="BusTicket" component={BusTicket1} />
      <Stack.Screen
        name="BusTicketSearchResult"
        component={BusTicketSearchResultScreen}
      />
      <Stack.Screen
        name="BusTicketSeatSelection"
        component={BusTicketSeatSelectionScreen}
      />
      <Stack.Screen
        name="BusTicketFinalPayment"
        component={BusTicketFinalPaymentScreen}
      />
      <Stack.Screen
        name="BusTicketSuccessReceipt"
        component={BusTicketSuccessReceiptScreen}
      />

      {/* Demo screen - deprecated */}
      <Stack.Screen
        name="BusTicketPayment_pre_screen"
        component={BusTicketPayment_pre_screen}
      />
      <Stack.Screen
        name="BusTicketPaymentScreen"
        component={TicketPayment_screen}
      />

      {/* Flight Ticket */}
      <Stack.Screen
        name="FlightTicketSeatSelection"
        component={FlightTicketSeatSelectionScreen}
      />
      <Stack.Screen
        name="FlightTicketPaymentScreen"
        component={FlightTicketPaymentScreen}
      />
      <Stack.Screen
        name="FlightTicketFinalPayment"
        component={FlightTicketFinalPaymentScreen}
      />
      <Stack.Screen
        name="FlightTicketSuccessReceipt"
        component={FlightTicketSuccessReceiptScreen}
      />

      {/* Beach */}
      <Stack.Screen name="Ngapali1" component={Ngapali1Screen} />
      <Stack.Screen name="OceanPearl" component={OceanPearl} />
      <Stack.Screen
        name="SelfRegistration"
        component={SelfRegistrationScreen}
      />
      <Stack.Screen name="ChaungTha" component={ChaungThaScreen} />
      <Stack.Screen name="NgweSaung" component={NgweSaungScreen} />
      <Stack.Screen name="ShweThaungYan" component={ShweThaungYanScreen} />
      <Stack.Screen name="Maungmagan" component={MaungmaganScreen} />
      <Stack.Screen name="Gawyangyi" component={GawyangyiScreen} />
      <Stack.Screen name="Gwa" component={GwaScreen} />
      <Stack.Screen name="PaNyit" component={PaNyitScreen} />
      <Stack.Screen name="KanThaYa" component={KanthayaScreen} />
      <Stack.Screen name="Setse" component={SetseScreen} />

      {/* Hotel */}
      <Stack.Screen
        name="HotelBookingSearchScreen"
        component={HotelBookingSearchScreen}
      />
      <Stack.Screen name="HotelResultScreen" component={HotelResultScreen} />
      <Stack.Screen name="HotelDetailScreen" component={HotelDetailScreen} />
      <Stack.Screen name="HotelPaymentScreen" component={HotelPaymentScreen} />
      <Stack.Screen
        name="HotelFinalPayment"
        component={HotelFinalPaymentScreen}
      />
      <Stack.Screen
        name="HotelBookingSuccess"
        component={HotelBookingSuccessScreen}
      />

      {/* Settings */}
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

      {/* Tour Guide */}
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

      {/* Package */}
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
      <Stack.Screen
        name="PackagePaymentScreen"
        component={PackagePaymentScreen}
      />
      <Stack.Screen
        name="PackageBookingSuccess"
        component={PackageBookingSuccessScreen}
      />
    </Stack.Navigator>
  );
}
