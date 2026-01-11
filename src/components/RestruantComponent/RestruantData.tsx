import { useState } from "react";
import React from "react";
import { 
    View,
    StyleSheet,
    Pressable,
    Linking
} from "react-native";
import { 
    Icon,
    Text,
    Card,
    IconButton
 } from "react-native-paper";

interface RestruantDataComponentProps{
    title: string;
    phone: string;
    time: string;
    location: string;
    map: string;
}
const RestruantDataComponent: React.FC<RestruantDataComponentProps>=({
    title,
    phone,
    time,
    location,
    map,
})=> {
    const handleOpenMap = () => {
  Linking.openURL(map);
};


    return(
        <Card style={styles.card}>
            <View style={styles.nametime}>
                <View style={styles.title}>
                    <Text style={styles.titletext}>{title}</Text>
                </View>
                <View style={styles.tc}>
                    <IconButton
                        icon="clock"
                        size={16}
                        iconColor="#1CB5B0"
                        style={{marginTop:-8, marginRight:-8}}
                    />
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>
            <View style={styles.place}>
                <View style={styles.location}>
                    <IconButton
                        icon="map-marker"
                        size={16}
                        iconColor="#1CB5B0"
                        style={{marginTop:-8, marginLeft:-8, marginRight:0}}
                    />
                    <Text style={styles.time}>{location}</Text>
                </View>
                
                <Pressable
                onPress={handleOpenMap}
                style={{ 
                    flexDirection: "row",
                    paddingLeft: 116,
                 }}
                >
                    <Text
                        style={{
                        fontFamily: "Poppins",
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#1CB5B0",
                        textDecorationLine: "underline",
                        }}
                    >
                        view map
                    </Text>
                    <IconButton
                    icon="chevron-right"
                    size={16}
                    iconColor="#1cb5b0"
                    style={{margin:-8}}
                    />
                </Pressable>
            </View>
            <View 
                style={{flexDirection:"row",
                paddingHorizontal: 24,
                marginTop:-4
            }}>
                <IconButton
                icon="phone"                    
                size={16}
                iconColor="#1cb5b0"
                style={{
                    marginTop:-8,
                    marginHorizontal: -4
                }}
                />
                <Text style={styles.time}>{phone}</Text>
            </View>
        </Card>
    );
};
export default RestruantDataComponent;

const styles= StyleSheet.create({
    card: {
        borderRadius: 12,
        width: 300,
        height: 88,
        shadowColor: "#000",
        shadowOffset: {width:0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        backgroundColor: "#fff",
    },
    nametime:{
        flexDirection: "row",
        paddingTop: 8,
        height: 28,
    },
    title:{
        width: 122,
        marginLeft: 24,
    },
    titletext:{
        fontFamily: "Poppin",
        fontSize: 18,
        fontWeight: "500",
    },
    time:{
        fontFamily: "Poppin",
        fontSize: 12,
        fontWeight: "200",
    },
    tc:{
        flexDirection: "row",
        marginTop:4,
        paddingLeft: 24,
        // width:84,
    },
    place:{
        flexDirection: "row",
        paddingTop: 8,
        // height: 24,
        paddingHorizontal: 24
    },
    location:{
        flexDirection: "row",
    },
})