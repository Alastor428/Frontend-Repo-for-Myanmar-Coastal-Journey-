import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";

interface RememberMeCheckboxProps {
  value: boolean;
  onToggle: () => void;
}

const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({
  value,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onToggle}
    >
      <View style={styles.checkboxWrapper}>
        <Checkbox.Android
          status={value ? "checked" : "unchecked"}
          onPress={onToggle}
          color="#1CB5B0" 
        />
      </View>
      <Text style={styles.label}>Remember me</Text>
    </TouchableOpacity>
  );
};

export default RememberMeCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxWrapper: {
    marginRight: 8,
  },
  label: {
    fontSize: 12,
    color: "#1CB5B0",
  },
});
