import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import TourGuidePaymentMethodModal from "./TourGuidePaymentMethodModal";

type RootStackParamList = {
  GuidePayment: {
    guideName: string;
    guideLocation: string;
    guidePhone: string;
    guidePrice: string;
    guideImage: any;
  };
};

type Props = {
  route: RouteProp<RootStackParamList, "GuidePayment">;
};

const TourGuidePayment_screen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<any>();
  const { guideName, guideLocation, guidePhone, guidePrice, guideImage } =
    route.params;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nrc, setNrc] = useState("");
  const [remark, setRemark] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const parsedAmount = Number(guidePrice.replace(/[^0-9]/g, "")) || 0;

  return (
    <ScrollView style={styles.container}>
      {/* ================= Guide Info ================= */}

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Image source={guideImage} style={styles.image} />

          <Text style={styles.guideName}>{guideName}</Text>
        </View>

        <Row label="Location" value={guideLocation} />
        <Row label="Phone" value={guidePhone} />
        <Row label="Price" value={guidePrice} />
      </View>

      {/* ================= User Information ================= */}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Passenger Information</Text>

        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="NRC / Passport"
          value={nrc}
          onChangeText={setNrc}
        />

        <TextInput
          style={styles.input}
          placeholder="Remark (optional)"
          value={remark}
          onChangeText={setRemark}
        />
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => setShowConfirmModal(true)}
      >
        <Text style={styles.confirmButtonText}>Yes, I Confirm This</Text>
      </TouchableOpacity>

      <TourGuidePaymentMethodModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onPayNow={(paymentMethod) => {
          setShowConfirmModal(false);
          navigation.navigate("TourGuidePaymentComfirmScreen", {
            productName: guideName,
            invoiceNumber: `TG-${Date.now()}`,
            amount: parsedAmount,
            paymentType: paymentMethod === "visa" ? "VISA" : "MPU",
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          });
        }}
      />
    </ScrollView>
  );
};

export default TourGuidePayment_screen;

/* ================= Row Component ================= */

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

/* ================= Styles ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 10,
  },

  guideName: {
    fontSize: 18,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  rowLabel: {
    color: "#666",
  },

  rowValue: {
    fontWeight: "500",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#7ec8c7",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  confirmButton: {
    backgroundColor: "#21b3a4",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

});
