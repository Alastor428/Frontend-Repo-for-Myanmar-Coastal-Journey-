import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Linking, Image} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ReportAPloblemScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    return (    
    <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", width: '100%'}} >
             {/* Header */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' , marginTop: 40}} >
                        <IconButton
                            icon="chevron-left"   
                            size={32}
                            iconColor="#fff"
                            onPress={() => navigation?.goBack?.()}
                            style={{ 
                            margin: 0, 
                            padding: 0,
                            backgroundColor: "rgb(255,255,255,0.09)",  
                            }} 
                        />
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 'auto', marginRight: 'auto', color: "#fff" }}>
                        Report a Ploblem
                    </Text>
                    </View>
                    <View style={{flexDirection:"row", marginTop:12}}>
                        <IconButton 
                        icon="alert-circle"
                        iconColor="#fff"
                        size={16}
                        />
                        <Text style={{color:"#fff", marginTop:8}}>Help us improve by reporting any issues you encounter</Text>
                    </View>
                </View>
        </ScrollView> 
    </View>
    );
};

export default ReportAPloblemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    marginBlockStart: 0,
    },
    header: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 24,
    backgroundColor: "#79D7D4",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: 'center',
    },
    image: {
        width: 64,
        height: 64,
    }
}); 