import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "react-native-paper";

interface GenderButtonProps {
  value: string | null;
  onChange: (gender: string) => void;
}

const SetGenderButton: React.FC<GenderButtonProps> = ({
  value,
  onChange,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && { color: "#1CB5B0" },
          ]}
        >
          Gender*
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}

      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: "#1CB5B0" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search={false}
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Gender" : "Choose gender..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default SetGenderButton;

const styles = StyleSheet.create({
  container: {
    width: 328,
    paddingTop: 16,
    backgroundColor: "white",
  },

  dropdown: {
    height: 48,
    borderColor: "rgba(28,181,176,0.5)",
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 12,
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

  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Poppins",
  },

  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Poppins",
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});