import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BeachComponent from "./BeachComponent";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 32 * 2;
const GAP = 12;
const CARD_WIDTH = (width - HORIZONTAL_PADDING - GAP) / 2;

const NGAPALI_IMAGE = require("../../../assets/Ngapali/i-would-say-the-best.png");

const BeachGrid: React.FC = () => {
  const navigation = useNavigation<any>();

  const beaches = [
    { id: 1, title: "Ngapali", image: NGAPALI_IMAGE },
    { id: 2, title: "Ngapali", image: NGAPALI_IMAGE },
    { id: 3, title: "Ngapali", image: NGAPALI_IMAGE },
    { id: 4, title: "Ngapali", image: NGAPALI_IMAGE },
  ];

  return (
    <View style={styles.grid}>
      {beaches.map((beach) => (
        <View key={beach.id} style={styles.gridItem}>
          <BeachComponent
            imageUrl={beach.image}
            title={beach.title}
            width={CARD_WIDTH}
            height={168}
            onPress={() => {
              if (beach.title === "Ngapali") navigation.navigate("Ngapali1");
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default BeachGrid;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    gap: GAP,
  },
  gridItem: {
    width: CARD_WIDTH,
  },
});
