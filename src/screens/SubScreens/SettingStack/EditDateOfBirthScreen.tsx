import React, { useState } from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";
import { IconButton } from "react-native-paper";
import DateOfBirth from "@/components/AuthComponent/DateOfBirth";
import SaveButton from "@/components/SettingComponent/SaveButton";
import { useNavigation } from "@react-navigation/native";

const EditDateOfBirthScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [error, setError] = useState("");

  const handleSave = () => {
    Keyboard.dismiss();

    if (!dateOfBirth) {
      setError("Date of Birth cannot be empty");
      return;
    }

    setError("");

    console.log("Updated Date of Birth:", dateOfBirth);
    alert("Date of Birth updated successfully!");
    navigation?.goBack?.();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={28}
          onPress={() => navigation?.goBack?.()}
        />
        <Text style={styles.title}>Edit Date of Birth</Text>
      </View>

        <DateOfBirth
          label="Date of Birth"
          value={dateOfBirth}
          onConfirm={setDateOfBirth}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={{ width: "100%", paddingHorizontal: 32, marginTop: 16 }}>
          <SaveButton onPress={handleSave} />
        </View>
    </View>
  );
};

export default EditDateOfBirthScreen;


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