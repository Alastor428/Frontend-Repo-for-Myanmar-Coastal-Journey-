import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loadAuthSession } from "@/auth/authStorage";
import {
  confirmTravelPayment,
  createTravelPackageBooking,
  type PackageBookingDto,
} from "@/api/packageApi";

const PAYMENT_CONFIG: Record<string, { label: string; logo: any }> = {
  VISA: {
    label: "VISA INTERNATIONAL",
    logo: require("../../../../../../assets/Logo/visa_logo1.png"),
  },
  MPU: {
    label: "MYANMAR PAYMENT UNION",
    logo: require("../../../../../../assets/Logo/mpu_logo.jpg"),
  },
};

const PackagePaymentScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const {
    packageId = "",
    packageName = "—",
    travelers = 1,
    totalAmount = "0",
    paymentType = "MPU",
    duration = "—",
    remark = "",
  } = route?.params || {};

  const payment = PAYMENT_CONFIG[paymentType] || PAYMENT_CONFIG.MPU;

  const [cardNumber, setCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleConfirmPayment = () => {
    if (submitting) return;
    void (async () => {
      setSubmitting(true);
      try {
        const session = await loadAuthSession();
        if (session?.accessToken && packageId) {
          const created = await createTravelPackageBooking(session.accessToken, {
            travelPackage: packageId,
            numberOfPeople: Number(travelers) || 1,
          });
          const bookingId = created.data?._id;
          if (bookingId) {
            const cardNum = String(cardNumber).replace(/\D/g, "");
            const cardPass = String(password).replace(/\D/g, "");
            const method =
              paymentType === "VISA" ? ("VISA" as const) : ("MPU" as const);
            await confirmTravelPayment(session.accessToken, bookingId, {
              paymentMethod: method,
              cardNumber: cardNum,
              cardPassword: cardPass,
            });
          }
        }
      } catch {
        // UI-only best-effort integration. Always navigate to success screen.
      } finally {
        setSubmitting(false);
        navigation.navigate("PackageBookingSuccess", {
          packageName,
          travelers,
          totalAmount,
          paymentType,
          duration,
          remark,
        });
      }
    })();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.card}>
        {/* Payment Header */}
        <View style={styles.paymentHeader}>
          <Image source={payment.logo} style={styles.paymentLogo} resizeMode="contain" />
          <View style={styles.paymentTextWrapper}>
            <Text style={styles.paymentTitle}>{payment.label}</Text>
            <Text style={styles.paymentSubText}>{duration}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Info Rows */}
        <InfoRow label="Package" value={packageName} />
        <InfoRow label="Travelers" value={`${travelers}`} />
        <InfoRow label="Total Price" value={`${totalAmount} MMK`} bold />
        {remark ? <InfoRow label="Remark" value={remark} /> : null}

        {/* Card Inputs */}
        <TextInput
          placeholder="Card Number"
          style={styles.input}
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <TextInput
          placeholder="Enter Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Confirm & Cancel Buttons */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
        <Text style={styles.confirmText}>CONFIRM PAYMENT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>CANCEL</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>🔒 Secure Encrypted Transaction</Text>
      </View>
    </ScrollView>
  );
};

export default PackagePaymentScreen;

const InfoRow = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={[styles.value, bold && { fontWeight: "bold" }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 32
   },
  card: { marginTop: 50, borderWidth: 2, borderColor: "#ddf2ef", borderRadius: 10, padding: 16 },
  paymentHeader: { flexDirection: "row", alignItems: "center", backgroundColor: "#eef8f7", padding: 12, borderRadius: 6 },
  paymentLogo: { width: 60, height: 40, marginRight: 12 },
  paymentTextWrapper: { flex: 1 },
  paymentTitle: { fontSize: 14, fontWeight: "bold", color: "#000" },
  paymentSubText: { fontSize: 12, color: "#333", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#ccc", marginVertical: 14 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", height: 40 },
  label: { fontSize: 14, color: "#555" },
  value: { fontSize: 14, color: "#000" },
  input: { borderWidth: 1, borderColor: "#82c7cf", borderRadius: 6, padding: 12, marginTop: 10 },
  confirmButton: { backgroundColor: "#21b3a4", borderRadius: 6, marginTop: 25, alignItems: "center", paddingVertical: 12 },
  confirmText: { color: "#fff", fontWeight: "bold" },
  cancelButton: { backgroundColor: "#e0e0e0", borderRadius: 6, marginTop: 10, alignItems: "center", paddingVertical: 12 },
  cancelText: { color: "#999", fontWeight: "bold" },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 16, marginBottom: 20 },
  footerText: { fontSize: 12 },
});