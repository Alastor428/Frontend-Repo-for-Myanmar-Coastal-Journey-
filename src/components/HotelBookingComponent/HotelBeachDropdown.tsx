import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "react-native-paper";
import { SEED_BEACH_DROPDOWN_ITEMS } from "@/constants/travelSeedPlaces";

type Props = {
  value?: string | null;
  onChange?: (value: string) => void;
};

const HotelBeachDropdown: React.FC<Props> = ({ value: valueProp, onChange }) => {
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const value = valueProp ?? internalValue;

  return (
    <View style={styles.wrap}>
      <Text style={styles.caption}>Beach</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#1CB5B0" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={SEED_BEACH_DROPDOWN_ITEMS}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select beach" : "Search beach..."}
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

export default HotelBeachDropdown;

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  caption: {
    fontSize: 12,
    marginHorizontal: 8,
    marginBottom: 4,
  },
  dropdown: {
    height: 48,
    borderColor: "#1CB5B0",
    opacity: 0.9,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  placeholderStyle: { fontSize: 14, color: "#999" },
  selectedTextStyle: { fontSize: 14 },
  inputSearchStyle: { height: 40, fontSize: 14 },
  iconStyle: { width: 20, height: 20 },
});
