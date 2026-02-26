import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { ImageSourcePropType } from "react-native";

interface HotelComponentProps {
  imageUrl: ImageSourcePropType;
  title: string;
  location: string;
  rating: string;
  onPress?: () => void;
}

const HotelComponent: React.FC<HotelComponentProps> = ({
  imageUrl,
  title,
  location,
  rating,
  onPress,
}) => {

  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkPress = () => {
    setBookmarked(prev => !prev);
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Card style={styles.card}>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image source={imageUrl} style={styles.image} />

          {/* Bookmark Icon Overlay */}
          <View style={styles.bookmarkIcon}>
            <IconButton
                        icon={bookmarked ? "bookmark" : "bookmark-outline"}
                        size={26}
                        iconColor={bookmarked ? "#FFD700" : "#fff"}
                        style={{
                          marginLeft: 232,
                          marginTop: 4,
                          backgroundColor: "rgb(255,255,255,0.09)",
                        }}
                        onPress={handleBookmarkPress}
                      />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          {/* Rating */}
          <View style={styles.row}>
            <IconButton
              icon="star"
              size={16}
              iconColor="#FFD51F"
              style={{ margin: 0 }}
            />
            <Text style={styles.text}>{rating}</Text>
          </View>

          {/* Location */}
          <View style={styles.row}>
            <IconButton
              icon="map-marker"
              size={16}
              iconColor="#C49172"
              style={{ margin: 0 }}
            />
            <Text
              style={styles.locationText}
              onPress={() => Linking.openURL(location)}
            >
              View Location
            </Text>
          </View>
        </View>

      </Card>
    </TouchableOpacity>
  );
};

export default HotelComponent;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 8,
    // overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3
  },

  imageContainer: {
    position: "relative",
    width: "100%"
  },

  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius:8,
    borderTopRightRadius:8
  },

  bookmarkIcon: {
    position: "absolute",
    top: 10,
    right: 10
  },

  bookmarkBackground: {
    backgroundColor: "rgba(0,0,0,0.35)",
    margin: 0
  },

  content: {
    padding: 14
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6
  },

  text: {
    fontSize: 14
  },

  locationText: {
    fontSize: 14,
    color: "#1cb5b0",
    textDecorationLine: "underline"
  }
});