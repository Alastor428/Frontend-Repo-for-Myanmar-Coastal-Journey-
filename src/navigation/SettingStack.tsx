import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "@/screens/MainScreens/SettingScreen";
import AccountSecurityScreen from "@/screens/SubScreens/SettingStack/AccountSecurityScreen";
import EditProfileScreen from "@/screens/SubScreens/SettingStack/EditProfileScreen";

const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator
      id="SettingStack"
      screenOptions={{ headerShown: false }}
      initialRouteName="SettingMain"
    >
      <Stack.Screen name="SettingMain" component={SettingScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="AccountSecurityScreen" component={AccountSecurityScreen} />
    </Stack.Navigator>
  );
}
