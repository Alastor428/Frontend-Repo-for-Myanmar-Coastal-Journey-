import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{7,15}$/; 

const SetEmailComponent: React.FC<Props> = ({ value, onChange }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState("");

  const showLabel = value.length > 0 || isFocus;

  const validate = () => {
    if (!value) {
      setError("Email or phone number is required");
      return;
    }

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      setError("Please enter a valid email or phone number");
    } else {
      setError("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {showLabel && (
            <Text style={[styles.label, isFocus && styles.labelFocus]}>
              Email or Phone Number*
            </Text>
          )}

          <TextInput
            style={[
              styles.input,
              isFocus && styles.inputFocus,
              error && styles.inputError,
            ]}
            placeholder={
              !isFocus
                ? "Enter your Email or Phone Number"
                : "@gmail.com / 0912345678"
            }
            placeholderTextColor="#999"
            value={value}
            onChangeText={text => {
              onChange(text);
              if (error) setError("");
            }}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false);
              validate();
            }}
            keyboardType="default"
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

export default SetEmailComponent;

const styles = StyleSheet.create({
  wrapper: {
    width: 328,
  },
  container: {
    backgroundColor: "white",
    width: 328,
    height: 48,
    paddingTop: 16,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 8,
    top: 8,
    zIndex: 999,
    fontSize: 12,
    paddingHorizontal: 8,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  input: {
    height: 48,
    width: 328,
    borderColor: '#1CB5B0',
    opacity: 0.8,
    borderWidth: 0.5,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Poppins',
    paddingLeft: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 0.5,
    // shadowRadius: 4,
    // elevation: 4,
  },
  labelFocus: {
    color: "#1CB5B0",
  },
  inputFocus: {
    borderColor: "#1CB5B0",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    marginTop: 24,
    color: "red",
    fontSize: 12,
    fontFamily: "Poppins",
  },
});
