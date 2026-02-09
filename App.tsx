import React from "react";
// import { Provider as PaperProvider, Button } from "react-native-paper";
// import { View, StyleSheet } from "react-native";
import TabNavigator from "./src/navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
