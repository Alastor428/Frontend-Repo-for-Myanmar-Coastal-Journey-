import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface SignInButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const SignUpButton: React.FC<SignInButtonProps> = ({
  onPress,
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>SIGN UP</Text>
      )}
    </TouchableOpacity>
  );
};

export default SignUpButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1CB5B0",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginHorizontal: 48,
    marginTop: 24,
    width: 200,
    height: 40,
  },

  disabledButton: {
    backgroundColor: "#1cb5b0",
  },

  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
