import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, View } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

const phoneLocalOrIntlRegex = /^(\+?[0-9\s-]{7,20}|09[0-9]{7,9})$/;

const Phone: React.FC<Props> = ({ value, onChange }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState("");

  const showLabel = value.length > 0 || isFocus;

  const validate = () => {
    if (!value) {
      setError("Phone number is required");
      return;
    }
    if (!phoneLocalOrIntlRegex.test(value)) {
      setError("Enter a valid phone number (e.g. 09xxxxxxx or +959...)");
      return;
    }
    setError("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {showLabel && (
            <Text style={[styles.label, isFocus && styles.labelFocus]}>Phone Number*</Text>
          )}
          <TextInput
            style={[
              styles.input,
              isFocus && styles.inputFocus,
              error && styles.inputError,
            ]}
            placeholder={!isFocus ? "0912345678 or +959..." : "0912345678 or +959..."}
            placeholderTextColor="#999"
            value={value}
            onChangeText={(text) => {
              onChange(text);
              if (error) setError("");
            }}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false);
              validate();
            }}
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              validate();
            }}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Phone;

const styles = StyleSheet.create({
  wrapper: { width: 328 },
  container: {
    backgroundColor: "white",
    width: 328,
    height: 48,
    paddingTop: 16,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 8,
    top: 8,
    zIndex: 999,
    fontSize: 12,
    paddingHorizontal: 8,
    fontFamily: "Poppins",
    color: "#999",
    fontWeight: "500",
  },
  labelFocus: { color: "#1CB5B0" },
  input: {
    height: 48,
    width: 328,
    borderColor: "#1CB5B0",
    opacity: 0.8,
    borderWidth: 0.5,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "Poppins",
    paddingLeft: 10,
  },
  inputFocus: { borderColor: "#1CB5B0" },
  inputError: { borderColor: "red" },
  errorText: {
    marginTop: 24,
    color: "red",
    fontSize: 12,
    fontFamily: "Poppins",
  },
});

