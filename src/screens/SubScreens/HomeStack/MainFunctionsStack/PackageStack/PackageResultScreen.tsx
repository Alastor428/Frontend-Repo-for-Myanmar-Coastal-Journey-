import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import PackagePlan from "@/components/Package/PackageCard";

const PackageResultScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // Package Data
  const packages = [
    {
      id: 1,
      image: require("../../../../../../assets/Ngapali/NP1.png"),
      location: "Ngapali Beach, Myanmar",
      title: "Budget Beach Escape",
      subtitle: "Affordable Coastal Getaway",
      description:
        "Experience Ngapali Beach without breaking the bank. Perfect for budget travelers.",
      price: "150,000 MMK",
      duration: "3 Days 2 Night",
    },
    {
      id: 2,
      image: require("../../../../../../assets/Ngapali/NP2.png"),
      location: "Ngapali Beach, Myanmar",
      title: "Luxury Beach Package",
      subtitle: "Premium Resort Experience",
      description:
        "Enjoy luxury hotels, seafood dining, and private beach access.",
      price: "450,000 MMK",
      duration: "4 Days 3 Night",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          width: "100%",
          paddingBottom: 80,
          paddingTop: 24,
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              marginTop: 40,
            }}
          >
            <IconButton
              icon="chevron-left"
              size={32}
              iconColor="#000"
              onPress={() => navigation.goBack()}
              style={{
                margin: 0,
                padding: 0,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            />

            <Text style={styles.headerTitle}>Package Results</Text>
          </View>
        </View>

        {/* Package List */}
        <View style={{ width: "100%", paddingHorizontal: 32 }}>
          {packages.map((item) => (
            <PackagePlan
              key={item.id}
              image={item.image}
              location={item.location}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              price={item.price}
              duration={item.duration}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PackageResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 24,
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#000",
  },
});
