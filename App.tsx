import * as React from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import OceanPearl from "./src/screens/Ngapali/Restruants/OceanPearl";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <OceanPearl />
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
