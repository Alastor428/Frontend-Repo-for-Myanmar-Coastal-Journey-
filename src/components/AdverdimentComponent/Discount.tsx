import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
} from "react-native";
import DiscountComponent from "./DiscountComponent";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 328;
const OVERLAP = 24;
const SNAP_INTERVAL = CARD_WIDTH - OVERLAP;

const Discount = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  // ✅ Use ScrollView type here, not Animated.ScrollView
  const scrollRef = useRef<ScrollView | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const discounts = [
    {
      id: 1,
      image: require("../../../assets/Ngapali/i-would-say-the-best.png"),
      title: "Summer Special",
      description: "Get 20% off on all beach resorts this summer!",
    },
    {
      id: 2,
      image: require("../../../assets/NgweSaung/NS.png"),
      title: "Winter Deal",
      description: "Enjoy a cozy stay with 15% off this winter!",
    },
    {
      id: 3,
      image: require("../../../assets/ChaungThar/CT.png"),
      title: "Holiday Offer",
      description: "Book now and save 25% on holiday packages!",
    },
  ];

  const loopedDiscounts = [...discounts, ...discounts];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL) % discounts.length;
    setActiveIndex(index);

    // 🔁 Loop scroll
    const contentWidth = SNAP_INTERVAL * discounts.length;
    if (offsetX >= contentWidth) {
      // ✅ Use scrollRef.current as ScrollView
      scrollRef.current?.scrollTo({ x: offsetX - contentWidth, animated: false });
    }
  };
  useEffect(() => {
  const interval = setInterval(() => {
    const nextIndex =
      activeIndex === discounts.length - 1
        ? 0
        : activeIndex + 1;

    scrollRef.current?.scrollTo({
      x: nextIndex * SNAP_INTERVAL, // ✅ correct distance
      animated: true,
    });

    setActiveIndex(nextIndex);
  }, 2000); // ⏱ 2 seconds

  return () => clearInterval(interval); // ✅ cleanup
}, [activeIndex]);


  return (
    <View style={styles.wrapper}>
      <Animated.ScrollView
        ref={scrollRef} // ✅ Works now
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={20}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}
      >
        {loopedDiscounts.map((discount, index) => {
          const realIndex = index % discounts.length;

          const inputRange = [
            (index - 1) * SNAP_INTERVAL,
            index * SNAP_INTERVAL,
            (index + 1) * SNAP_INTERVAL,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.92, 1, 0.92],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: "clamp",
          });

          const zIndex =
            realIndex === activeIndex ? discounts.length : discounts.length - (realIndex + 1);

          return (
            <Animated.View
              key={`${discount.id}-${index}`}
              style={[
                styles.layer,
                {
                  marginLeft: index === -OVERLAP ? 2 : -OVERLAP,
                  transform: [{ scale }],
                  opacity,
                  zIndex,
                },
              ]}
            >
              <DiscountComponent
                imageUrl={discount.image}
                title={discount.title}
                description={discount.description}
              />
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default Discount;

const styles = StyleSheet.create({
  wrapper: {
    width: 328,
    height: 188,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    alignItems: "center",
    paddingEnd: 16,
  },
  layer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
});
