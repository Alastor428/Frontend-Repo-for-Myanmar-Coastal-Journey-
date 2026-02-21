import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

interface DateOfBirthProps {
  label: string;
  value?: Date;
  onConfirm: (date: Date) => void;
}

const DateOfBirth: React.FC<DateOfBirthProps> = ({
  label,
  value,
  onConfirm,
}) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateDate = (date: Date) => {
    const today = new Date();

    //Future date check
    if (date > today) {
      return "Future dates are not allowed.";
    }

    // Younger than 12 check
    const minDate = new Date(
      today.getFullYear() - 12,
      today.getMonth(),
      today.getDate()
    );

    if (date > minDate) {
      return "You must be at least 12 years old.";
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        mode="outlined"
        value={value ? value.toDateString() : ""}
        editable={false}
        onPressIn={() => setOpen(true)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
        error={!!error}
        contentStyle={{
          fontSize: 14,
          color: "#000",
          fontFamily: "Poppins",
        }}
        outlineColor={isFocused ? "#1CB5B0" : "rgba(28, 181, 176, 0.5)"}
        activeOutlineColor="#1CB5B0"
        right={<TextInput.Icon icon="calendar" color="#1CB5B0" />}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <DatePickerModal
  locale="en"
  mode="single"
  visible={open}
  date={value}
  onDismiss={() => setOpen(false)}
  validRange={{
    endDate: new Date()   // Disable future dates
  }}
  onConfirm={(params: { date?: Date }) => {
    setOpen(false);

    if (params.date) {
      const today = new Date();

      if (params.date > today) {
        setError("Future dates are not allowed.");
        return;
      }

      const minDate = new Date(
        today.getFullYear() - 12,
        today.getMonth(),
        today.getDate()
      );

      if (params.date > minDate) {
        setError("You must be at least 12 years old.");
        return;
      }

      setError(null);
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});