import React, { useState } from "react";
import { View, StyleSheet, Text, Linking, Keyboard } from "react-native";
import { IconButton } from "react-native-paper";
import SetUserNameComponent from "@/components/AuthComponent/SetUserName";
import SaveButton from "@/components/SettingComponent/SaveButton";
import { useNavigation } from "@react-navigation/native";

const EditNameScreen: React.FC = () => {
  const [signupUserName, setSignupUserName] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation<any>();

  const handleSave = () => {
    Keyboard.dismiss();

    // Check if empty
    if (!signupUserName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    // Clear error
    setError("");

    // Log data (later replace with API)
    console.log("Updated Name:", signupUserName);

    // Success message
    alert("Name updated successfully!");

    // Reset field (optional)
    setSignupUserName("");

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
        <Text style={styles.title}>Edit Name</Text>
      </View>

      <View style={{ width: "100%", paddingHorizontal: 32 }}>
        <SetUserNameComponent
          value={signupUserName}
          onChange={setSignupUserName}
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

export default EditNameScreen;


const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBlockStart: -480,
    },
    header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 24,
    },
    title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 'auto',
    marginRight: 'auto',
    },
    errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    },
})