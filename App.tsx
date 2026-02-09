import * as React from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import WelcomeScreen from "./src/auth/Login1";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <WelcomeScreen/> 
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
