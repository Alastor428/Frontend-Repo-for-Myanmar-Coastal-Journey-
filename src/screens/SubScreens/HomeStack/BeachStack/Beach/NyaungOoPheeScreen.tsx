import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import { IconButton, shadow } from "react-native-paper";
import BeachScreenPhoto from "../../../../../components/BeachComponent/BeachScreenPhoto";
import ActivitiesGroup from "../../../../../components/Activities/ActivitiesGroup";
import Naung_Oo_Restaurant_home from "@/components/Naung Oo Phee/Naung_Oo_Restaurant_home";
import Pagoda_NOP from "@/components/Naung Oo Phee/pagoda_NOP";
import TravelPackageButton from "@/components/BeachComponent/TravelPackageButton";
import SelfRegistrationButton from "@/components/BeachComponent/SelfRegistrationButton";

const { width } = Dimensions.get("window");
interface beachInfo {
  id: number;
  name: string;
  location: string;
  rating: number;
  condition?: string;
  map: string;
  description: string;
}

const NGWESAUNG_ACTIVITIES = [
  {
    id: "1",
    title: "Boat Tours",
    image: require("../../../../../../assets/activities/BoatTour.png"),
  },
  {
    id: "2",
    title: "Camping",
    image: require("../../../../../../assets/activities/Campsite.png"),
  },
  {
    id: "3",
    title: "Horse Riding",
    image: require("../../../../../../assets/activities/Horse.png"),
  },
  {
    id: "4",
    title: "Kite Surfing",
    image: require("../../../../../../assets/activities/Kitesurfing.png"),
  },
  {
    id: "5",
    title: "Motorbike Tour",
    image: require("../../../../../../assets/activities/Motorcycle.png"),
  },
  {
    id: "6",
    title: "Elephant Observation",
    image: require("../../../../../../assets/activities/Elephant.png"),
  },
  {
    id: "7",
    title: "Surfing",
    image: require("../../../../../../assets/activities/Surfing.png"),
  },
  {
    id: "8",
    title: "Island Hopping",
    image: require("../../../../../../assets/activities/Boat.png"),
  },
];

const NyaungOoPheeScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const [rating, setRating] = useState(4.8);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkPress = () => {
    setBookmarked(!bookmarked);
  };

  const [beachInfo, setBeach] = useState<beachInfo>({
    id: 8,
  name: "Nyaung Oo Phee",
  location: "Tanintharyi, Myanmar",
  rating: 4.8,
  map: "https://maps.app.goo.gl/5cF7m2q7JXzJ8GxQ7",
  description: `Nyaung Oo Phee Island is one of Myanmar’s most beautiful and exclusive beach destinations, located in the Myeik Archipelago. It is famous for its crystal-clear turquoise water, white sandy beaches, and well-preserved natural environment.

Highlights:
- Crystal-clear water and white sand beaches
- Snorkeling and marine life exploration
- Eco-resort experience with clean environment
- Peaceful and private island atmosphere

Best Time: November to April

Tips:
- Access is only via boat from Kawthaung
- Booking in advance is recommended
- Follow eco-rules to protect the environment`,
  });

  const hasCondition = !!beachInfo?.condition;

  const beachPhotos = [
    { id: 1, image: require("../../../../../../assets/NyaungOoPhee/1.jpg") },
    { id: 2, image: require("../../../../../../assets/NyaungOoPhee/2.jpg") },
    { id: 3, image: require("../../../../../../assets/NyaungOoPhee/9.jpg") },
    { id: 4, image: require("../../../../../../assets/NyaungOoPhee/4.jpg") },
    { id: 5, image: require("../../../../../../assets/NyaungOoPhee/5.jpg") },
    { id: 6, image: require("../../../../../../assets/NyaungOoPhee/6.jpg") },
    { id: 7, image: require("../../../../../../assets/NyaungOoPhee/7.jpg") },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        activeIndex === beachPhotos.length - 1 ? 0 : activeIndex + 1;

      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const souvenirImages = [
    require("../../../../../../assets/NgweSaung/Souvenir/1.jpg"),
    require("../../../../../../assets/NgweSaung/Souvenir/2.jpg"),
    require("../../../../../../assets/NgweSaung/Souvenir/3.jpg"),
    require("../../../../../../assets/NgweSaung/Souvenir/4.jpg"),
    require("../../../../../../assets/NgweSaung/Souvenir/5.jpg"),

  ];
  const [viewerVisible, setViewerVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
 return (
    <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.sliderContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
        >
          {beachPhotos.map((photo) => (
            <View key={photo.id} style={{ width }}>
              <BeachScreenPhoto imageUrl={photo.image} />
            </View>
          ))}
        </ScrollView>
        <View style={styles.header}>
          <IconButton
            icon="chevron-left"
            size={32}
            iconColor="#fff"
            onPress={() => navigation?.goBack?.()}
            style={{
              margin: 0,
              padding: 0,
              backgroundColor: "rgb(255,255,255,0.09)",
            }}
          />
          <IconButton
            icon={bookmarked ? "bookmark" : "bookmark-outline"}
            size={32}
            iconColor={bookmarked ? "#FFD700" : "#fff"}
            style={{
              marginLeft: 232,
              marginTop: 4,
              backgroundColor: "rgb(255,255,255,0.09)",
            }}
            onPress={handleBookmarkPress}
          />
        </View>
        <View style={styles.dotsOverlay}>
          {beachPhotos.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
        <View style={styles.Name}>
          <Text style={styles.Beach}>{beachInfo.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingNumber}>{rating}</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton icon="map-marker" size={24} iconColor="#1CB5B0" />
            <Text style={styles.locationText}>{beachInfo.location}</Text>
          </View>
          <View style={styles.mapContainer}>
            <Text
              style={styles.mapText}
              onPress={() =>
                Linking.openURL(beachInfo.map)
              }
            >
              view map
            </Text>
            <IconButton
              icon="chevron-right"
              size={16}
              iconColor="#1CB5B0"
              style={{ marginLeft: -8 }}
            />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            style={{
              paddingHorizontal: 32,
              fontFamily: "Poppins",
              fontSize: 12,
              color: "#555",
            }}
            numberOfLines={isExpanded ? undefined : 3}
          >
            {beachInfo.description}
          </Text>
          <TouchableOpacity
            onPress={() => setIsExpanded(!isExpanded)}
            style={{ paddingHorizontal: 32, paddingTop: 4 }}
          >
            <Text style={{ color: "#1CB5B0", fontWeight: "bold" }}>
              {isExpanded ? "Read Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        </View>
        <ActivitiesGroup
          activities={NGWESAUNG_ACTIVITIES}
          onActivityPress={(a) => console.log(`${a.title} pressed`)}
        />
        <View>
          <View>
            <Naung_Oo_Restaurant_home />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              paddingHorizontal: 32,
              paddingBottom: 12,
            }}
          >
            Souvenirs
          </Text>
        </View>
        <View style={styles.souvenirs}>
          {souvenirImages.slice(0, 4).map((img, index) => {
            const remaining = souvenirImages.length - 4;
            const isLast = index === 3 && remaining > 0;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedIndex(index);
                  setViewerVisible(true);
                }}
              >
                <View style={styles.imageWrapper}>
                  <Image source={img} style={styles.image} />

                  {isLast && (
                    <View style={styles.overlay}>
                      <Text style={styles.overlayText}>+{remaining}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {viewerVisible && (
          <View style={styles.viewerContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentOffset={{ x: selectedIndex * width, y: 0 }}
            >
              {souvenirImages.map((img, index) => (
                <Image key={index} source={img} style={styles.viewerImage} />
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setViewerVisible(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ paddingBottom: 32 }}>
          <Pagoda_NOP/>
        </View>
      </View>
    </ScrollView>
    {/* fixedbox */}
        <View style={styles.fixedBox}>
          
          {hasCondition ? (
          <View style={{ paddingHorizontal: 32 , paddingTop: 16, flexDirection: "row", alignItems: "center"}}>
            <IconButton
              icon="alert-circle"
              size={24}
              iconColor="red"
              style={{ margin: 0, padding: 0 }}
            />
            {beachInfo?.condition && (
                <Text style={styles.conditionText}>
                  {beachInfo.condition}
                </Text>
              )}
          </View>
          ) : (
            <View style={{ paddingHorizontal: 32 , paddingTop: 16, flexDirection: "row"}}>
              <IconButton
                icon="check-circle"
                size={24}
                iconColor="green"
                style={{ margin: 0, padding: 0 }}
              />
              <View style={{ marginTop: 12 }}>
                <Text style={styles.locationText}>
                This destination is safe to visit.
              </Text>
              </View>
            </View>
          )}
          <View style={{ paddingHorizontal: 32, flexDirection: "row", alignItems: "center", paddingVertical:24 }}>
              <View style={{ flex: 1 }}>
                <TravelPackageButton onPress={() => navigation.navigate("PackageSearchScreen")} />
              </View>
              <View style={{ flex: 1 , marginLeft: "auto"}}>
                <SelfRegistrationButton onPress={() => navigation.navigate("SelfRegistration")} />
              </View>
          </View>
        </View>
    </View>
  );
};

export default NyaungOoPheeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sliderContainer: {
    position: "relative",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
  header: {
    flexDirection: "row",
    paddingTop: 60,
    paddingHorizontal: 32,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  dotsOverlay: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingTop: 420,
    borderRadius: 16,
    zIndex: 10,
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
  Name: {
    flexDirection: "row",
    paddingHorizontal: 32,
    paddingTop: 16,
    justifyContent: "space-between",
  },
  Beach: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    color: "#FFD700",
    fontSize: 18,
    marginRight: 4,
  },
  ratingNumber: {
    fontSize: 16,
    fontWeight: "500",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  locationText: {
    fontSize: 12,
    color: "#555",
    fontFamily: "Poppins",
  },
  mapText: {
    fontSize: 12,
    color: "#1CB5B0",
    marginLeft: 8,
    fontFamily: "Poppins",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  mapContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  descriptionContainer: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  souvenirs: {
    flexDirection: "row",
    paddingHorizontal: 32,
  },

  imageWrapper: {
    position: "relative",
    marginRight: 12,
  },

  overlay: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  overlayText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  /* Viewer */
  viewerContainer: {
    position: "absolute",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 100,
  },

  viewerImage: {
    width: width,
    height: "70%",
    resizeMode: "contain",
    marginRight: 8,
  },

  closeButton: {
    position: "absolute",
    top: 100,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 10,
  },

  closeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
  },
  fixedBox: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  justifyContent: "center",
  alignItems: "center",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  elevation: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
},

bookButton: {
  backgroundColor: "#1CB5B0",
  paddingVertical: 14,
  paddingHorizontal: 80,
  borderRadius: 30,
},
conditionText: {
  color: "red",
  fontSize: 12,
  marginTop: 4,
},
});
