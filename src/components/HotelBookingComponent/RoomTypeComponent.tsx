import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal
} from "react-native";
import { IconButton, Card, Button } from "react-native-paper";

interface Props {
  rooms: number;
  adults: number;
  onChangeRooms: (value: number) => void;
  onChangeAdults: (value: number) => void;
}

const RoomTypeComponent: React.FC<Props> = ({
  rooms,
  adults,
  onChangeRooms,
  onChangeAdults,
}) => {

  const [visible, setVisible] = useState(false);

  const maxAdults = rooms * 5;

  const increaseRooms = () => {
    onChangeRooms(rooms + 1);
  };

  const decreaseRooms = () => {
    if (rooms > 1) {
      const newRooms = rooms - 1;
      onChangeRooms(newRooms);

      if (adults > newRooms * 2) {
        onChangeAdults(newRooms * 2);
      }
    }
  };

  const increaseAdults = () => {
    if (adults < maxAdults) {
      onChangeAdults(adults + 1);
    }
  };

  const decreaseAdults = () => {
    if (adults > 1) {
      onChangeAdults(adults - 1);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Card style={styles.card}>
          <View style={styles.container}>
            <IconButton
              icon="account"
              size={20}
              iconColor="#7cb5b0"
            />
            <Text style={styles.text}>
              {rooms} {rooms > 1 ? "rooms" : "room"} •{" "}
              {adults} {adults > 1 ? "adults" : "adult"}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>
              Select Rooms & Adults
            </Text>

            <View style={styles.row}>
              <Text>Rooms</Text>
              <View style={styles.counter}>
                <IconButton icon="minus" onPress={decreaseRooms} />
                <Text style={styles.number}>{rooms}</Text>
                <IconButton icon="plus" onPress={increaseRooms} />
              </View>
            </View>

            <View style={styles.row}>
              <Text>Adults</Text>
              <View style={styles.counter}>
                <IconButton icon="minus" onPress={decreaseAdults} />
                <Text style={styles.number}>{adults}</Text>
                <IconButton icon="plus" onPress={increaseAdults} />
              </View>
            </View>

            <Button
              mode="contained"
              onPress={() => setVisible(false)}
              style={styles.doneButton}
            >
              Done
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RoomTypeComponent;

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
    borderRadius: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  text: {
    fontWeight: "500",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 8,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: "#1cb5b0",
  },
});