import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BeachComponent from "./BeachComponent";
import { el } from "react-native-paper-dates";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 32 * 2;
const GAP = 12;
const CARD_WIDTH = (width - HORIZONTAL_PADDING - GAP) / 2;

const NGAPALI_IMAGE = require("../../../assets/Ngapali/i-would-say-the-best.png");
const CHAUNGTHA_IMAGE = require("../../../assets/ChaungThar/CT.png");
const NGWE_SAUNG_IMAGE = require("../../../assets/NgweSaung/NS.png");
const SHWE_THAUNG_YAN_IMAGE = require("../../../assets/ShweTaungYan/STY.jpg");
const MAUNGMAGAN_IMAGE = require("../../../assets/MaungMaGan/MMG.jpg");
const GWA_IMAGE = require("../../../assets/Gwa/Gwa.jpg");
const KAN_THA_YA_IMAGE = require("../../../assets/KanThaYa/KTY.jpg");
const PA_NYIT_IMAGE = require("../../../assets/PaNyit/PN.jpg");
const SETSE_IMAGE = require("../../../assets/Setse/SE.jpg");
const GAWYANGYI_IMAGE = require("../../../assets/Gawyangyi/G1.jpg");
const NYAUNGOOPHEE_IMAGE = require("../../../assets/NyaungOoPhee/1.jpg");

const BeachGrid: React.FC = () => {
  const navigation = useNavigation<any>();

  const beaches = [
    { id: 1, title: "Ngapali", image: NGAPALI_IMAGE },
    { id: 2, title: "Chaung Tha", image: CHAUNGTHA_IMAGE },
    { id: 3, title: "Ngwe Saung", image: NGWE_SAUNG_IMAGE },
    { id: 4, title: "Shwe Thaung Yan", image: SHWE_THAUNG_YAN_IMAGE },
    { id:5, title: "Maungmagan", image: MAUNGMAGAN_IMAGE },
    { id:6, title: "Gwa", image: GWA_IMAGE },
    { id:7, title: "Kan Tha Ya", image: KAN_THA_YA_IMAGE },
    { id:8, title: "Pa Nyit", image: PA_NYIT_IMAGE },
    { id:9, title: "Setse", image: SETSE_IMAGE },
    { id:10, title: "Gawyangyi", image: GAWYANGYI_IMAGE },
    { id:11, title: "Nyaung Oo Phee", image: NYAUNGOOPHEE_IMAGE},
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
              else if (beach.title === "Chaung Tha") navigation.navigate("ChaungTha");
              else if (beach.title === "Ngwe Saung") navigation.navigate("NgweSaung");
              else if (beach.title === "Shwe Thaung Yan") navigation.navigate("ShweThaungYan");
              else if (beach.title === "Maungmagan") navigation.navigate("Maungmagan");
              else if (beach.title === "Gwa") navigation.navigate("Gwa");
              else if (beach.title === "Kan Tha Ya") navigation.navigate("KanThaYa");
              else if (beach.title === "Pa Nyit") navigation.navigate("PaNyit");
              else if (beach.title === "Setse") navigation.navigate("Setse");
              else if (beach.title === "Gawyangyi") navigation.navigate("Gawyangyi");
              else if (beach.title === "Nyaung Oo Phee") navigation.navigate("NyaungOoPhee");
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