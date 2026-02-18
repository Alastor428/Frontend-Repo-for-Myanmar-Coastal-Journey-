import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../../../../navigation/BusTicketStack/BusTicketPayment_rootnav";

type Props = {
  route: RouteProp<RootStackParamList, "TicketConfirm">;
};

const TicketPayment_screen: React.FC<Props> = ({ route }) => {
  const params = route?.params;

  /* ---------- Safe destructuring ---------- */
  const busType = params?.busType ?? "";
  const travelDate = params?.travelDate ?? "";
  const departureTime = params?.departureTime ?? "";
  const adult = params?.adult ?? 0;
  const price = params?.price ?? 0;
  const promotion = params?.promotion ?? 0;
  const totalPrice = params?.totalPrice ?? 0;
  const boardingPoint = params?.boardingPoint ?? "";

  /* ---------- States ---------- */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nrc, setNrc] = useState("");
  const [remark, setRemark] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<"visa" | "mpu">("mpu");

  const [agree, setAgree] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    

    >
      {/* ================= Ticket Details ================= */}
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
        <Row label="Price" value={`${price} MMK / ticket`} />
        <Row label="Promotion" value={`${promotion} MMK`} />
        <Row label="Total Ticket Price" value={`${totalPrice} MMK`} />
        <Row label="Boarding Point" value={boardingPoint} />
      </View>

      {/* ================= Passenger Info ================= */}
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

      {/* ================= Payment Method ================= */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Please Select One Payment Method
        </Text>

        <View style={styles.paymentRow}>
          <PaymentOption
            label="Pay with VISA"
            selected={paymentMethod === "visa"}

            onPress={() => setPaymentMethod("visa")}
            image={require("../../../../../../../assets/Logo/visa_logo1.png")}
          />

          <PaymentOption
            label="Pay with MPU"
            selected={paymentMethod === "mpu"}

            onPress={() => setPaymentMethod("mpu")}
            image={require("../../../../../../../assets/Logo/mpu_logo.jpg")}
          />
        </View>
      </View>

      {/* ================= Terms ================= */}
      <TouchableOpacity
        style={styles.termsRow}
        onPress={() => setAgree((prev) => !prev)}
      >
        <View
  style={[
    styles.checkbox,
    agree ? styles.checked : null,
  ]}
/>

        <Text style={styles.termsText}>
          I have read and agree to the terms and conditions
        </Text>
      </TouchableOpacity>

      {/* ================= Confirm Button ================= */}
   <TouchableOpacity
  style={[
    styles.confirmBtn,
    !agree ? styles.disabledBtn : null,
  ]}
  disabled={Boolean(!agree)}

>

        <Text style={styles.confirmText}>Yes, I Confirm This</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TicketPayment_screen;

/* ================= Row ================= */

const Row = ({ label, value }: { label: string; value: unknown }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{String(value)}</Text>
  </View>
);

/* ================= Payment Option ================= */

type PaymentProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  image: any;
};

const PaymentOption: React.FC<PaymentProps> = ({
  label,
  selected,
  onPress,
  image,
}) => (
  <TouchableOpacity style={styles.paymentItem} onPress={onPress}>
    <View
      style={[
        styles.radio,
        selected ? styles.radioSelected : null,
      ]}
    />
    <Image source={image} style={styles.paymentLogo} />
    <Text>{label}</Text>
  </TouchableOpacity>
);



/* ================= Styles ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 15,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 6,
    marginBottom: 15,
    elevation: 2,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    width: 90,
    height: 60,
    marginRight: 10,
    resizeMode: "contain",
  },

  busType: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    color: "#391616",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  rowLabel: {
    color: "#555",
  },

  rowValue: {
    fontWeight: "500",
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#7ec8c7",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  paymentItem: {
    alignItems: "center",
  },

  paymentLogo: {
    width: 60,
    height: 40,
    resizeMode: "contain",
    marginVertical: 5,
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#888",
    marginBottom: 5,
  },

  radioSelected: {
    backgroundColor: "#2aa8a8",
  },

  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    marginRight: 8,
  },

  checked: {
    backgroundColor: "#2aa8a8",
  },

  termsText: {
    fontSize: 13,
  },

  confirmBtn: {
    backgroundColor: "#2aa8a8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  disabledBtn: {
    backgroundColor: "#ccc",
  },

  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
