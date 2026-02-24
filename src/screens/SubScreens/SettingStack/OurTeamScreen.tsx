import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Linking, Image} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const OurTeamScreen: React.FC = () => {
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
                        Our Team
                    </Text>
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8, color: "#fff" }}>
                        Meet the Team
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: "400", marginTop: 16, color: "#fff" }}>
                        The passionate people behind WaveWay
                    </Text>
                </View>

                {/* Content */}
                <View style={{ width: '100%', paddingHorizontal: 32, justifyContent: 'center', alignItems: 'center' }}  >
                    <View style={{  
                        marginBottom: 24,
                        borderRadius: 8,
                        // padding: 16,
                        shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        backgroundColor: "#fff",
                        marginTop: -20,
                        // paddingBottom: 16
                        
                    }} 
                    >
                        <Image source={require("../../../../assets/Other/team_photo.jpg")} style={{ width: 328, height: 160, borderRadius: 8 }} />
                        <Text style={{ fontSize: 14, fontWeight: "300",  marginTop: 8, color: "#000", padding:16 }}>
                            We are the locals who believe that Myanmar’s golden sands should be accessible to everyone. Our team works around the clock to bring you the most accurate beach info and the simplest booking experience for flights, hotels, and tours. We’re here to help you find your perfect wave.
                        </Text>
                    </View>
                    <View style={{  
                        width: "100%",
                        marginBottom: 24,
                        borderRadius: 8,
                        // padding: 16,
                        // shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        // backgroundColor: "#fff",
                    }} 
                    >
                        <View style={{flexDirection: "row"}}>
                            <Image source={require("../../../../assets/Other/SLT.jpg")} style={styles.image} />
                            <View style={{padding:12}}>
                                <Text>Swan Linn Htun</Text>
                                <View style={{flexDirection:"row"}}>
                                    <IconButton 
                                        icon="message-outline" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("mailto:swanlinnhtun123@gmail.com")}
                                        style={{marginLeft:-8}}
                                    />
                                    <IconButton 
                                        icon="phone-outline" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("viber://chat?number=%2B959750468806")}
                                        style={{marginLeft:-8}}
                                    />
                                    <IconButton 
                                        icon="facebook" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("https://www.facebook.com/share/1KaG4ZDwZ9/?mibextid=wwXIfr")}
                                        style={{marginLeft:-8}}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Image source={require("../../../../assets/Other/CMTT.jpg")} style={styles.image} />
                            <View style={{padding:12}}>
                                <Text>Chit Hmue Than Thar</Text>
                                <View style={{flexDirection:"row"}}>
                                    <IconButton 
                                        icon="message-outline" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("mailto:juliawilson757@gmail.com")}
                                        style={{marginLeft:-8}}
                                    />
                                    <IconButton 
                                        icon="phone-outline" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("viber://chat?number=%2B959750468806")}
                                        style={{marginLeft:-8}}
                                    />
                                    <IconButton 
                                        icon="facebook" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("https://www.facebook.com/share/1E1zsXXjrW/")}
                                        style={{marginLeft:-8}}
                                    />
                                </View>
                            </View>
                        </View>
                            <View style={{flexDirection: "row"}}>
                            <Image source={require("../../../../assets/Other/LPPK.jpg")} style={styles.image} />
                            <View style={{padding:12}}>
                                <Text>Linn Pa Pa Khaing</Text>
                                <View style={{flexDirection:"row"}}>
                                    <IconButton 
                                        icon="message-outline" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("mailto:linn.pa.pa.khaing.2020.2021.fb@gmail.com")}
                                        style={{marginLeft:-8}}
                                    />
                                    <IconButton 
                                        icon="phone-outline" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("viber://chat?number=%2B959258707790")}
                                        style={{marginLeft:-8}}
                                    />
                                    <IconButton 
                                        icon="facebook" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("https://www.facebook.com/share/1DQWEWFojk/?mibextid=wwXIfr")}
                                        style={{marginLeft:-8}}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Image source={require("../../../../assets/Other/KSDK.jpg")} style={styles.image} />
                            <View style={{padding:12}}>
                                <Text>Khin Sandakue</Text>
                                <View style={{flexDirection:"row"}}>
                                    <IconButton 
                                        icon="message-outline" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("mailto:khinsandakue035@gmail.com")}
                                        style={{marginLeft:-8}}
                                    />
                                    <IconButton 
                                        icon="phone-outline" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("viber://chat?number=%2B959444788590")}
                                        style={{marginLeft:-8}}
                                    />
                                    <IconButton 
                                        icon="facebook" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("https://https://www.facebook.com/share/195Sv93AjL/")}
                                        style={{marginLeft:-8}}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Image source={require("../../../../assets/Other/WPPA.jpg")} style={styles.image} />
                            <View style={{padding:12}}>
                                <Text>Win Pa Pa Aung</Text>
                                <View style={{flexDirection:"row"}}>
                                    <IconButton 
                                        icon="message-outline" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("mailto:28winpapaaung@gmail.com")}
                                        style={{marginLeft:-8}}
                                    />
                                    <IconButton 
                                        icon="phone-outline" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("viber://chat?number=%2B959890990464")}
                                        style={{marginLeft:-8}}
                                    />
                                    <IconButton 
                                        icon="facebook" 
                                        size={20} 
                                        iconColor="#79d7d4" 
                                        onPress={()=>Linking.openURL("https://www.facebook.com/share/1Ggjyk31bA/")}
                                        style={{marginLeft:-8}}
                                    />
                                </View>
                            </View>
                        </View>
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
                    // padding: 16,
                    }}  
                    >
                        <Text style={{fontSize:14, color:"#fff", fontWeight:"400"}}>
                            "Five minds, one goal: To bring the golden sands of Myanmar closer to you."
                        </Text>
                    </View>
                </View>
        </ScrollView> 
    </View>
    );
};

export default OurTeamScreen;

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