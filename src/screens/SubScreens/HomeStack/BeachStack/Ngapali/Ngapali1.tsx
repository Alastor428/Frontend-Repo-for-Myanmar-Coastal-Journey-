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

const { width } = Dimensions.get("window");

const Ngapali1Screen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const [rating, setRating] = useState(4.5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkPress = () => {
    setBookmarked(!bookmarked);
  };

  const beachPhotos = [
    { id: 1, image: require("../../../../../../assets/Ngapali/NP29.png") },
    { id: 2, image: require("../../../../../../assets/Ngapali/NP1.png") },
    { id: 3, image: require("../../../../../../assets/Ngapali/NP2.png") },
    { id: 4, image: require("../../../../../../assets/Ngapali/NP3.png") },
    { id: 5, image: require("../../../../../../assets/Ngapali/NP13.png") },
    { id: 6, image: require("../../../../../../assets/Ngapali/NP11.png") },
    { id: 7, image: require("../../../../../../assets/Ngapali/NP12.png") },
    { id: 8, image: require("../../../../../../assets/Ngapali/NP7.png") },
    { id: 9, image: require("../../../../../../assets/Ngapali/NP8.png") },
    { id: 10, image: require("../../../../../../assets/Ngapali/NP9.png") },
    { id: 11, image: require("../../../../../../assets/Ngapali/NP10.png") },
  ];

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / width
    );
    setActiveIndex(index);
  };
  useEffect(() => {
  const interval = setInterval(() => {
    const nextIndex =
      activeIndex === beachPhotos.length - 1
        ? 0
        : activeIndex + 1;

    scrollRef.current?.scrollTo({
      x: nextIndex * width,
      animated: true,
    });

    setActiveIndex(nextIndex);
  }, 2000); 

  return () => clearInterval(interval);
}, [activeIndex]);

 const descriptionText = `Ngapali Beach is one of the most beautiful coastal destinations in Myanmar, well-known for its clean water, soft white sand, and quiet atmosphere. The beach offers a peaceful natural environment with stunning views, fresh local seafood, and a relaxing lifestyle. Travelers especially love its breathtaking sunset scenery, wide beachfront, and calm, clear waves.

Major Highlights:
- Visit nearby fishing villages such as Gyeik Taw
- Take a boat trip to Pearl Island for snorkeling
- See the Tilawkasayambhu Buddha Statue on the hilltop at the southern end of the beach

Location:
Ngapali Beach is located in Thandwe (Sandoway) in Rakhine State, Myanmar. It lies approximately 7 km (4 miles) from the nearest major town, Thandwe. The coordinates are approximately Latitude: 18.02° N and Longitude: 94.34° E.

History:
The name "Ngapali Beach" originates from a local legend where an Italian traveler named it "Napoli". Historically, the area has been associated with a fishing community.

Best Time to Visit:
Dry season, November to April/May, for sunny weather and calm waves.

Lifestyle (Local Culture & People):
Fishing families, friendly villagers, ox-drawn carts, and a tranquil atmosphere.

Useful Tips:
Bring sunscreen, hat, slippers, cash, follow safety instructions, and be respectful of local customs.`;
const souvenirImages = [
  require("../../../../../../assets/Ngapali/Souvenirs/NPS1.png"),
  require("../../../../../../assets/Ngapali/Souvenirs/NPS2.png"),
  require("../../../../../../assets/Ngapali/Souvenirs/NPS3.png"),
  require("../../../../../../assets/Ngapali/Souvenirs/NPS4.png"),
  require("../../../../../../assets/Ngapali/Souvenirs/NPS5.png"),
  require("../../../../../../assets/Ngapali/Souvenirs/NPS6.png"),
  require("../../../../../../assets/Ngapali/Souvenirs/NPS7.png"),
  require("../../../../../../assets/Ngapali/Souvenirs/NPS8.png"),
  require("../../../../../../assets/Ngapali/Souvenirs/NPS9.png"),
];
const [viewerVisible, setViewerVisible] = useState(false);
const [selectedIndex, setSelectedIndex] = useState(0);


  return (
    <ScrollView 
    style={styles.container}>
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
        <View  style={styles.header}>
              <IconButton
                icon="chevron-left"   
                size={32}
                iconColor="#fff"
                onPress={() => {
                Linking.openURL("myapp://BusTicketHome");
                }}
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
                    style={[
                        styles.dot,
                        activeIndex === index && styles.activeDot,
                    ]}
                    />
                    ))}
        </View>
        <View style={styles.Name}>
          <Text style={styles.Beach}>Ngapali</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingNumber}>{rating}</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton
            icon="map-marker"
            size={24}
            iconColor="#1CB5B0"
          />
          <Text style={styles.locationText}>Rakhine, Myanmar</Text>
          </View>
          <View style={styles.mapContainer} >
            <Text style={styles.mapText} 
          onPress={() => Linking.openURL("https://maps.app.goo.gl/4GZZPsry1MihvGKi8")}>
            view map 
          </Text>
          <IconButton 
            icon="chevron-right"
            size={16}
            iconColor="#1CB5B0"
            style={{ marginLeft: -8}}
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
            {descriptionText}
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
        <View>
          <Text
          style={{
            fontSize: 16, 
            fontWeight: "bold",
            paddingHorizontal: 32,
            paddingBottom: 12,
          }}>
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
                  <Image
                    key={index}
                    source={img}
                    style={styles.viewerImage}
                  />
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

        </View>
    </ScrollView>
  );
};

export default Ngapali1Screen;

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
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#fff",
  zIndex: 100,
},

viewerImage: {
  width: width,
  height: "100%",
  resizeMode: "contain",
  marginRight: 8,
},

closeButton: {
  position: "absolute",
  top: 40,
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
});
