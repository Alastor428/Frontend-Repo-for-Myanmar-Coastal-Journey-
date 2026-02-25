import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BeachPackageCard, {
  BeachPackageCardProps,
} from "./Travelpackage_card";

const BEACH_PACKAGE_DATA: BeachPackageCardProps[] = [
  {
    id: "1",
    title: "Budget Beach Escape",
    subtitle: "Affordable Coastal Getaway",
    description:
      "Experience Ngapali Beach without breaking the bank. Perfect for budget travelers who want to enjoy pristine beaches.",
    price: 150000,
    duration: "3 Days 2 Night",
    location: "Ngapali Beach, Myanmar",
    image: require("../../../../assets/ngapali_travel_package/aa.jpg"),
    badge: "Best Offer",
  },
  {
    id: "2",
    title: "Luxury Beach Retreat",
    subtitle: "Premium Experience",
    description:
      "Relax in luxury resorts with oceanfront views and premium services.",
    price: 320000,
    duration: "4 Days 3 Night",
    location: "Ngapali Beach, Myanmar",
    image: require("../../../../assets/ngapali_travel_package/aa.jpg"),
    badge: "Best Offer",
  },
    {
    id: "3",
    title: "Luxury Beach Retreat",
    subtitle: "Premium Experience",
    description:
      "Relax in luxury resorts with oceanfront views and premium services.",
    price: 320000,
    duration: "4 Days 3 Night",
    location: "Ngapali Beach, Myanmar",
    image: require("../../../../assets/ngapali_travel_package/aa.jpg"),
    badge: "Best Offer",
  },
      {
    id: "4",
    title: "Luxury Beach Retreat",
    subtitle: "Premium Experience",
    description:
      "Relax in luxury resorts with oceanfront views and premium services.",
    price: 320000,
    duration: "4 Days 3 Night",
    location: "Ngapali Beach, Myanmar",
    image: require("../../../../assets/ngapali_travel_package/aa.jpg"),
    badge: "Best Offer",
  },
];

const BeachPackageScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Ngapali beach packages</Text>
      </View>

     
      <Text style={styles.chooseText}>Choose your package</Text>

      <Text style={styles.descriptionText}>
        Select the package that best fits your budget and style
      </Text>

    
      <FlatList
        data={BEACH_PACKAGE_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BeachPackageCard
            {...item}
            onPress={() => Alert.alert("Selected", item.title)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default BeachPackageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },

  chooseText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  descriptionText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 15,
  },
});