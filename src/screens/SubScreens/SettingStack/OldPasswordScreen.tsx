import React, { useState } from "react";
import { View, StyleSheet, Text, Linking, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import PasswordComponent from "@/components/AuthComponent/Password";
import SaveButton from "@/components/SettingComponent/SaveButton";
import { useNavigation } from "@react-navigation/native";

interface User {
  id: number;
  password: string;
}

const OldPasswordScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [user, setUser] = useState<User>({
        id: 1,
        password: "12345678",
    });

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleNext = () => {
        if (password === user.password) {
            navigation?.navigate("ChangePasswordScreen");
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    return (
            <View style={styles.container}>
                {/* Header */}
                    <View style={styles.header}>
                        <IconButton
                            icon="chevron-left"   
                            size={32}
                            iconColor="#000"
                            onPress={() => {
                                navigation?.goBack?.();
                            }}
                            style={{ 
                                margin: 0, 
                                padding: 0,
                                backgroundColor: "rgb(255,255,255,0.09)",  
                            }} 
                        />
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 'auto', marginRight: 'auto' }}>
                            Enter Password
                        </Text>
                    </View>

                    {/* Password Input */}
                    <View style={{ width: '100%', paddingHorizontal: 32, marginBottom: 16 }}>
                        <PasswordComponent
                            value={password}
                            onChange={setPassword}
                        />
                    </View>
                    {/* Error Message */}
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    {/* Next Button */}
                    <View style={{ width: "100%", paddingHorizontal: 32, marginTop: 20 }}>
                        <SaveButton onPress={handleNext} />
                    </View>
            </View>
    );
};

export default OldPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBlockStart: -520,
    },
    header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 24,
    },
    errorText: {
    color: "red",
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
    },
});