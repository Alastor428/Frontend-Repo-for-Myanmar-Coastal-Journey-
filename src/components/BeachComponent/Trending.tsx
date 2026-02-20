import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import TrendingComponent from "./TrendingComponent";

interface TrendingProps {}
const { width } = Dimensions.get("window");
const CARD_WIDTH = 208 + 8;

const Trending: React.FC<TrendingProps> = () => {
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBeachPress = (title: string) => {
    if (title === "Ngapali") {
      navigation.navigate("Ngapali1");
    }
  };

  const beaches = [
    {
      id: 1,
      image: require("../../../assets/Ngapali/i-would-say-the-best.png"),
      title: "Ngapali",
    },
    {
      id: 2,
      image: require("../../../assets/NgweSaung/NS.png"),
      title: "Ngwe Saung",
    },
    {
      id: 3,
      title: "Chaung Tha",
      image: require("../../../assets/ChaungThar/CT.png"),
    },
  ];
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.heading}>Trending</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH}
        snapToAlignment="start"
      >
        {beaches.map((beach) => (
          <TrendingComponent
            key={beach.id}
            imageUrl={beach.image}
            title={beach.title}
            onPress={() => handleBeachPress(beach.title)}
          />
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {beaches.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default Trending;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    width: "100%",
    height: 276,
  },
  header: {
    marginBottom: 16,
    flexDirection: "row",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  scrollContainer: {
    paddingRight: 16,
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#d9d9d9",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 20,
    backgroundColor: "#79D7D4",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
