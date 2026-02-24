import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Linking, Image} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AboutUsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    return (    
    <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", width: '100%'}} >
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
                        About Us
                    </Text>
                    </View>
                    <Image source={require("../../../../assets/Logo/WW_logo.jpg")} style={{ width: 64, height: 64, marginTop: 4, borderRadius: 8, 
                        shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 }} 
                    />
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8, color: "#fff" }}>
                        WaveWay
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: "400", marginTop: 16, color: "#fff" }}>
                        Your Journey,Our passion
                    </Text>
                </View>

                {/* Content */}
                <View style={{ width: '100%', paddingHorizontal: 32, justifyContent: 'center', alignItems: 'center' }}  >
                    <Image source={require("../../../../assets/Other/group_photo.jpg")} style={{ width: 328, height: 160, borderRadius: 16, marginBottom: 24, marginTop: -20 }} />
                    <View style={{  
                        marginBottom: 24,
                        borderRadius: 8,
                        padding: 16,
                        shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        backgroundColor: "#fff",
                        
                    }} 
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                            Our mission
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: "300",  marginTop: 8, color: "#000" }}>
                        At WaveWay, we connect travelers with the soul of Myanmar’s shores. Beyond just bookings, we provide the essential local knowledge needed to navigate our coastal wonders. From bus tickets to boutique stays, our mission is to make every beach journey unforgettable, accessible, and deeply authentic.
                    </Text>
                    </View>
                    <View style={{  
                        marginBottom: 24,
                        borderRadius: 8,
                        padding: 16,
                        shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        backgroundColor: "#fff",
                    }} 
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                            Our Value
                        </Text>
                        <View style={{ marginTop: 8, flexDirection: 'row', flexWrap: 'wrap' }} >
                            <IconButton icon="heart-outline" size={20} iconColor="#1CB5B0" style={{ margin: 0, padding: 0 }} />
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000", marginTop: 9}}    >
                            Customer  First
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: "300", marginTop: 4, color: "#000", marginLeft: 36 }} >
                        Your satisfaction is our top priority in everything we do.
                        </Text>
                        <View style={{ marginTop: 8, flexDirection: 'row', flexWrap: 'wrap' }} >
                            <IconButton icon="earth" size={20} iconColor="#1CB5B0" style={{ margin: 0, padding: 0 }} />
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000", marginTop: 9}}    >
                            Global Reach
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: "300", marginTop: 4, color: "#000", marginLeft: 36 }} >
                        Connecting you to destinations across every continent.
                        </Text>
                        <View style={{ marginTop: 8, flexDirection: 'row', flexWrap: 'wrap' }} >
                            <IconButton icon="lightbulb-outline" size={20} iconColor="#1CB5B0" style={{ margin: 0, padding: 0 }} />
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000", marginTop: 9}}    >
                            Innovation
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: "300", marginTop: 4, color: "#000", marginLeft: 36 }} >
                        Using technology to make travel planning seamless.
                        </Text>
                    </View>
                </View>

                {/* Bottom */}
                <View
                style={{
                    width: '100%',
                    // height: 280,
                    // alignItems: 'center',
                    paddingHorizontal: 32,
                    paddingVertical: 24,
                    backgroundColor: "#79D7D4",
                    // borderTopLeftRadius: 16,
                    // borderTopRightRadius: 16,
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                    <View style={{  
                    marginBottom: 24,
                    padding: 16,
                    }}  
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
                            Get in Touch
                        </Text>
                        <View style={{ marginTop: 8, flexDirection: 'row', flexWrap: 'wrap' }} >
                            <IconButton icon="email-outline" size={20} iconColor="#fff" style={{ margin: 0, padding: 0 }} />
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff", marginTop: 9}}    >
                                waveway@gmail.com
                            </Text>
                        </View>
                        <View style={{ marginTop: 8, flexDirection: 'row', flexWrap: 'wrap' }} >
                            <IconButton icon="phone-outline" size={20} iconColor="#fff" style={{ margin: 0, padding: 0 }} />
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff", marginTop: 9}}    >
                                09123456789
                            </Text>
                        </View>
                        <View style={{ marginTop: 8, flexDirection: 'row' }} >
                            <IconButton icon="map-marker-outline" size={20} iconColor="#fff" style={{ margin: 0, padding: 0 }} />
                            <View style={{ marginLeft: 0 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff", marginTop: 9}}    >
                                    107-108/73 MIIT,Mandalay
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
        </ScrollView> 
    </View>
    );
};

export default AboutUsScreen;

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
    height: 280,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 24,
    backgroundColor: "#79D7D4",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: 'center',
    },
});