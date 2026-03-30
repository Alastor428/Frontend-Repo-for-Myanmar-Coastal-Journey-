import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const HotelPaymentScreen = ({ route, navigation }: any) => {
  const {
    hotelName = "",
    roomType = "",
    price = "0",
    location = "",
    bedType = "",
  } = route?.params || {};

  const numericPrice = parseInt(price.replace(/[^0-9]/g, "")) || 0;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passport, setPassport] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [nights, setNights] = useState(1);
  const [remark, setRemark] = useState("");
  const [agree, setAgree] = useState(false);

  const totalPrice = numericPrice * nights * rooms;

  const [showModal, setShowModal] = useState(false);
  const [paymentType, setPaymentType] = useState<"MPU" | "VISA">("MPU");

  const handleConfirm = () => setShowModal(true);

  const maxAdults = rooms * 2;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40, width: '100%' }}>
          <IconButton
            icon="chevron-left"
            size={32}
            iconColor="#000"
            onPress={() => navigation?.goBack?.()}
            style={{ margin: 0, padding: 0 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 'auto', marginRight: 'auto', color: "#000" }}>
            Hotel Booking
          </Text>
        </View>
      </View>

      {/* Hotel Info */}
      <View style={styles.card}>
        <Row label="Hotel" value={hotelName} />
        <Row label="Room Type" value={roomType} />
        <Row label="Bed Type" value={bedType} />
        <Row label="Location" value={location} />
        <Row label="Price per night" value={`${numericPrice.toLocaleString()} MMK`} />

        {/* Nights Selector */}
        <View style={styles.counterRow}>
          <Text style={styles.counterLabel}>Nights</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => setNights(Math.max(1, nights - 1))} style={styles.counterBtn}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterNumber}>{nights}</Text>
            <TouchableOpacity onPress={() => setNights(nights + 1)} style={styles.counterBtn}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rooms Selector */}
        <View style={styles.counterRow}>
          <Text style={styles.counterLabel}>Rooms</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => {
              const newRooms = Math.max(1, rooms - 1);
              setRooms(newRooms);
              if (adults > newRooms * 2) setAdults(newRooms * 2);
            }} style={styles.counterBtn}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterNumber}>{rooms}</Text>
            <TouchableOpacity onPress={() => setRooms(rooms + 1)} style={styles.counterBtn}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Adults Selector */}
        <View style={styles.counterRow}>
          <Text style={styles.counterLabel}>Adults</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => setAdults(Math.max(1, adults - 1))} style={styles.counterBtn}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterNumber}>{adults}</Text>
            <TouchableOpacity onPress={() => setAdults(Math.min(adults + 1, maxAdults))} style={styles.counterBtn}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Row label="Total" value={`${totalPrice.toLocaleString()} MMK`} />
      </View>

      {/* Guest Info */}
      <View style={styles.card}>
        <Text style={styles.section}>Guest Info</Text>
        <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
        <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} />
        <TextInput placeholder="Passport" style={styles.input} value={passport} onChangeText={setPassport} />
        <TextInput placeholder="Check-in Date" style={styles.input} value={checkInDate} onChangeText={setCheckInDate} />
        <TextInput placeholder="Check-out Date" style={styles.input} value={checkOutDate} onChangeText={setCheckOutDate} />
        <TextInput placeholder="Remark" style={styles.input} value={remark} onChangeText={setRemark} multiline />
      </View>

      {/* Agree Checkbox */}
      <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.row}>
        <View style={[styles.checkbox, agree && { backgroundColor: "#2bb6a3" }]} />
        <Text>I agree to terms</Text>
      </TouchableOpacity>

      {/* Confirm Button */}
      <TouchableOpacity
        style={[styles.btn, !agree && { backgroundColor: "#ccc" }]}
        disabled={!agree}
        onPress={handleConfirm}
      >
        <Text style={styles.btnText}>Confirm Booking</Text>
      </TouchableOpacity>

      {/* Payment Modal */}
      <Modal visible={showModal} transparent>
        <View style={styles.modal}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>

            <TouchableOpacity style={styles.paymentOption} onPress={() => setPaymentType("MPU")}>
              <View style={[styles.radio, paymentType === "MPU" && styles.radioSelected]} />
              <Image source={require("../../../../../../assets/Logo/mpu_logo.jpg")} style={styles.paymentLogo} />
              <Text>Pay with MPU</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption} onPress={() => setPaymentType("VISA")}>
              <View style={[styles.radio, paymentType === "VISA" && styles.radioSelected]} />
              <Image source={require("../../../../../../assets/Logo/visa_logo1.png")} style={styles.paymentLogo} />
              <Text>Pay with VISA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("HotelFinalPayment", {
                  hotelName,
                  roomType,
                  guestName: name,
                  phone,
                  passport,
                  rooms,
                  adults,
                  nights,
                  totalPrice,
                  paymentType,
                  remark,
                  checkInDate,
                  checkOutDate,
                });
              }}
            >
              <Text style={styles.btnText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HotelPaymentScreen;

// Row helper
const Row = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, elevation: 3 },
  header: { alignItems: "center", paddingBottom: 24 },
  section: { fontSize: 18, fontWeight: "600", marginBottom: 15, color: "#333" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  value: { fontWeight: "500", textAlign: "right", flex: 1 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, marginVertical: 8, backgroundColor: "#fafafa" },
  checkbox: { width: 20, height: 20, borderWidth: 2, borderRadius: 4, marginRight: 12 },
  btn: { backgroundColor: "#1CB5B0", paddingVertical: 15, borderRadius: 12, alignItems: "center", marginTop: 20, marginBottom: 40 },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modal: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalBox: { backgroundColor: "#fff", padding: 30, borderRadius: 16, alignItems: "center", width: "85%" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 25 },
  paymentOption: { flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 20, borderWidth: 1, borderColor: "#eee", borderRadius: 10, marginVertical: 10, width: "100%" },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#ccc", marginRight: 15 },
  radioSelected: { backgroundColor: "#1CB5B0", borderColor: "#1CB5B0" },
  paymentLogo: { width: 50, height: 36, resizeMode: "contain", marginRight: 8 },

  // Counter style
  counterRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 12 },
  counterLabel: { fontSize: 16, fontWeight: "500" },
  counter: { flexDirection: "row", alignItems: "center" },
  counterBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#1CB5B0", justifyContent: "center", alignItems: "center", marginHorizontal: 8 },
  counterText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  counterNumber: { fontSize: 16, fontWeight: "500", minWidth: 20, textAlign: "center" },
});