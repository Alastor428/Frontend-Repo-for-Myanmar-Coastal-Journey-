import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  totalAmount: string;
  travelers: number;
  onPayNow?: (method: "MPU" | "VISA") => void;
};

const HotelPaymentMethodModal: React.FC<Props> = ({
  visible,
  onClose,
  totalAmount,
  travelers,
  onPayNow,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<"MPU" | "VISA">("MPU");

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Payment Method</Text>
          <Text style={styles.subtitle}>Choose your preferred payment method</Text>

          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.amount}>{parseInt(totalAmount).toLocaleString()} MMK</Text>
            <Text style={styles.traveler}>for {travelers} traveler{travelers > 1 ? 's' : ''}</Text>
          </View>

          <View style={styles.selectBox}>
            <Text style={styles.selectText}>Please select one payment method.</Text>
            <View style={styles.paymentRow}>
              <TouchableOpacity
                style={styles.paymentOption}
                onPress={() => setSelectedMethod("VISA")}
              >
                <View style={styles.radioOuter}>
                  {selectedMethod === "VISA" && <View style={styles.radioInner} />}
                </View>
                <View style={styles.logoBox}>
                  <Text style={styles.logoText}>VISA</Text>
                </View>
                <Text style={styles.optionText}>Pay with VISA</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paymentOption}
                onPress={() => setSelectedMethod("MPU")}
              >
                <View style={styles.radioOuter}>
                  {selectedMethod === "MPU" && <View style={styles.radioInner} />}
                </View>
                <View style={styles.logoBox}>
                  <Text style={styles.logoText}>MPU</Text>
                </View>
                <Text style={styles.optionText}>Pay with MPU</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.payButton}
            onPress={() => onPayNow?.(selectedMethod)}
          >
            <Text style={styles.payText}>Pay Now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default HotelPaymentMethodModal;

const styles = StyleSheet.create({
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
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },

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
    borderWidth: 1,
    borderColor: "#2BA6A4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },

  selectText: { marginBottom: 10, fontSize: 14 },

  paymentRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },

  paymentOption: { alignItems: "center", width: "45%" },

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

  logoText: { fontWeight: "bold", color: "#1a4fbf" },

  optionText: { fontSize: 13 },

  payButton: { backgroundColor: "#2BA6A4", padding: 14, borderRadius: 8 },
  payText: { color: "white", textAlign: "center", fontWeight: "bold" },

  cancelButton: { backgroundColor: "#ccc", padding: 14, borderRadius: 8, marginTop: 10 },
  cancelText: { textAlign: "center", color: "white" },
});