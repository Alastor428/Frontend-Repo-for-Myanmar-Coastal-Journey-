import React, {useState} from "react";
import { 
    View,
    ScrollView,
    ImageSourcePropType,
    Text,
    StyleSheet,
    Alert
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import HotelComponent from "@/components/HotelBookingComponent/HotelComponent";

const HotelResultScreen: React.FC=() =>{
    const navigation = useNavigation<any>();

    
    // Hotel Data
    const hotels=[
        {
            id:1,
            image: require("../../../../../../assets/Ngapali/i-would-say-the-best.png"),
            title: "Amazing Ngapali Resort",
            location: "https://maps.app.goo.gl/bBPU4YHCVEnozkjW6",
            rating: "5.0",
        }
    ]

    const handleBookPress = (title: string) => {
    if (title === "Amazing Ngapali Resort") {
    //   navigation.navigate("Ngapali1");
    Alert.alert("Amazing Book")
    }
  };

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
                                        Hotel Results
                                    </Text>
                                    </View>
                                </View>

                {/* Bottom */}
                <View style={{width:"100%", paddingHorizontal: 32}}>
                    {hotels.map((hotel) => (
                        <HotelComponent
                            key={hotel.id}
                            imageUrl={hotel.image}
                            title={hotel.title}
                            location={hotel.location}
                            rating={hotel.rating}
                            onPress={() => handleBookPress(hotel.title)}
                        />
                        ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default HotelResultScreen;

const styles= StyleSheet.create({
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