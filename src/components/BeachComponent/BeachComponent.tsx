import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

import { ImageSourcePropType } from "react-native";

interface BeachComponentProps {
  imageUrl: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  width?: number;
  height?: number;
}
const BeachComponent: React.FC<BeachComponentProps> = ({
  imageUrl,
  title,
  onPress,
  width = 160,
  height = 168,
}) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkPress = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <Image source={imageUrl} style={[styles.image, { width, height }]} />
          <View style={styles.topRightIcon}>
            <IconButton
              icon="bookmark"
              size={20}
              iconColor={bookmarked ? "#FFD700" : "#fff"}
              style={{ margin: 0 }}
              onPress={handleBookmarkPress}
            />
          </View>
          <View style={styles.overlay}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default BeachComponent;

const styles = StyleSheet.create({
  card: {
    margin: 0,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  image: {
    width: 160,
    height: 168,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Outfit",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  topRightIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
