import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import {
  DatePickerModal,
  registerTranslation,
  en,
} from "react-native-paper-dates";

registerTranslation("en", en);

interface DateComponentProps {
  value?: Date;
  onConfirm: (date: Date) => void;
}

const DateComponent: React.FC<DateComponentProps> = ({
  value,
  onConfirm,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.shadowWrapper}>
      <Pressable style={styles.container} onPress={() => setOpen(true)}>
        <TextInput
          mode="flat"
          value={value ? value.toDateString() : "Select date"}
          editable={false}
          pointerEvents="none"
          style={styles.input}
          contentStyle={styles.content}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          right={<TextInput.Icon icon="calendar" color="#1CB5B0" />}
        />
      </Pressable>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        date={value ?? new Date()}
        onDismiss={() => setOpen(false)}
        onConfirm={(params: { date?: Date }) => {
          setOpen(false);
          if (params.date) {
            onConfirm(params.date);
          }
        }}
        validRange={{ startDate: new Date() }}
      />
    </View>
  );
};

export default DateComponent;

const styles = StyleSheet.create({
  shadowWrapper: {
    width: "100%",
    marginBottom: 24,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android shadow
    elevation: 5,
  },

  container: {
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    overflow: "hidden",
  },

  input: {
    backgroundColor: "transparent",
  },

  content: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Poppins",
  },
});