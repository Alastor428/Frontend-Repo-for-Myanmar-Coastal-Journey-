import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import PackageBookingModal from "./PackageBookingModal";
import PackagePaymentMethodModal from "./PackagePaymentMethodModal";

const PackageDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [paymentTotalAmount, setPaymentTotalAmount] = useState("250,000");
  const [paymentTravelers, setPaymentTravelers] = useState(1);
  //   const [totalAmount, setTotalAmount] = useState(0);
  //   const [travelers, setTravelers] = useState(1);
  const priceData = {
    total: "250,000 MMK",
    bus: "50,000 MMK",
    hotel: "180,000 MMK",
    transfer: "20,000 MMK",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.headerTitle}>Ngapali beach package</Text>
      </View>

      {/* Image */}
      <View style={styles.imageBox}>
        <Image
          source={require("../../../../../../assets/Ngapali/NP1.png")}
          style={styles.image}
        />

        <View style={styles.duration}>
          <Text>3 Days 2 Night</Text>
        </View>

        <Text style={styles.title}>Myanmar Coastal Journey</Text>

        <Text style={styles.location}>Ngapali Beach, Myanmar</Text>
      </View>

      {/* Price Box */}
      <View style={styles.priceBox}>
        <Text>Starting from</Text>

        <Text style={styles.price}>{priceData.total}</Text>

        <Text>Per person</Text>

        <Pressable
          style={styles.bookBtn}
          onPress={() => setIsBookingModalVisible(true)}
        >
          <Text style={{ color: "#fff" }}>Book Now</Text>
        </Pressable>
      </View>

      {/* Package Includes */}
      <Text style={styles.section}>Package Includes</Text>

      {/* Bus */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Round-trip Bus Tickets</Text>

        <Text>Yangon → Ngapali Beach</Text>

        <Text style={styles.cardPrice}>{priceData.bus}</Text>
      </View>

      {/* Hotel */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>2 Nights Hotel Stay</Text>

        <Text>Delux Beach View Room</Text>

        <Text style={styles.cardPrice}>{priceData.hotel}</Text>
      </View>

      {/* Transfer */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hotel Transfers</Text>

        <Text>Bus Station to Hotel & return</Text>

        <Text style={styles.cardPrice}>{priceData.transfer}</Text>
      </View>
      <PackageBookingModal
        visible={isBookingModalVisible}
        onClose={() => setIsBookingModalVisible(false)}
        onProceedToPayment={({ totalAmount, travelers }) => {
          setPaymentTotalAmount(totalAmount);
          setPaymentTravelers(travelers);
          setIsPaymentModalVisible(true);
        }}
        pricePerPerson={250000}
        title="Myanmar Coastal Journey"
        duration="3 Days 2 Night"
      />
      <PackagePaymentMethodModal
        visible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        totalAmount={paymentTotalAmount}
        travelers={paymentTravelers}
      />
    </ScrollView>
  );
};

export default PackageDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },

  imageBox: {
    padding: 16,
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },

  duration: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 6,
  },

  title: {
    position: "absolute",
    bottom: 40,
    left: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  location: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "#fff",
  },

  priceBox: {
    margin: 16,
    backgroundColor: "#d9e3e6",
    padding: 16,
    borderRadius: 10,
  },

  price: {
    fontSize: 22,
    color: "#2aa7a1",
    fontWeight: "bold",
  },

  bookBtn: {
    backgroundColor: "#2aa7a1",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },

  section: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 16,
  },

  card: {
    backgroundColor: "#e3eef0",
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
  },

  cardTitle: {
    fontWeight: "bold",
  },

  cardPrice: {
    color: "#2aa7a1",
    marginTop: 4,
  },
});
