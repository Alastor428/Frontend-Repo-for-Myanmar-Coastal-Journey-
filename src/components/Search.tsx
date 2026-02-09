import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Icon } from "react-native-paper";

const Search: React.FC = () => {
const [text, setText] = useState<string>("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Your Destination"
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholderTextColor="#00000040"
      />

      <Icon
        source="magnify"
        size={24}
        color="#79D7D4"
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: 328,
    height: 40,
    position: "absolute",
    top: 166,
    left: 32,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#ffff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  input: {
    flex: 1,
    fontFamily: "OpenSans-Regular",
    fontWeight: "400",
    fontSize: 14,
    color: "#000",
    paddingVertical: 8,
    textAlignVertical: "center",
    marginRight: 8,
  },
});