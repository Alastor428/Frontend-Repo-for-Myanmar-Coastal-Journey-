// File: components/AuthComponent/DateOfBirth.tsx
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

interface DateOfBirthProps {
  label: string;
  value?: Date;
  onConfirm: (date: Date) => void;
}

const DateOfBirth: React.FC<DateOfBirthProps> = ({ label, value, onConfirm }) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        mode="outlined"
        value={value ? value.toDateString() : ""}
        editable={false}           // So user cannot type manually
        onPressIn={() => setOpen(true)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
        contentStyle={{
          fontSize: 14,
          color: "#000",
          fontFamily: "Poppins",
        }}
        outlineColor={isFocused ? "#1CB5B0" : "rgba(28, 181, 176, 0.5)"}
        activeOutlineColor="#1CB5B0"
        theme={{
          roundness: 8,
          colors: {
            primary: "#1CB5B0",
            text: "#000",
          },
          fonts: {
            bodyLarge: {
              fontSize: 12,
              fontFamily: "Poppins",
              fontWeight: "500",
            },
          },
        }}
        right={<TextInput.Icon icon="calendar" color="#1CB5B0" />}
      />

      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        date={value}
        onDismiss={() => setOpen(false)}
        onConfirm={(params: { date?: Date }) => {
          setOpen(false);
          if (params.date) {
            onConfirm(params.date);
          }
        }}
      />
    </View>
  );
};

export default DateOfBirth;

const styles = StyleSheet.create({
  container: {
    width: 328,
    marginTop: -4,
    marginBottom: 24,
  },
  input: {
    borderRadius: 8,
    backgroundColor: "white",
    height: 48,
  },
});
