import * as React from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Button mode="contained" onPress={() => alert("Hello!")}>
          Press me
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
