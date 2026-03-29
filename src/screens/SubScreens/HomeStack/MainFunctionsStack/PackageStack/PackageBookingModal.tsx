import React, { useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onProceedToPayment: (payload: { totalAmount: string; travelers: number }) => void;
  pricePerPerson: number;
  title: string;
  duration: string;
};

const PackageBookingModal: React.FC<Props> = ({
  visible,
  onClose,
  onProceedToPayment,
  pricePerPerson,
  title,
  duration,
}) => {
  const [count, setCount] = useState(1);

  const total = count * pricePerPerson;

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalBg}>
        <View style={styles.modalBox}>
          <View style={styles.dragBar} />

          <Text style={styles.title}>Book Your Package</Text>

          <Text style={styles.sub}>
            {title} - {duration}
          </Text>

          {/* Travelers */}
          <View style={styles.travelerBox}>
            <Text>Number of Travelers</Text>

            <View style={styles.row}>
              <Text
                style={styles.circleBtn}
                onPress={() => setCount(count > 1 ? count - 1 : 1)}
              >
                -
              </Text>

              <Text style={{ marginHorizontal: 10 }}>{count}</Text>

              <Text
                style={styles.circleBtn}
                onPress={() => setCount(count < 10 ? count + 1 : 10)}
              >
                +
              </Text>
            </View>

            <Text>Min:1 | Max:10 travellers</Text>
          </View>

          {/* Price */}
          <View style={styles.rowBetween}>
            <Text>Price per person</Text>
            <Text>{pricePerPerson.toLocaleString()} MMK</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>Number of travelers</Text>
            <Text>x {count}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={{ fontWeight: "bold" }}>Total amount</Text>

            <Text style={styles.total}>{total.toLocaleString()} MMK</Text>
          </View>

          {/* Buttons */}

          <View style={styles.payBtn}>
            <Text
              style={{ color: "#fff" }}
              onPress={() => {
                onProceedToPayment({
                  totalAmount: total.toLocaleString(),
                  travelers: count,
                });
                onClose();
              }}
            >
              Proceed to Payment
            </Text>
          </View>

          <View style={styles.cancelBtn} onTouchEnd={onClose}>
            <Text>Cancel</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PackageBookingModal;

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    width: "90%",
  },

  dragBar: {
    width: 60,
    height: 5,
    backgroundColor: "#5cc",
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  sub: {
    textAlign: "center",
    marginBottom: 10,
  },

  travelerBox: {
    backgroundColor: "#d9e3e6",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  circleBtn: {
    width: 30,
    height: 30,
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 15,
    marginVertical: 10,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  total: {
    color: "#2aa7a1",
    fontWeight: "bold",
  },

  payBtn: {
    backgroundColor: "#2aa7a1",
    padding: 12,
    alignItems: "center",
    borderRadius: 6,
    marginTop: 20,
  },

  cancelBtn: {
    backgroundColor: "#ddd",
    padding: 12,
    alignItems: "center",
    borderRadius: 6,
    marginTop: 8,
  },
});
