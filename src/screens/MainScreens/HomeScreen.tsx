import React,{useState} from "react";
import { ScrollView, StyleSheet,View } from "react-native";
import HomeButton4 from "@/components/HomeButton4";
import Search from "@/components/Search";
import Discount from "@/components/AdvertisementComponent/Discount";
import Trending from "@/components/BeachComponent/Trending";
import Filter from "@/components/BeachComponent/Filter";
import BeachGrid from "@/components/BeachComponent/BeachGrid";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <ScrollView
      style={styles.container}
      // contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
      colors={["#EAC9B8", "#79D7D4"]} // peach → teal
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.upperSettion}
    >
      <View style={{ paddingHorizontal: 32, paddingTop: 80 }}>
        <HomeButton4 />
      </View>
      </LinearGradient>
      <View style={{ paddingHorizontal: 32, paddingBottom: 32, marginTop: -28 }}>
        <Search
        value={searchText}
        onChangeText={setSearchText}
        />
        <Discount />
      <Trending />
      <Filter />
      <BeachGrid />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 32,
    paddingBottom: 24,
  },
  upperSettion: {
    flex:1,
    // justifyContent: "space-between",
    height: 192,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,

  },
});
