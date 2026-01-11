import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

interface DateComponentProps {
  label: string;
  value?: Date;
  onConfirm: (date: Date) => void;
}

const DateComponent: React.FC<DateComponentProps> = ({
  label,
  value,
  onConfirm,
}) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TextInput
        label={label}
        mode="outlined"
        value={value ? value.toDateString() : ""}
        editable={false}
        onPressIn={() => setOpen(true)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
        outlineColor="rgba(28, 181, 176, 0.5)"
        activeOutlineColor="rgba(28, 181, 176, 0.5)"
        theme={{
          colors: {
            primary: value ? "#1cb5b0" : "#000", 
            text: "#000",
          },
          roundness: 8
        }}
        right={<TextInput.Icon icon="calendar" color="#1cb5b0" />}
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

export default DateComponent;

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    backgroundColor: "white",
    marginVertical: 8,
    height: 48,
  },
});
