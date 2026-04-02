import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import HotelPaymentMethodModal from "./HotelPaymentMethodModel";
import { loadAuthSession } from "@/auth/authStorage";
import { authApi } from "@/api/http";

function formatDateLabel(iso: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso.slice(0, 10);
  }
}

const HotelPaymentScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {
    hotelId = "",
    roomId = "",
    hotelName = "",
    roomType = "",
    pricePerNight = 0,
    beachName = "",
    checkIn = "",
    checkOut = "",
    nights: nightsFromSearch = 1,
    rooms: roomsFromSearch = 1,
    adults: adultsFromSearch = 1,
  } = route?.params || {};

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [remark, setRemark] = useState("");
  const [agree, setAgree] = useState(false);
  const [nights, setNights] = useState(Math.max(1, Number(nightsFromSearch) || 1));
  const [rooms, setRooms] = useState(Math.max(1, Number(roomsFromSearch) || 1));
  const [adults, setAdults] = useState(Math.max(1, Number(adultsFromSearch) || 1));

  const checkOutEffective = useMemo(() => {
    if (!checkIn) return checkOut;
    const d = new Date(checkIn);
    d.setDate(d.getDate() + nights);
    return d.toISOString();
  }, [checkIn, checkOut, nights]);

  // Prefill name/phone from logged-in account (do not override user edits).
  useEffect(() => {
    let active = true;
    (async () => {
      const session = await loadAuthSession();
      if (!active) return;
      if (!session?.accessToken || !session.userId) return;
      try {
        const res = await authApi.getUserById(
          session.userId,
          session.accessToken
        );
        const u = res.data;
        setName((prev) => (prev.trim().length ? prev : u.name ?? ""));
        setPhone((prev) => (prev.trim().length ? prev : u.phone ?? ""));
      } catch {
        // ignore (user can still type manually)
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const ppn = Number(pricePerNight) || 0;
  const maxAdults = rooms * 2;
  const totalPrice = ppn * nights * rooms;

  const [showModal, setShowModal] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 40,
            width: "100%",
          }}
        >
          <IconButton
            icon="chevron-left"
            size={32}
            iconColor="#000"
            onPress={() => navigation.goBack()}
            style={{ margin: 0, padding: 0 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: "auto",
              marginRight: "auto",
              color: "#000",
            }}
          >
            Hotel Booking
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Row label="Hotel" value={hotelName} />
        <Row label="Room" value={roomType} />
        <Row label="Beach" value={beachName || "—"} />
        <Row label="Check-in" value={formatDateLabel(checkIn)} />
        <Row
          label="Check-out"
          value={formatDateLabel(checkOutEffective)}
        />
        <Row
          label="Price / night"
          value={`${ppn.toLocaleString()} MMK`}
        />

        <View style={styles.counterRow}>
          <Text style={styles.counterLabel}>Nights</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => setNights(Math.max(1, nights - 1))}
              style={styles.counterBtn}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterNumber}>{nights}</Text>
            <TouchableOpacity
              onPress={() => setNights(nights + 1)}
              style={styles.counterBtn}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.counterRow}>
          <Text style={styles.counterLabel}>Rooms</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => {
                const nr = Math.max(1, rooms - 1);
                setRooms(nr);
                if (adults > nr * 2) setAdults(nr * 2);
              }}
              style={styles.counterBtn}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterNumber}>{rooms}</Text>
            <TouchableOpacity
              onPress={() => setRooms(rooms + 1)}
              style={styles.counterBtn}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.counterRow}>
          <Text style={styles.counterLabel}>Adults</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => setAdults(Math.max(1, adults - 1))}
              style={styles.counterBtn}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterNumber}>{adults}</Text>
            <TouchableOpacity
              onPress={() => setAdults(Math.min(adults + 1, maxAdults))}
              style={styles.counterBtn}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Row label="Estimated total" value={`${totalPrice.toLocaleString()} MMK`} />
        <Text style={styles.note}>
          Final total is calculated on the server from check-in/out dates.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>Guest</Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Phone"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Remark (optional)"
          style={styles.input}
          value={remark}
          onChangeText={setRemark}
          multiline
        />
      </View>

      <TouchableOpacity
        onPress={() => setAgree(!agree)}
        style={styles.row}
      >
        <View
          style={[styles.checkbox, agree && { backgroundColor: "#2bb6a3" }]}
        />
        <Text>I agree to terms</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, !agree && { backgroundColor: "#ccc" }]}
        disabled={!agree}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.btnText}>Confirm Booking</Text>
      </TouchableOpacity>

      <HotelPaymentMethodModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        totalAmount={totalPrice.toString()}
        travelers={adults}
        onPayNow={(method) => {
          setShowModal(false);
          navigation.navigate("HotelFinalPayment", {
            hotelId,
            roomId,
            hotelName,
            guest: { name, phone },
            rooms,
            adults,
            nights,
            amount: totalPrice,
            paymentType: method,
            remark,
            checkInDate: checkIn,
            checkOutDate: checkOutEffective,
          });
        }}
      />
    </ScrollView>
  );
};

export default HotelPaymentScreen;

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  header: { alignItems: "center", paddingBottom: 24 },
  section: { fontSize: 18, fontWeight: "600", marginBottom: 15, color: "#333" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  value: { fontWeight: "500", textAlign: "right", flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fafafa",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
  },
  btn: {
    backgroundColor: "#1CB5B0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  counterLabel: { fontSize: 16, fontWeight: "500" },
  counter: { flexDirection: "row", alignItems: "center" },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1CB5B0",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  counterText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  counterNumber: {
    fontSize: 16,
    fontWeight: "500",
    minWidth: 20,
    textAlign: "center",
  },
  note: { fontSize: 11, color: "#888", marginTop: 8 },
});
