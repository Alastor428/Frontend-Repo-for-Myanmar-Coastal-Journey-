import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NgapaliBeachPackageScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER IMAGE */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../../../../assets/ngapali_travel_package/aa.jpg")} 
          style={styles.headerImage}
          imageStyle={{ borderRadius: 15 }}
        >
          <View style={styles.durationBadge}>
            <Ionicons name="time-outline" size={14} color="#000" />
            <Text style={styles.durationText}> 3 Days 2 Night</Text>
          </View>

          <View style={styles.imageTextContainer}>
            <Text style={styles.title}>Myanmar Coastal Journey</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="#fff" />
              <Text style={styles.locationText}> Ngapali Beach, Myanmar</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* PRICE CARD */}
      <View style={styles.priceCard}>
        <Text style={styles.startingText}>Starting from</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>250,000 MMK</Text>
          <Text style={styles.perPerson}> Per person</Text>
        </View>

        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* PACKAGE INCLUDES */}
      <Text style={styles.sectionTitle}>Package Includes</Text>

      {/* ITEM 1 */}
      <View style={styles.includeCard}>
        <Ionicons name="bus-outline" size={24} color="#1aa7a1" />
        <View style={styles.includeTextContainer}>
          <Text style={styles.includeTitle}>Round-trip Bus Tickets</Text>
          <Text style={styles.includeSubtitle}>
            Yangon ↔ Ngapali Beach
          </Text>
          <Text style={styles.includePrice}>50,000 MMK</Text>
        </View>
      </View>

      {/* ITEM 2 */}
      <View style={styles.includeCard}>
        <Ionicons name="bed-outline" size={24} color="#1aa7a1" />
        <View style={styles.includeTextContainer}>
          <Text style={styles.includeTitle}>2 Nights Hotel Stay</Text>
          <Text style={styles.includeSubtitle}>
            Deluxe Beach View Room
          </Text>
          <Text style={styles.includePrice}>180,000 MMK</Text>
        </View>
      </View>

      {/* ITEM 3 */}
      <View style={styles.includeCard}>
        <Ionicons name="car-outline" size={24} color="#1aa7a1" />
        <View style={styles.includeTextContainer}>
          <Text style={styles.includeTitle}>Hotel Transfers</Text>
          <Text style={styles.includeSubtitle}>
            Bus Station to Hotel & return
          </Text>
          <Text style={styles.includePrice}>20,000 MMK</Text>
        </View>
      </View>

      {/* ACCOMMODATION */}
      <Text style={styles.sectionTitle}>Accommodation</Text>

      <ImageBackground
        source={require("../../../../assets/ngapali_travel_package/aa.jpg")}
        style={styles.accommodationImage}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.accommodationOverlay}>
          <Text style={styles.accommodationTitle}>
            Deluxe beach view room
          </Text>
          <Text style={styles.accommodationSubtitle}>
            2 nights stay
          </Text>
        </View>
      </ImageBackground>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Ngapali Travel Packages</Text>
        <Text style={styles.footerSubtitle}>
          Explore Myanmar Coastal Journey
        </Text>
      </View>

    </ScrollView>
  );
};

export default NgapaliBeachPackageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f5",
    padding: 16,
  },

  imageContainer: {
    marginBottom: 15,
  },

  headerImage: {
    height: 220,
    justifyContent: "space-between",
    padding: 15,
  },

  durationBadge: {
    flexDirection: "row",
    alignSelf: "flex-end",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
  },

  durationText: {
    fontSize: 12,
    fontWeight: "500",
  },

  imageTextContainer: {},

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  locationText: {
    color: "#fff",
    fontSize: 13,
  },

  priceCard: {
    backgroundColor: "#dfe6e9",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },

  startingText: {
    fontSize: 13,
    color: "#555",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1aa7a1",
  },

  perPerson: {
    fontSize: 13,
    color: "#444",
    marginLeft: 5,
  },

  bookButton: {
    backgroundColor: "#1aa7a1",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  includeCard: {
    flexDirection: "row",
    backgroundColor: "#e9f0f1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  includeTextContainer: {
    marginLeft: 10,
  },

  includeTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },

  includeSubtitle: {
    fontSize: 12,
    color: "#555",
    marginVertical: 3,
  },

  includePrice: {
    fontSize: 12,
    color: "#1aa7a1",
    fontWeight: "600",
  },

  accommodationImage: {
    height: 160,
    justifyContent: "flex-end",
    padding: 15,
    marginBottom: 20,
  },

  accommodationOverlay: {},

  accommodationTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  accommodationSubtitle: {
    color: "#fff",
    fontSize: 12,
  },

  footer: {
    alignItems: "center",
    marginBottom: 30,
  },

  footerTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },

  footerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});