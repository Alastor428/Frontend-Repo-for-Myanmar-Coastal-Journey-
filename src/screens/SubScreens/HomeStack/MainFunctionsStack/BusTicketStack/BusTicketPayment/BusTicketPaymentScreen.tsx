import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, RouteProp } from "@react-navigation/native";

// ---------------- Props Type ----------------
type TicketPaymentParams = {
  busType: string;
  travelDate: string;
  departureTime: string;
  adult: number;
  selectedSeats: string;
  seatPrice: number;
  totalAmount: string;
  boardingPoint: string;
  source: string;
  destination: string;
  showId?: string;
};

type Props = {
  route: RouteProp<{ params: TicketPaymentParams }, "params">;
};

const TicketPayment_screen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<any>();
  const params = route?.params;

  // ---------------- Destructure params ----------------
  const {
    busType = "Normal Express (2+2)",
    travelDate = "",
    departureTime = "",
    adult = 0,
    selectedSeats = "",
    seatPrice = 75000,
    totalAmount = "0",
    boardingPoint = "Chan Mya Shwe Pyi Station",
    source = "Mandalay",
    destination = "Ngapali",
    showId = "",
  } = params ?? {};

  const price = seatPrice;
  const promotion = 0;
  const totalPrice = parseInt(totalAmount) || adult * price;

  // ---------------- Passenger Info ----------------
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nrc, setNrc] = useState("");
  const [remark, setRemark] = useState("");
  const [agree, setAgree] = useState(false);

  // ---------------- Payment Modal ----------------
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<"visa" | "mpu">(
    "mpu"
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* ---------------- Header ---------------- */}
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Passenger Details</Text>
      </View>

      {/* ---------------- Ticket Details ---------------- */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Image
            source={require("../../../../../../../assets/Logo/WW_logo.jpg")}
            style={styles.logo}
          />
          <Text style={styles.busType}>{busType}</Text>
        </View>

        <Row label="Travel Date" value={travelDate} />
        <Row label="Departure Time" value={departureTime} />
        <Row label="Adult" value={adult} />
        <Row label="Selected Seats" value={selectedSeats} />
        <Row label="Price" value={`${price} MMK / ticket`} />
        <Row label="Promotion" value={`${promotion} MMK`} />
        <Row label="Total Ticket Price" value={`${totalPrice} MMK`} />
        <Row label="Boarding Point" value={boardingPoint} />
        <Row label="Source" value={source} />
        <Row label="Destination" value={destination} />
      </View>

      {/* ---------------- Passenger Info ---------------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Passenger Information</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
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

      {/* ---------------- Terms & Conditions ---------------- */}
      <TouchableOpacity
        style={styles.termsRow}
        onPress={() => setAgree((prev) => !prev)}
      >
        <View style={[styles.checkbox, agree ? styles.checked : null]} />
        <Text style={styles.termsText}>
          I have read and agree to the terms and conditions
        </Text>
      </TouchableOpacity>

      {/* ---------------- Confirm Button ---------------- */}
      <TouchableOpacity
        style={[styles.confirmBtn, !agree ? styles.disabledBtn : null]}
        disabled={!agree}
        onPress={() => setShowPaymentModal(true)}
      >
        <Text style={styles.confirmText}>Yes, I Confirm This</Text>
      </TouchableOpacity>

      {/* ---------------- Payment Modal ---------------- */}
      <Modal
        visible={showPaymentModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Payment Method</Text>
            <Text style={styles.subtitle}>
              Choose your preferred payment method
            </Text>

            <View style={styles.amountBox}>
              <Text style={styles.amountLabel}>Total Amount</Text>
              <Text style={styles.amount}>{totalPrice.toLocaleString()} MMK</Text>
              <Text style={styles.traveler}>for {adult} traveler(s)</Text>
            </View>

            <View style={styles.selectBox}>
              <Text style={styles.selectText}>
                Please select one payment method.
              </Text>

              <View style={styles.paymentRow}>
                <TouchableOpacity
                  style={styles.paymentOption}
                  onPress={() => setSelectedPayment("visa")}
                >
                  <View style={styles.radioOuter}>
                    {selectedPayment === "visa" && <View style={styles.radioInner} />}
                  </View>
                  <View style={styles.logoBox}>
                    <Image
                      source={require("../../../../../../../assets/Logo/visa_logo1.png")}
                      style={styles.logoImg}
                    />
                  </View>
                  <Text style={styles.optionText}>Pay with VISA</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.paymentOption}
                  onPress={() => setSelectedPayment("mpu")}
                >
                  <View style={styles.radioOuter}>
                    {selectedPayment === "mpu" && <View style={styles.radioInner} />}
                  </View>
                  <View style={styles.logoBox}>
                    <Image
                      source={require("../../../../../../../assets/Logo/mpu_logo.jpg")}
                      style={styles.logoImg}
                    />
                  </View>
                  <Text style={styles.optionText}>Pay with MPU</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.payButton}
              onPress={() => {
                setShowPaymentModal(false);
                navigation.navigate("BusTicketFinalPayment", {
                  productName: `Bus Ticket - ${busType} (Seats: ${selectedSeats})`,
                  invoiceNumber: `BT-${Date.now()}`,
                  amount: totalPrice,
                  paymentType: selectedPayment.toUpperCase(),
                  date: new Date().toLocaleDateString(),
                  time: new Date().toLocaleTimeString(),
                  recipient: name || "Passenger",
                  ticketData: {
                    busType,
                    adult,
                    price,
                    totalPrice,
                    selectedSeats,
                    source,
                    destination,
                    showId,
                    travelDate,
                    departureTime,
                    seatPrice: price,
                  },
                  passenger: {
                    name,
                    phone,
                    nrc,
                    remark,
                  },
                });
              }}
            >
              <Text style={styles.payText}>Pay Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
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

export default TicketPayment_screen;

// ---------------- Row Component ----------------
const Row = ({ label, value }: { label: string; value: unknown }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{String(value)}</Text>
  </View>
);

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff", padding: 32 },
  header: { flexDirection: "row", alignItems: "center", paddingTop: 40 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
    elevation: 2,
  },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  logo: { width: 90, height: 60, marginRight: 10, resizeMode: "contain" },
  busType: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    color: "#391616",
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
  rowLabel: { color: "#555" },
  rowValue: { fontWeight: "500" },
  sectionTitle: { fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#7ec8c7",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  termsRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  checkbox: { width: 18, height: 18, borderWidth: 1, marginRight: 8 },
  checked: { backgroundColor: "#2aa8a8" },
  termsText: { fontSize: 12 },
  confirmBtn: {
    backgroundColor: "#2aa8a8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledBtn: { backgroundColor: "#ccc" },
  confirmText: { color: "#fff", fontWeight: "bold" },

  // ---------------- Payment Modal Styles ----------------
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 15, textAlign: "center" },
  amountBox: {
    backgroundColor: "#E6F2F2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  amountLabel: { fontSize: 14 },
  amount: { fontSize: 28, color: "#2BA6A4", fontWeight: "bold" },
  traveler: { fontSize: 13 },
  selectBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2BA6A4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  selectText: { marginBottom: 10, fontSize: 14 },
  paymentRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  paymentOption: { width: "45%", alignItems: "center" },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2BA6A4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#2BA6A4" },
  logoBox: {
    width: 70,
    height: 40,
    borderWidth: 1,
    borderColor: "#2BA6A4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  logoImg: { width: 60, height: 30, resizeMode: "contain" },
  optionText: { fontSize: 13 },
  payButton: {
    backgroundColor: "#2BA6A4",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  payText: { color: "white", fontWeight: "bold", textAlign: "center" },
  cancelButton: {
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2BA6A4",
  },
  cancelText: { color: "#2BA6A4", fontWeight: "bold", textAlign: "center" },
});