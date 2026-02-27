import React, {useState} from "react";
import { 
    View,
    ScrollView,
    ImageSourcePropType,
    Text,
    StyleSheet,
    Alert, 
    Image, 
    TouchableOpacity,
    Linking
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

interface Hotel {
  id: number;
  name: string;
  photo: any;
  overview: string;
  location: string;
  map: string; 
}

const HotelDetailScreen: React.FC=() =>{
    const navigation = useNavigation<any>();
    const [isExpanded, setIsExpanded] = useState(false);

const [hotel, setHotel] = useState<Hotel>({
  id: 1,
  name: "Diamond Hotel Ngapali",
  photo: require("../../../../../../assets/Ngapali/Hotels/DiamondHotel.webp"),
  overview: `With a stay at Diamond Hotel Ngapali in Ngapali, you'll be near the beach, just a 1-minute walk from Ngapali Beach and 11 minutes by foot from Gyeiktaw Market. 
This hotel is 1.9 mi (3.1 km) from Standing Buddha and 3.8 mi (6.1 km) from Ngapali Golf Course.

Take advantage of recreation opportunities such as an outdoor pool or take in the view from a terrace and a garden. Additional amenities at this hotel include complimentary wireless internet access, concierge services, and gift shops/newsstands.

Satisfy your appetite for lunch or dinner at the hotel's restaurant, or stay in and take advantage of the room service (during limited hours). Quench your thirst with your favorite drink at the bar/lounge.

Featured amenities include a business center, complimentary newspapers in the lobby, and dry cleaning/laundry services. Guests may use a roundtrip airport shuttle for a surcharge, and free self parking is available onsite.

Make yourself at home in one of the 54 air-conditioned rooms featuring minibars and flat-screen televisions. Complimentary wireless internet access keeps you connected, and cable programming is available for your entertainment. Private bathrooms with bathtubs or showers feature complimentary toiletries and hair dryers. Conveniences include safes and desks, and housekeeping is provided daily.`,
  location: "Ngapali",
  map: "https://maps.app.goo.gl/Cf36Pn72sGqY7ecK7"
});

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1,  width: '100%', paddingBottom:80, paddingTop:24}}>
                {/* Header */}
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
                                                        {hotel.name}
                                                    </Text>
                                                    </View>
                                                </View>
                
                {/* Overview */}
                <View style={{width:"100%"}}>
                    <Image source={hotel.photo} style={{ width: "100%", height: 196 }} />
                </View>
                <View style={{paddingHorizontal:32, marginTop:24}}>
                    <Text style={{fontSize:14, fontWeight: "500",textDecorationLine: "underline"}}>Overview</Text>
                    <View style={{marginTop:16}}>
                              <Text
                                style={{
                                //   paddingHorizontal: 32,
                                  fontFamily: "Poppins",
                                  fontSize: 12,
                                  color: "#555",
                                }}
                                numberOfLines={isExpanded ? undefined : 3}
                              >
                                {hotel.overview}
                            </Text>
                        <TouchableOpacity
                        onPress={() => setIsExpanded(!isExpanded)}
                        style={{  paddingTop: 4 }}
                        >
                            <Text style={{ color: "#1CB5B0", fontWeight: "bold" }}>
                                {isExpanded ? "Read Less" : "Read More"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flexDirection:"row"}}>
                            <IconButton
                            icon="map-marker"
                            size={24}
                            iconColor="#1CB5B0"
                            style={{marginLeft:-8}}
                            />
                            <Text style={{marginTop:16, marginLeft:-8}}>{hotel.location}</Text>
                        </View>
                        <View style={{flexDirection:"row", marginLeft:"auto"}}>
                            <Text 
                            onPress={() =>
                                            Linking.openURL(hotel.map)
                                          }
                            style={{marginTop:16,fontSize: 12,
                            color: "#1CB5B0",
                            marginLeft: 8,
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            textDecorationLine: "underline"
                            }}>
                                view map
                            </Text>
                            <IconButton
                                          icon="chevron-right"
                                          size={20}
                                          iconColor="#1CB5B0"
                                          style={{ marginHorizontal: -8 }}
                                        />
                        </View>
                    </View>

                    {/* Room */}
                    <Text style={{fontSize:14, fontWeight: "500",textDecorationLine: "underline"}}>Rooms</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default HotelDetailScreen;

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        justifyContent: "center",
        marginBlockStart: 0,
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
});