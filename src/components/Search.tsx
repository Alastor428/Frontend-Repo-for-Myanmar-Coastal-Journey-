import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Icon } from "react-native-paper";

interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({
  value,
  onChangeText,
  placeholder = "Search Your Destination",
}) => {
  // const [text, setText] = useState<string>("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor="#00000040"
      />

      <Icon source="magnify" size={24} color="#79D7D4" />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
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
    marginBottom: 20,
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
