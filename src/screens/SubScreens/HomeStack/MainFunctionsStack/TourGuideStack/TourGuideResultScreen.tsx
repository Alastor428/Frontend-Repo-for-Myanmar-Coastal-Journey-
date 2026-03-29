import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import TourGuideCard from "@/components/TourGuide/TourGuideCard";

const TourGuideResultScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const tourGuides = [
    {
      id: 1,
      image: require("../../../../../../assets/tourguide/tourguidephoto.jpg"),
      name: "Nandar",
      location: "Ngapali Beach, Rakhine",
      phone: "+959123456789",
      experience: "8 years experience",
      gender: "Female",
      languages: ["French", "English", "Spanish"],
      price: "40,000 MMK / day",
      status: "Available",
    },
    {
      id: 2,
      image: require("../../../../../../assets/tourguide/tourguidephoto.jpg"),
      name: "Ko Aung",
      location: "Bagan, Myanmar",
      phone: "+959987654321",
      experience: "6 years experience",
      gender: "Male",
      languages: ["English", "Chinese"],
      price: "35,000 MMK / day",
      status: "Available",
    },
    {
      id: 3,
      image: require("../../../../../../assets/tourguide/tourguidephoto.jpg"),
      name: "Mya Thiri",
      location: "Inle Lake, Shan",
      phone: "+959111222333",
      experience: "10 years experience",
      gender: "Female",
      languages: ["English", "Thai"],
      price: "50,000 MMK / day",
      status: "Available",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <IconButton
            icon="chevron-left"
            size={32}
            iconColor="#000"
            onPress={() => navigation?.goBack?.()}
            style={styles.backButton}
          />

          <Text style={styles.headerTitle}>Tour Guide Results</Text>
        </View>

        {/* Tour Guide List */}
        <View style={styles.listContainer}>
          {tourGuides.map((tourGuide) => (
            <TourGuideCard
              key={tourGuide.id}
              image={tourGuide.image}
              name={tourGuide.name}
              location={tourGuide.location}
              phone={tourGuide.phone}
              experience={tourGuide.experience}
              gender={tourGuide.gender}
              languages={tourGuide.languages}
              price={tourGuide.price}
              status={tourGuide.status}
              onRentPress={() =>
                navigation?.navigate("TourGuidePaymentScreen", {
                  guideName: tourGuide.name,
                  guideLocation: tourGuide.location,
                  guidePhone: tourGuide.phone,
                  guidePrice: tourGuide.price,
                  guideImage: tourGuide.image,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TourGuideResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    paddingBottom: 80,
    paddingTop: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 40,
    marginBottom: 16,
  },

  backButton: {
    margin: 0,
    padding: 0,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#000",
  },

  listContainer: {
    width: "100%",
    // paddingHorizontal: 32,
    alignItems: "center",
  },
});
