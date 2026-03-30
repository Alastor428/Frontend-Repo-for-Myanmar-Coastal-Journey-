import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, RouteProp } from "@react-navigation/native";

// ---------------- Props Type ----------------
type FlightPaymentParams = {
  flightType: string;
  travelDate: string;
  departureTime: string;
  adult: number;
  selectedSeats: string[];
  seatPrice: number;
  totalAmount: string;
  boardingPoint: string;
  source: string;
  destination: string;
};

type Props = {
  route: RouteProp<{ params: FlightPaymentParams }, "params">;
};

const FlightTicketPaymentScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<any>();
  const params = route?.params;

  const {
    flightType = "Myanmar Airways",
    travelDate = "",
    departureTime = "",
    adult = 0,
    selectedSeats = [],
    seatPrice = 250000,
    totalAmount = "0",
    boardingPoint = "Yangon Airport",
    source = "Yangon",
    destination = "Mandalay",
  } = params;

  const price = seatPrice;
  const totalPrice = parseInt(totalAmount) || selectedSeats.length * price;

  // ---------------- Passenger Info ----------------
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passport, setPassport] = useState("");
  const [remark, setRemark] = useState("");
  const [agree, setAgree] = useState(false);

  // ---------------- Payment Modal ----------------
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<"visa" | "mpu">("mpu");

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton icon="chevron-left" size={30} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Passenger Details</Text>
      </View>

      {/* Flight Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{flightType} Flight</Text>
        <Row label="Travel Date" value={travelDate} />
        <Row label="Departure Time" value={departureTime} />
        <Row label="Adult" value={adult} />
        <Row label="Selected Seats" value={selectedSeats.join(", ")} />
        <Row label="Seat Price" value={`${price} MMK / seat`} />
        <Row label="Total Price" value={`${totalPrice} MMK`} />
        <Row label="Boarding Point" value={boardingPoint} />
        <Row label="Source" value={source} />
        <Row label="Destination" value={destination} />
      </View>

      {/* Passenger Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Passenger Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Passport Number"
          value={passport}
          onChangeText={setPassport}
        />
        <TextInput
          style={styles.input}
          placeholder="Remark (optional)"
          value={remark}
          onChangeText={setRemark}
        />
      </View>

      {/* Terms & Conditions */}
      <TouchableOpacity
        style={styles.termsRow}
        onPress={() => setAgree((prev) => !prev)}
      >
        <View style={[styles.checkbox, agree ? styles.checked : null]} />
        <Text style={styles.termsText}>
          I have read and agree to the terms and conditions
        </Text>
      </TouchableOpacity>

      {/* Confirm Button */}
      <TouchableOpacity
        style={[styles.confirmBtn, !agree ? styles.disabledBtn : null]}
        disabled={!agree}
        onPress={() => setShowPaymentModal(true)}
      >
        <Text style={styles.confirmText}>Proceed to Payment</Text>
      </TouchableOpacity>

      {/* Payment Modal */}
      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setSelectedPayment("visa")}
            >
              <View
                style={[
                  styles.radio,
                  selectedPayment === "visa" ? styles.radioSelected : null,
                ]}
              />
              <Image
                source={require("../../../../../../../assets/Logo/visa_logo1.png")}
                style={styles.paymentLogo}
              />
              <Text>Pay with VISA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setSelectedPayment("mpu")}
            >
              <View
                style={[
                  styles.radio,
                  selectedPayment === "mpu" ? styles.radioSelected : null,
                ]}
              />
              <Image
                source={require("../../../../../../../assets/Logo/mpu_logo.jpg")}
                style={styles.paymentLogo}
              />
              <Text>Pay with MPU</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.payNowBtn}
              onPress={() => {
                setShowPaymentModal(false);
                navigation.navigate("FlightTicketFinalPayment", {
                  productName: `Flight - ${flightType} (Seats: ${selectedSeats.join(", ")})`,
                  invoiceNumber: `FT-${Date.now()}`,
                  amount: totalPrice,
                  paymentType: selectedPayment.toUpperCase(),
                  date: new Date().toLocaleDateString(),
                  time: new Date().toLocaleTimeString(),
                  recipient: name || "Passenger",
                  ticketData: {
                    flightType,
                    adult,
                    price,
                    totalPrice,
                    selectedSeats,
                    source,
                    destination,
                    travelDate,
                    departureTime,
                  },
                  passenger: { name, phone, passport, remark },
                });
              }}
            >
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowPaymentModal(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default FlightTicketPaymentScreen;

const Row = ({ label, value }: { label: string; value: unknown }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{String(value)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24 },
  header: { flexDirection: "row", alignItems: "center", paddingTop: 40 },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: "auto", marginRight: "auto" },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 6, marginBottom: 16, elevation: 2 },
  sectionTitle: { fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
  rowLabel: { color: "#555" },
  rowValue: { fontWeight: "500" },
  input: { borderWidth: 1, borderColor: "#7ec8c7", borderRadius: 8, padding: 10, marginBottom: 10 },
  termsRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  checkbox: { width: 18, height: 18, borderWidth: 1, marginRight: 8 },
  checked: { backgroundColor: "#2aa8a8" },
  termsText: { fontSize: 12 },
  confirmBtn: { backgroundColor: "#2aa8a8", padding: 12, borderRadius: 10, alignItems: "center" },
  disabledBtn: { backgroundColor: "#ccc" },
  confirmText: { color: "#fff", fontWeight: "bold" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "85%", backgroundColor: "#fff", borderRadius: 8, padding: 32, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  paymentOption: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: "#888", marginRight: 8 },
  radioSelected: { backgroundColor: "#2aa8a8" },
  paymentLogo: { width: 50, height: 36, resizeMode: "contain", marginRight: 8 },
  payNowBtn: { backgroundColor: "#1CB5B0", padding: 12, borderRadius: 8, marginTop: 10, alignItems: "center" },
  payNowText: { color: "#fff", fontWeight: "bold" },
  cancelBtn: { padding: 12, borderRadius: 8, marginTop: 10, alignItems: "center" },
  cancelText: { color: "#1CB5B0", fontWeight: "bold" },
});