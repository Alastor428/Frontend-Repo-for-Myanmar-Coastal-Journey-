import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BusTicketPayment_pre_screen from "../../screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketPayment/BusTicketPayment_pre_screen";
import TicketPayment_screen from "../../screens/SubScreens/HomeStack/MainFunctionsStack/BusTicketStack/BusTicketPayment/BusTicketPaymentScreen";





/* ===== Navigation Types ===== */

export type RootStackParamList = {
  Home: undefined;

  TicketConfirm: {
    busType: string;
    travelDate: string;
    departureTime: string;
    adult: number;
    price: number;
    promotion: number;
    totalPrice: number;
    boardingPoint: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={BusTicketPayment_pre_screen} />

      <Stack.Screen
        name="TicketConfirm"
        component={TicketPayment_screen}
        options={{ title: "Mandalay to Ngapali" }}
      />
    </Stack.Navigator>
  );
}
