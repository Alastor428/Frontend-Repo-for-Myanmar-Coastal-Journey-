import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

const FILTER_OPTIONS = ["All", "Ayawady", "Rakhine", "Dawei", "Kawtthaun"];

interface FilterProps {
  onFilterChange?: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selected, setSelected] = useState("All");

  const handlePress = (filter: string) => {
    setSelected(filter);
    onFilterChange?.(filter);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTER_OPTIONS.map((option) => (
          <Pressable
            key={option}
            onPress={() => handlePress(option)}
            style={[styles.chip, selected === option && styles.chipActive]}
          >
            <Text
              style={[
                styles.chipText,
                selected === option && styles.chipTextActive,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    width: "100%",
  },
  scrollContent: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 32,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  chipActive: {
    backgroundColor: "#1CB5AE",
    borderColor: "#1CB5AE",
  },
  chipText: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#666",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
