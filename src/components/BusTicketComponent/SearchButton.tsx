import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

interface SearchComponentProps {
  onPress: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>Search</Text>
    </TouchableOpacity>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    width: 328,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#1CB5B0",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
});
