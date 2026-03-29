import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const PassportComponent: React.FC<Props> = ({ value, onChange }) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#1CB5B0" }]}>
          Passport Number*
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}

      <TextInput
        style={[styles.input, isFocus && { borderColor: "#1CB5B0" }]}
        placeholder={!isFocus ? "Passport Number*" : "Enter passport number"}
        value={value}
        onChangeText={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

export default PassportComponent;

const styles = StyleSheet.create({
  container: {
    width: 328,
    paddingTop: 16,
    backgroundColor: "white",
  },

  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 8,
    top: 4,
    zIndex: 999,
    fontSize: 12,
    paddingHorizontal: 8,
    fontFamily: "Poppins",
    fontWeight: "500",
  },

  input: {
    height: 48,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 12,
    borderColor: "rgba(28,181,176,0.5)",
    fontSize: 14,
    fontFamily: "Poppins",
  },
});