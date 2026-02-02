import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking, 
  Text,
  TouchableOpacity,
  Animated
} from "react-native";
import { IconButton, Button, Surface } from "react-native-paper";
import RestruantDataComponent from "../../../../../../components/RestruantComponent/RestruantData";
import RestruantPhotoComponent from "../../../../../../components/RestruantComponent/ResPhoto";
import TopImageComponent from "../../../../../../components/RestruantComponent/TopImage";
import MenuComponent from "../../../../../../components/RestruantComponent/Menu";

const { width } = Dimensions.get("window");

const OceanPearl: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<"first" | "second">("first");
  
  const handleBookmarkPress = () => {
    setBookmarked(!bookmarked);
  };
  const tabAnim = useRef(new Animated.Value(0)).current;

  const switchTab = (tab: "first" | "second") => {
    setActiveTab(tab);
    Animated.timing(tabAnim, {
      toValue: tab === "first" ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const data = [
    {
      id: 1,
      title: "Ocean Pearl",
      time: "8 AM - 10 PM",
      phone: "0942173082",
      location: "Ngapali",
      map: "https://maps.app.goo.gl/gXw9DiYjsUFUZj4k9",
    },
  ];
const topimage = [
  {
    id: 1,
    image: require("../../../../../../../assets/Ngapali/OceanPearlRestruant/ocean-pearl-1.png"),
  },
];

const Menu=[
  {
    id: 1,
    menu: "Prown Curry",
    prise: "4000ks",
  },
  {
    id: 2,
    menu: "Tiger Prawn Curry",
    prise: "6000ks",
  },
  {
    id: 3,
    menu: "Squid Curry",
    prise: "4000ks",
  },
  {
    id: 4,
    menu: "Chicken Curry",
    prise: "5000ks",
  },
    {
    id: 5,
    menu: "Pork Curry",
    prise: "5000ks",
  },
  {
    id: 6,
    menu: "Vegetable Curry",
    prise: "3000ks",
  },
  {
    id: 7,
    menu: "Fish Curry",
    prise: "4000ks",
  },
  {
    id: 8,
    menu: "Fisherman Curry(Traditional Style)",
    prise: "8000ks",
  },
  {
    id: 9,
    menu: "Chicken with Ground",
    prise: "5000ks",
  },
  {
    id: 10,
    menu: "Crab with Masala Curry",
    prise: "5000ks",
  },
  {
    id: 11,
    menu: "Lobster",
    prise: "25000ks",
  },
  {
    id: 12,
    menu: "Fisherman Mixed Grill",
    prise: "8000ks",
  },
    {
    id: 13,
    menu: "King Prawn",
    prise: "6000ks",
  },
  {
    id: 14,
    menu: "Small Prawn",
    prise: "4000ks",
  },
  {
    id: 15,
    menu: "Crab",
    prise: "5000ks",
  },
  {
    id: 16,
    menu: "Squid",
    prise: "4000ks",
  },
];

const photo=[
  {
    id:1,
    image: require("../../../../../../../assets/Ngapali/OceanPearlRestruant/4.png")
  },
  {
    id:2,
    image: require("../../../../../../../assets/Ngapali/OceanPearlRestruant/5.png")
  },
  {
    id:3,
    image: require("../../../../../../../assets/Ngapali/OceanPearlRestruant/7.png")
  },
  {
    id:4,
    image: require("../../../../../../../assets/Ngapali/OceanPearlRestruant/65.png")
  },
  {
    id:5,
    image: require("../../../../../../../assets/Ngapali/OceanPearlRestruant/1.png")
  },
  {
    id:6,
    image: require("../../../../../../../assets/Ngapali/OceanPearlRestruant/2.png")
  },
];

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <View  style={styles.header}>
            <IconButton
              icon="chevron-left"   
              size={32}
              onPress={() => {
              Linking.openURL("myapp://BusTicketHome");
              }}
              style={{ margin: 0, padding: 0 }} 
            />  
            <IconButton
              icon={bookmarked ? "bookmark" : "bookmark-outline"}
              size={32}
              iconColor={bookmarked ? "#FFD700" : "#000"}
              style={{ 
                marginLeft: 232,
                marginTop: 4,
              }}
              onPress={handleBookmarkPress}
            />
      </View>
      <View style={styles.topimage}>
        {topimage.map((item) => (
          <TopImageComponent
            key={item.id}
            imageUrl={item.image}
          />
        ))}

      </View>
      <View style={styles.data}>
        {data.map((item) => (
          <RestruantDataComponent
            key={item.id}
            title={item.title}
            time={item.time}
            phone={item.phone}
            location={item.location}
            map={item.map}
          />
        ))}
      </View>
      <View style={styles.tabbar}>
        <Surface style={styles.tabContainer} elevation={0}>
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [
                  {
                    translateX: tabAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, (width - 64) / 2], 
                    }),
                  },
                ],
              },
            ]}
          />

          <Button
            mode="text"
            onPress={() => switchTab("first")}
            style={styles.tabButton}
            labelStyle={{
              color: activeTab === "first" ? "#fff" : "#000",
              fontFamily: "Poppin",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Menu
          </Button>

          <Button
            mode="text"
            onPress={() => switchTab("second")}
            style={styles.tabButton}
            labelStyle={{
              color: activeTab === "second" ? "#fff" : "#000",
              fontFamily: "Poppin",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Photo
          </Button>
        </Surface>
      </View>
      <View style={styles.content}>
        {activeTab === "first" ? (
          <View >
            {Menu.map((Menu) => (
            <MenuComponent
              key={Menu.id}
              menu={Menu.menu}
              prise={Menu.prise}
            />
          ))}
          </View>
        ) : (
          <View style={styles.grid}>
            {photo.map((item) => (
              <View key={item.id} style={styles.gridItem}>
                <RestruantPhotoComponent
                  imageUrl={item.image}
                />
                </View>
              ))}
          </View>
        )}
      </View>
      <View>
        
      </View>
    </ScrollView>
  );
};

export default OceanPearl;
const GAP = 12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  data:{
    paddingHorizontal:46,
    marginTop: -44,
  },
  header: {
    flexDirection: "row",
    paddingTop: 60,
    paddingHorizontal: 32, 
  },
  topimage: {
    paddingHorizontal: 32,
    paddingTop: 10,
  },
  tabbar:{
    paddingVertical:16,
    paddingHorizontal:32,
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 8,
    height: 36,
    overflow: "hidden",
    position: "relative",
  },
  indicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: (width - 64) / 2, 
    backgroundColor: "#1cb5b0",
    borderRadius: 8,
  },
  tabButton: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal:32,
    paddingBottom:32,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginHorizontal: -GAP / 2,
  },
  gridItem: {
    width: "28%",   
    height: 104,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: GAP / 2,
  },
});
