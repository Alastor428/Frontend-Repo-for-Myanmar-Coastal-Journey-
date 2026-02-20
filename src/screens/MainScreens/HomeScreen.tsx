import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import HomeButton4 from "@/components/HomeButton4";
import Search from "@/components/Search";
import Discount from "@/components/AdvertisementComponent/Discount";
import Trending from "@/components/BeachComponent/Trending";
import Filter from "@/components/BeachComponent/Filter";
import BeachGrid from "@/components/BeachComponent/BeachGrid";

const HomeScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <HomeButton4 />
      <Search />
      <Discount />
      <Trending />
      <Filter />
      <BeachGrid />
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
});
