import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const PAYMENT_CONFIG: Record<
  string,
  { label: string; logo: any }
> = {
  VISA: {
    label: "VISA INTERNATIONAL",
    logo: require("../../../../../../../assets/Logo/visa_logo1.png"),
  },
  MPU: {
    label: "MYANMAR PAYMENT UNION",
    logo: require("../../../../../../../assets/Logo/mpu_logo.jpg"),
  },
};

const BusTicketFinalPaymentScreen = ({ navigation, route }: any) => {
  const {
    productName = "—",
    invoiceNumber = "—",
    amount = 0,
    paymentType = "MPU",
    date = new Date().toLocaleDateString(),
    time = new Date().toLocaleTimeString(),
  } = route?.params || {};

  const payment =
    PAYMENT_CONFIG[paymentType] || PAYMENT_CONFIG.MPU;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>

        <View style={styles.paymentHeader}>
          <Image
            source={payment.logo}
            style={styles.paymentLogo}
            resizeMode="contain"
          />

          <View style={styles.paymentTextWrapper}>
            <Text style={styles.paymentTitle}>
              {payment.label}
            </Text>
            <Text style={styles.paymentSubText}>
              Date: {date} | Time: {time}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <InfoRow
          label="Product Description"
          value={productName}
        />
        <InfoRow
          label="Invoice Number"
          value={invoiceNumber}
        />
        <InfoRow
          label="Amount"
          value={`${amount.toLocaleString()} MMK`}
          bold
        />

        <TextInput
          placeholder="Card Number"
          style={styles.input}
          keyboardType="number-pad"
        />
        <TextInput
          placeholder="Enter Password"
          style={styles.input}
          secureTextEntry
        />
      </View>

    
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>
          CONFIRM PAYMENT
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>
          CANCEL
        </Text>
      </TouchableOpacity>

    
      <View style={styles.footer}>
        <Ionicons
          name="lock-closed"
          size={16}
          color="#000"
        />
        <Text style={styles.footerText}>
          Secure Encrypted transaction
        </Text>
      </View>
    </ScrollView>
  );
};

export default BusTicketFinalPaymentScreen;

const InfoRow = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text
      style={[
        styles.value,
        bold && { fontWeight: "bold" },
      ]}
    >
      {value}
    </Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  card: {
    marginTop: 50,
    borderWidth: 2,
    borderColor: "#ddf2ef",
    borderRadius: 10,
    padding: 16,
  },


  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef8f7",
    padding: 12,
    borderRadius: 6,
  },

  paymentLogo: {
    width: 60,
    height: 40,
    marginRight: 12,
  },

  paymentTextWrapper: {
    flex: 1,
  },

  paymentTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  paymentSubText: {
    fontSize: 12,
    color: "#333",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 14,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
  },

  label: {
    fontSize: 14,
    color: "#555",
  },

  value: {
    fontSize: 14,
    color: "#000",
  },

  input: {
    borderWidth: 1,
    borderColor: "#82c7cf",
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
  },

  confirmButton: {
    backgroundColor: "#21b3a4",
    borderRadius: 6,
    marginTop: 25,
    alignItems: "center",
    paddingVertical: 12,
  },

  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },

  cancelButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 12,
  },

  cancelText: {
    color: "#999",
    fontWeight: "bold",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 20,
  },

  footerText: {
    marginLeft: 6,
    fontSize: 12,
  },
});
