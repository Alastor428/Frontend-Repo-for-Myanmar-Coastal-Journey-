import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { IconButton, Button, Surface } from "react-native-paper";
import RestruantDataComponent from "../../../../../../components/RestruantComponent/RestruantData";
import RestruantPhotoComponent from "../../../../../../components/RestruantComponent/ResPhoto";
import TopImageComponent from "../../../../../../components/RestruantComponent/TopImage";
import MenuComponent from "../../../../../../components/RestruantComponent/Menu";

const { width } = Dimensions.get("window");

const Ngwe_Brizo: React.FC<{ navigation?: any }> = ({ navigation }) => {
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
      title: "Brizo",
      time: "8 AM - 10 PM",
      phone: "09424932909",
      location: "Ngwe Saung",
      map: "https://www.google.com/maps/dir//Brizo+Bar+and+Restaurant,+4360+Via+Marina,+Marina+Del+Rey,+CA+90292,+United+States/@21.9414528,96.0954368,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x80c2ba9e68d4dd97:0x5630d15e7938715b!2m2!1d-118.4571683!2d33.9748382?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D",
    },
  ];
  const topimage = [
    {
      id: 1,
      image: require("../../../../../../../assets/NgweSaung/Ngwe_Brizo_restaurant/29.jpg"),
    },
  ];

  const Menu = [
    {
      id: 1,
      menu: "Hanbarger",
      prise: "7000ks",
    },
    {
      id: 2,
      menu: "Chicken with Ground",
      prise: "5000ks",
    },
    {
      id: 3,
      menu: "Chicken Curry",
      prise: "5000ks",
    },
    {
      id: 4,
      menu: "Fish Curry",
      prise: "4000ks",
    },
    {
      id: 5,
      menu: "Crab with Masala Curry",
      prise: "5000ks",
    },
    {
      id: 6,
      menu: "Lobster",
      prise: "25000ks",
    },
 
  ];

  const photo = [
    {
      id: 1,
      image: require("../../../../../../../assets/NgweSaung/Ngwe_Brizo_restaurant/Menu/445.jpg"),
    },
    {
      id: 2,
      image: require("../../../../../../../assets/NgweSaung/Ngwe_Brizo_restaurant/Menu/1.jpg"),
    },
    {
      id: 3,
      image: require("../../../../../../../assets/NgweSaung/Ngwe_Brizo_restaurant/Menu/3.jpg"),
    },
    {
      id: 4,
      image: require("../../../../../../../assets/NgweSaung/Ngwe_Brizo_restaurant/Menu/4.jpg"),
    },
    {
      id: 5,
      image: require("../../../../../../../assets/NgweSaung/Ngwe_Brizo_restaurant/Menu/5.jpg"),
    },
    {
      id: 6,
      image: require("../../../../../../../assets/NgweSaung/Ngwe_Brizo_restaurant/Menu/15.jpg"),
    },
  ];

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation?.goBack?.()}
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
          <TopImageComponent key={item.id} imageUrl={item.image} />
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
          <View>
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
                <RestruantPhotoComponent imageUrl={item.image} />
              </View>
            ))}
          </View>
        )}
      </View>
      <View></View>
    </ScrollView>
  );
};

export default Ngwe_Brizo;
const GAP = 12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  data: {
    paddingHorizontal: 46,
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
  tabbar: {
    paddingVertical: 16,
    paddingHorizontal: 32,
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
    paddingHorizontal: 32,
    paddingBottom: 32,
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
