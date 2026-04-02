import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "react-native-paper";
import { SEED_CITY_DROPDOWN_ITEMS } from "@/constants/travelSeedPlaces";

type SourceComponentProps = {
  value?: string | null;
  onChange?: (value: string) => void;
};

const SourceComponent: React.FC<SourceComponentProps> = ({
  value: valueProp,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const value = valueProp ?? internalValue;
  const data = SEED_CITY_DROPDOWN_ITEMS;

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#1CB5B0" }]}>
          From
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#1CB5B0" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "From" : "Choose destination..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          if (onChange) onChange(item.value);
          else setInternalValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Icon source="map-marker" size={20} color={"#1CB5B0"} />
        )}
      />
    </View>
  );
};

export default SourceComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 298,
    height: 48,
    paddingTop: 16,
  },
  dropdown: {
    height: 48,
    width: 298,
    borderColor: "#1CB5B0",
    opacity: 0.8,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  icon: {
    marginRight: 8,
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
    fontWeight: "500",
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
