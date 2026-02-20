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
    <View style={styles.container}>
      <Pressable onPress={() => setOpen(true)}>
        <TextInput
          label={label}
          mode="outlined"
          value={value ? value.toDateString() : ""}
          editable={false}
          pointerEvents="none"
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
      />
    </View>
  );
};

export default DateComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 328,
    height: 48,
    marginTop: -4,
    marginBottom: 24,
  },
  input: {
    borderRadius: 8,
    backgroundColor: "white",
    marginVertical: 8,
    height: 48,
  },
});
