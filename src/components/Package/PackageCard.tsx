import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type PackagePlanProps = {
  image: any;
  location: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
};

const PackagePlan: React.FC<PackagePlanProps> = ({
  image,
  location,
  title,
  subtitle,
  description,
  price,
  duration,
}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.card}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />

        <View style={styles.locationBox}>
          <Ionicons name="location" size={14} color="#fff" />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        <Pressable style={styles.bookmark}>
          <Ionicons name="bookmark-outline" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.durationBox}>
            <Ionicons name="time-outline" size={14} />
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>{subtitle}</Text>

        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Bottom buttons */}
      <View style={styles.bottomRow}>
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>Starting from</Text>
          <Text style={styles.price}>{price}</Text>
        </View>

        <Pressable
          style={styles.selectBtn}
          onPress={() => navigation.navigate("PackageDetailScreen")}
        >
          <Text style={styles.selectText}>Select Package</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PackagePlan;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 3,
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 180,
  },

  locationBox: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  locationText: {
    color: "#fff",
    fontWeight: "600",
  },

  bookmark: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 20,
  },

  info: {
    padding: 12,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  durationBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#eee",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },

  durationText: {
    fontSize: 12,
  },

  subtitle: {
    marginTop: 4,
    color: "#555",
    fontWeight: "500",
  },

  description: {
    marginTop: 6,
    color: "#666",
    fontSize: 13,
  },

  bottomRow: {
    flexDirection: "row",
  },

  priceBox: {
    flex: 1,
    backgroundColor: "#1bb3a7",
    padding: 12,
  },

  priceText: {
    color: "#fff",
    fontSize: 12,
  },

  price: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  selectBtn: {
    flex: 1,
    backgroundColor: "#d8b6a3",
    justifyContent: "center",
    alignItems: "center",
  },

  selectText: {
    color: "#fff",
    fontWeight: "600",
  },
});
