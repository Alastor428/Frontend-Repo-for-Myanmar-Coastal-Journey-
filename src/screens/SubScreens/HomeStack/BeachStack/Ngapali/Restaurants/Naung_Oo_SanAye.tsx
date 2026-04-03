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

const Naung_Oo_SanAye: React.FC<{ navigation?: any }> = ({ navigation }) => {
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
      title: "San Yate Aye",
      time: "8 AM - 10 PM",
      phone: "0999173082",
      location: "Naung Oo Phee",
      map: "https://www.google.com/maps/place/San+Yate+Aye+Restaurant/@9.9997963,98.5572768,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDGwYSRNw!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHVAweojmSXn4p3qqfGCZDTmZgZV6TxOZB6dkG5tI758RGyCaonko7Wb55Vi7-v3TfXmVB4kyQJetc7WT_Up59EMTAIQNoeIo1r5w6T0M-NDTuLOxr1o1Wvx16iRCUFgyaUmzbGo4CE%3Dw203-h114-k-no!7i1920!8i1080!4m19!1m8!2m7!1sRestaurants+near+naung+oo+phee!3m5!2sVictoria+Cliff+Resort+-+Nyaung+Oo+Phee+Island!3s0x305792261559450f:0x1f461d29b99d1074!4m2!1d97.9830703!2d10.0761461!3m9!1s0x30564def9132f0d1:0x9f6e712cf814a4ad!8m2!3d9.9997963!4d98.5572768!10e5!14m1!1BCgIYIg!15sCh5SZXN0YXVyYW50cyBuZWFyIG5hdW5nIG9vIHBoZWVaICIecmVzdGF1cmFudHMgbmVhciBuYXVuZyBvbyBwaGVlkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F11fj4ynnd4?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    },
  ];
  const topimage = [
    {
      id: 1,
      image: require("../../../../../../../assets/Naung Oo Phee/San Yate Aye Restruant/1.jpg"),
    },
  ];

  const Menu = [
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
  
  ];

  const photo = [
    {
      id: 1,
      image: require("../../../../../../../assets/Naung Oo Phee/San Yate Aye Restruant/2.jpg"),
    },
    {
      id: 2,
      image: require("../../../../../../../assets/Naung Oo Phee/San Yate Aye Restruant/3.jpg"),
    },
    {
      id: 3,
      image: require("../../../../../../../assets/Naung Oo Phee/San Yate Aye Restruant/4.jpg"),
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

export default Naung_Oo_SanAye;
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
