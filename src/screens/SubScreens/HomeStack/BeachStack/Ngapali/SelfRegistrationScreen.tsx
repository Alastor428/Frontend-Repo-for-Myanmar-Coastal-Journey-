import React from "react";
import { View, StyleSheet, Text, Dimensions,Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const SelfRegistrationScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' , marginTop: 40}} >
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
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 'auto', marginRight: 'auto', color: "#000" }}>
                    Self Registration
                </Text>
            </View>
        </View>
        <View style={{width: '100%', paddingHorizontal: 32}}>
            <View style={styles.item}>
                <Pressable
                onPress={() => navigation.navigate("BusTicket")}
                style={({ pressed }) => [
                    styles.iconButton,
                    pressed && styles.pressed,
                ]}
                >
                {/* <MaterialCommunityIcons name="bus" size={24} color="#1CB5B0" /> */}
                <View style={{ position: "relative" }}>
                    <IconButton icon="bus" size={40} iconColor="#1cb5b0" />
                    <IconButton
                    icon="airplane"
                    size={32}
                    iconColor="#1cb5b0"
                    style={{ position: "absolute", right: -6, top: 0 }}
                    />
                </View>
                </Pressable>
                <Text style={[styles.iconLabel, styles.hotelText]} numberOfLines={1}>
                Travel Ticket
                </Text>
            </View>

            <View style={styles.item}>
                <Pressable
                onPress={() => navigation?.navigate("HotelBookingSearchScreen")}
                style={({ pressed }) => [
                    styles.iconButton,
                    pressed && styles.pressed,
                ]}
                >
                <FontAwesome5 name="hotel" size={40} color="#1CB5B0" />
                </Pressable>
                <Text style={[styles.iconLabel, styles.hotelText]} numberOfLines={1}>
                Hotel Booking
                </Text>
            </View>

            <View style={styles.item}>
                <Pressable
                onPress={() => navigation.navigate("TourGuideSearchScreen")}
                style={({ pressed }) => [
                    styles.iconButton,
                    pressed && styles.pressed,
                ]}
                >
                {/* <Ionicons name="person" size={24} color="#1CB5B0" /> */}
                <IconButton icon="account-tie" size={40} iconColor="#1CB5B0" />
                </Pressable>
                <Text style={[styles.iconLabel, styles.tourText]} numberOfLines={1}>
                Tour Guide
                </Text>
            </View>
        </View>
    </View>
      
  );
};

export default SelfRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
        width: '100%',
        // height: 280,
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingBottom: 24,
        // backgroundColor: "#79D7D4",
        // borderBottomLeftRadius: 16,
        // borderBottomRightRadius: 16,
        justifyContent: 'center',
        // position: "absolute",
        // marginTop: -8
    },
    item: {
    width: 68,
    height: 104,
    alignItems: "center",
    // justifyContent: "flex-start",
    gap: 12,
    flexDirection: "row",
    marginBottom: 24,
  },

  iconButton: {
    width: 68,
    height: 68,
    borderRadius: 10,
    backgroundColor: "#E0F0F0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },

  iconLabel: {
    height: 30,
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 30,
    color: "#1E1E1E",
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },

  busText: { width: 200 },
  hotelText: { width: 200 },
  tourText: { width: 200 },
});