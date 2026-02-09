import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const stateData = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "13", value: "13" },
  { label: "14", value: "14" },
];

const townshipData = [
  { label: "AhGaYa", value: "AhGaYa" },
  { label: "KaMaYa", value: "KaMaYa" },
  { label: "ThaKaTa", value: "ThaKaTa" },
  { label: "YaKaNa", value: "YaKaNa" },
];

const typeData = [
  { label: "N", value: "N" },
  { label: "P", value: "P" },
  { label: "E", value: "E" },
];

interface SetNRCProps {
  stateValue: string;
  onStateChange: (value: string) => void;
  townshipValue: string;
  onTownshipChange: (value: string) => void;
  typeValue: string;
  onTypeChange: (value: string) => void;
  numberValue: string;
  onNumberChange: (value: string) => void;
}

const SetNRCComponent: React.FC<SetNRCProps> = ({
  stateValue,
  onStateChange,
  townshipValue,
  onTownshipChange,
  typeValue,
  onTypeChange,
  numberValue,
  onNumberChange,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isFocus && styles.labelFocus]}>
        NRC number*
      </Text>

      <View style={styles.row}>
        {/* STATE */}
        <Dropdown
          style={styles.smallDropdown}
          data={stateData}
          labelField="label"
          valueField="value"
          placeholder="1"
          value={stateValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => onStateChange(item.value)}
          selectedTextStyle={styles.dropdownText}
          placeholderStyle={styles.dropdownText}
          itemTextStyle={styles.dropdownItemText}
        />

        <Text>/</Text>

        {/* TOWNSHIP */}
        <Dropdown
          style={styles.mediumDropdown}
          data={townshipData}
          labelField="label"
          valueField="value"
          placeholder="AhGaYa"
          value={townshipValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => onTownshipChange(item.value)}
          selectedTextStyle={styles.dropdownText}
          placeholderStyle={styles.dropdownText}
          itemTextStyle={styles.dropdownItemText}
        />

        <Text>(</Text>

        {/* TYPE */}
        <Dropdown
          style={styles.smallDropdown}
          data={typeData}
          labelField="label"
          valueField="value"
          placeholder="N"
          value={typeValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => onTypeChange(item.value)}
          selectedTextStyle={styles.dropdownText}
          placeholderStyle={styles.dropdownText}
          itemTextStyle={styles.dropdownItemText}
        />
        <Text>)</Text>

        {/* NUMBER */}
        <TextInput
          style={styles.numberInput}
          placeholder="123456"
          keyboardType="numeric"
          maxLength={6}
          value={numberValue}
          onChangeText={onNumberChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </View>
    </View>
  );
};


export default SetNRCComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 328,
    paddingTop: 16,
  },

  /* LABEL */
  label: {
    position: "absolute",
    backgroundColor: "white",
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#999",
    zIndex: 10,
  },
  labelFocus: {
    color: "#1CB5B0",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  /* DROPDOWNS */
  smallDropdown: {
    height: 44,
    width: 50,
    borderColor: "#1CB5B0",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    justifyContent: "center",
    elevation: 4,
  },

  mediumDropdown: {
    height: 44,
    width: 86,
    borderColor: "#1CB5B0",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    justifyContent: "center",
    elevation: 4,
  },

  numberInput: {
    flex: 1,
    height: 44,
    borderColor: "#1CB5B0",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 12,
    fontFamily: "Poppins",
    backgroundColor: "white",
    elevation: 4,
  },

  /* TEXT SIZE FIX */
  dropdownText: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#000",
  },

  dropdownItemText: {
    fontSize: 12,
    fontFamily: "Poppins",
  },
});
