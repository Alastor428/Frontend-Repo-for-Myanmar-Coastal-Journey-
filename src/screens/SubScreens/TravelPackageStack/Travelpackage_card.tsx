import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface BeachPackageCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image: ImageSourcePropType;
  badge?: string;
  currency?: string;
  onPress?: () => void;
}

const BeachPackageCard: React.FC<BeachPackageCardProps> = ({
  title,
  subtitle,
  description,
  price,
  duration,
  location,
  image,
  badge,
  currency = "MMK",
  onPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground source={image} style={styles.imageBackground}>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}

        <View style={styles.locationContainer}>
          <Ionicons name="location" size={14} color="#fff" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.durationContainer}>
            <Ionicons name="time-outline" size={14} color="#000" />
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>{subtitle}</Text>

        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Starting from</Text>
            <Text style={styles.price}>
              {price.toLocaleString()} {currency}
            </Text>
          </View>

          <Pressable
            onPress={onPress}
            style={({ pressed }) => [
              styles.selectButton,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={styles.selectButtonText}>Select Package</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BeachPackageCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 328,
    height:399,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
    elevation: 3,
    marginVertical: 10,
    alignSelf: "center",
    
   
  },
  imageBackground: {
    height: 170,
    justifyContent: "space-between",
    padding: 10,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 4,
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  contentContainer: {
    padding: 15,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  durationText: {
    marginLeft: 4,
    fontSize: 12,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#333",
  },
  description: {
    marginTop: 6,
    fontSize: 12,
    color: "#555",
  },
  bottomRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  priceContainer: {
    flex: 1,
    backgroundColor: "#1CB5B0",
    padding: 10,
    justifyContent: "center",
  },
  priceLabel: {
    color: "#fff",
    fontSize: 12,
  },
  price: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  selectButton: {
    flex: 1,
    backgroundColor: "#D9B8A6",
    justifyContent: "center",
    alignItems: "center",
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});