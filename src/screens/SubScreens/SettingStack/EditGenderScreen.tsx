import React, { useState } from "react";
import { View, StyleSheet, Text, Linking, Keyboard } from "react-native";
import { IconButton } from "react-native-paper";
import SetGenderButton from "@/components/AuthComponent/SetGenderButton";
import SaveButton from "@/components/SettingComponent/SaveButton";
import { useNavigation } from "@react-navigation/native";

const EditGenderScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    Keyboard.dismiss();

    // Check if empty
    if (!gender.trim()) {
      setError("Please select gender");
      return;
    }

    // Clear error
    setError("");

    // Log data (later replace with API)
    console.log("Updated Gender:", gender);

    // Success message
    alert("Gender updated successfully!");

    // Reset field (optional)
    setGender("");

    // Navigate back
    navigation?.goBack?.();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          iconColor="#000"
          onPress={() => navigation?.goBack?.()}
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: "rgb(255,255,255,0.09)",
          }}
        />
        <Text style={styles.title}>Edit Gender</Text>
      </View>

      <View style={{ width: "100%", paddingHorizontal: 32 }}>
        <SetGenderButton
          value={gender}
          onChange={setGender}
        />
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={{ width: "100%", paddingHorizontal: 32, marginTop: 40 }}>
        <SaveButton onPress={handleSave} />
      </View>
    </View>
  );
};

export default EditGenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBlockStart: -480,
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
