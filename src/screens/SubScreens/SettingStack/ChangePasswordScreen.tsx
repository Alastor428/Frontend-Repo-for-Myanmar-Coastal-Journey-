import React ,{useState} from "react";
import { View, StyleSheet, Text, Linking } from "react-native";
import { IconButton } from "react-native-paper";
import PasswordComponent from "@/components/AuthComponent/Password";
import ConfirmPasswordComponent from "@/components/AuthComponent/ConfirmPassword";
import SaveButton from "@/components/SettingComponent/SaveButton";
import { useNavigation } from "@react-navigation/native";

interface User {
  id: number;
  password: string;
}

const ChangePasswordScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [user, setUser] = useState<User>({
            id: 1,
            password: "12345678",
        });

    const handleSave = () => {
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }   
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password === user.password) {
            setError("New password must be different from the current password");
            return;
        }
        else {
            setError("");
            alert("Password changed successfully!");
            navigation?.navigate("MainTabs");
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

                <View style={{ width: '100%', paddingHorizontal: 32 }}>
                    <Text style={{ fontSize: 12, fontWeight: "200" }}>To facilitate your next login,set a password for your account</Text>
                </View>

                {/* Password Input */}
                <View style={{ width: '100%', paddingHorizontal: 32, marginVertical: 16 }}>
                    <PasswordComponent
                        value={password}
                        onChange={setPassword}
                    />
                </View>
                {/* Confirm Password Input */}
                <View style={{ width: '100%', paddingHorizontal: 32, marginBottom: 16 }}>
                    <ConfirmPasswordComponent
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                    />
                </View>
                {/* Error Message */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}  
                {/* Save Button */}
                <View style={{ width: "100%", paddingHorizontal: 32, marginTop: 20 }}>
                    <SaveButton onPress={handleSave} />
                </View>
        </View>
    );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBlockStart: -440,
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