import React, { useState } from "react";
import { View, StyleSheet, Text, Linking, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import ChangePasswordButton from "@/components/SettingComponent/ChangePasswordButton";
import { useNavigation } from "@react-navigation/native";

const AccountSecurityScreen: React.FC = () => {
    const navigation = useNavigation<any>();

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
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 'auto', marginRight: 'auto' }}>
                            Account Security
                        </Text>
                    </View>
            {/* Change Password Button */}
            <View style={{ width: '100%', paddingHorizontal: 32, marginTop: 16 }}>
                <ChangePasswordButton onPress={() => {
                    navigation?.navigate("OldPasswordScreen");
                }} />
            </View>
        </View>
    );
};

export default AccountSecurityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBlockStart: -560,
    },
    header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 24,
    },
});