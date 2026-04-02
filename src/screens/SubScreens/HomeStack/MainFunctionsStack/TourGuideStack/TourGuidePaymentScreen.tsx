import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TourGuidePaymentMethodModal from "./TourGuidePaymentMethodModal";
import { loadAuthSession } from "@/auth/authStorage";
import { createTourGuideBooking } from "@/api/tourGuideApi";
import { authApi } from "@/api/http";

export type TourGuidePaymentParams = {
  tourGuideId: string;
  guideName: string;
  guideLocation: string;
  guidePhone: string;
  guidePricePerDay: number;
  guideCurrency: string;
  guideImage: any;
  startDate: string;
  endDate: string;
};

const TourGuidePayment_screen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const p = route.params as TourGuidePaymentParams | undefined;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nrc, setNrc] = useState("");
  const [remark, setRemark] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
        const identity = (u.nrc ?? u.passport ?? "").toString();
        setNrc((prev) => (prev.trim().length ? prev : identity));
      } catch {
        // ignore
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (!p?.tourGuideId || !p.startDate || !p.endDate) {
    return (
      <View style={styles.container}>
        <Text style={styles.missingParams}>
          Missing booking details. Go back and choose a guide again.
        </Text>
      </View>
    );
  }

  const priceLabel = `${Number(p.guidePricePerDay).toLocaleString()} ${p.guideCurrency} / day`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Image source={p.guideImage} style={styles.image} />
          <Text style={styles.guideName}>{p.guideName}</Text>
        </View>

        <Row label="Location" value={p.guideLocation} />
        <Row label="Phone" value={p.guidePhone} />
        <Row label="Price" value={priceLabel} />
        <Row
          label="Rental period"
          value={`${p.startDate.slice(0, 10)} → ${p.endDate.slice(0, 10)}`}
        />
      </View>

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
          keyboardType="phone-pad"
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
        style={[styles.confirmButton, submitting && { opacity: 0.7 }]}
        disabled={submitting}
        onPress={() => setShowConfirmModal(true)}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.confirmButtonText}>Yes, I Confirm This</Text>
        )}
      </TouchableOpacity>

      <TourGuidePaymentMethodModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onPayNow={async (paymentMethod) => {
          setShowConfirmModal(false);
          const session = await loadAuthSession();
          if (!session) {
            Alert.alert("Sign in required", "Please sign in to book a guide.");
            return;
          }
          setSubmitting(true);
          try {
            const res = await createTourGuideBooking(session.accessToken, {
              tourGuide: p.tourGuideId,
              guestName: name.trim() || undefined,
              startDate: p.startDate,
              endDate: p.endDate,
              currency: p.guideCurrency,
            });
            const booking = res.data;
            const paymentType = paymentMethod === "visa" ? "VISA" : "MPU";
            navigation.navigate("TourGuidePaymentComfirmScreen", {
              bookingId: String(booking._id),
              productName: p.guideName,
              invoiceNumber: String(booking._id),
              amount: booking.totalPrice,
              paymentType,
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
            });
          } catch (e: unknown) {
            const msg =
              e instanceof Error ? e.message : "Could not create booking";
            Alert.alert("Booking failed", msg);
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </ScrollView>
  );
};

export default TourGuidePayment_screen;

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  missingParams: {
    padding: 24,
    fontSize: 15,
    color: "#666",
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
    flex: 1,
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
    flex: 1,
    textAlign: "right",
    marginLeft: 8,
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
    minHeight: 44,
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
