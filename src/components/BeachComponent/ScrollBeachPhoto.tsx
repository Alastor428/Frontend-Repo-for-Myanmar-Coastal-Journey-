import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import BeachScreenPhoto from "./BeachScreenPhoto";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 328 + 8;

const ScrollBeachPhoto: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const beachPhotos = [
    {
      id: 1,
      image: require("../../../assets/Ngapali/ngapali-beach-photo1.png"),
    },
    {
      id: 2,
      image: require("../../../assets/NgweSaung/ngwe-saung-beach-photo1.png"),
    },
    {
      id: 3,
      image: require("../../../assets/ChaungThar/chaung-thar-beach-photo1.png"),
    },
  ];

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / CARD_WIDTH
    );
    setActiveIndex(index);
  };

  return (
    <View style={styles.wrapper}>
      {/* Horizontal Scroll */}
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
        {beachPhotos.map((photo) => (
          <BeachScreenPhoto
            key={photo.id}
            imageUrl={photo.image}
          />
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {beachPhotos.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ScrollBeachPhoto;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    width: "100%",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
});
