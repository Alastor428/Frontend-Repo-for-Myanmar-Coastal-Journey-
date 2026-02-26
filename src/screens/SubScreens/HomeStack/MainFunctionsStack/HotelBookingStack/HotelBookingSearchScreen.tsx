import React, {useState} from "react";
import { 
    View,
    ScrollView,
    Text,
    StyleSheet,
    Alert, 
    Image
 } from "react-native";
 import { IconButton, Icon } from "react-native-paper";
 import Search from "@/components/Search";
 import SearchComponent from "@/components/BusTicketComponent/SearchButton";
 import SetDateComponent from "@/components/HotelBookingComponent/SetDateComponent";
 import RoomTypeComponent from "@/components/HotelBookingComponent/RoomTypeComponent";
 import Trending from "@/components/BeachComponent/Trending";
 import { useNavigation } from "@react-navigation/native";

 const HotelBookingSearchScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [StartDate, setStartDate] = useState<Date | undefined>();
    const [EndDate, setEndDate] = useState<Date | undefined>();
    const [searchText, setSearchText] = useState("");
    const [rooms, setRooms] = useState<number>(1);
    const [adults, setAdults] = useState<number>(1);

    // Search Hotel
    const handleSearch = () => {
        if (
            !StartDate ||
            !EndDate ||
            searchText.trim().length === 0
        ) {
            Alert.alert("Error", "Please set all data");
            return;
        }

        if (StartDate > EndDate) {
            Alert.alert(
                "Error",
                "Start date cannot be greater than due date"
            );
            return;
        }

        if (StartDate.getTime() >= EndDate.getTime()) {
        Alert.alert(
            "Error",
            "Check-out date must be after check-in date"
        );
        return;
        }

        const searchPayload = {
        searchText: searchText.trim(),
        startDate: StartDate.toISOString(),
        dueDate: EndDate.toISOString(),
        rooms,
        adults,
        };

        console.log("Search Payload:", searchPayload);
        navigation?.navigate("HotelResultScreen")
    };


    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", width: '100%', paddingBottom:80}} >

                {/* header */}
                <View>
                    <Image 
                    source={require("../../../../../../assets/Ngapali/Hotels/hotel_photo.jpg")}
                    style={{width:393, height:226, borderBottomLeftRadius: 24, borderBottomRightRadius:24}}
                    />
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
                                        Hotel Booking
                                    </Text>
                                    </View>
                </View>
                </View>
                <View style={{ width: '100%', paddingHorizontal: 32, justifyContent: 'center', alignItems: 'center', marginTop: -80 }} >
                    <View
                    style={{  
                        marginBottom: 24,
                        borderRadius: 8,
                        //padding: 16,
                        shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        backgroundColor: "#fff",
                        marginTop: -20,
                        paddingVertical: 16                        
                    }} 
                    >
                        <View style={{paddingHorizontal:8}}>
                            <Search
                            value={searchText}
                            onChangeText={setSearchText}
                            />
                        </View>
                        <View style={{paddingHorizontal:8, flexDirection: "row"}}>
                            <View style={{width:"48%"}}>
                                <Text style={{fontSize:12, marginHorizontal:8}}>Start Date</Text>
                                <SetDateComponent 
                                value={StartDate}
                                onConfirm={(date) => setStartDate(date)}
                                />
                            </View>
                            <View style={{width:"48%", marginLeft:"auto"}}>
                                <Text style={{fontSize:12, marginHorizontal:8}}>Due Date</Text>
                                <SetDateComponent 
                                value={EndDate}
                                onConfirm={(date) => setEndDate(date)}
                                />
                            </View>
                        </View>
                        <View style={{paddingHorizontal:8}}>
                            <RoomTypeComponent
                            rooms={rooms}
                            adults={adults}
                            onChangeRooms={setRooms}
                            onChangeAdults={setAdults}
                            />
                        </View>
                        <View style={{paddingHorizontal:8, flexDirection: 'row'}}>
                            <View style={{borderRadius:50, width:40, height:40, backgroundColor:"#fff",
                                shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,}}>
                                <IconButton
                                icon="map"
                                size={24}
                                iconColor="#1CB5B0"
                                style={{
                                    marginTop : 0,
                                    marginLeft: 0
                                }}
                                />
                            </View>
                            <View style={{marginLeft:'auto', width:"85%"}}>
                                <SearchComponent onPress={handleSearch}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width:"100%", paddingHorizontal: 32}}>
                    <Trending/>
                </View>
                <View style={{ width:"100%", paddingHorizontal: 32, marginTop:12}}>
                    <Text style={{fontSize:16, fontWeight:"bold"}}>Offers</Text>
                    <Image 
                    source={require("../../../../../../assets/Ngapali/NP5.png")}
                    style={{width:327, height:168, borderRadius:8, marginTop:16}}
                    />
                </View>
            </ScrollView>
        </View>
    );
 };
 
 export default HotelBookingSearchScreen;

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
    // paddingBottom: 24,
    // backgroundColor: "#79D7D4",
    // borderBottomLeftRadius: 16,
    // borderBottomRightRadius: 16,
    justifyContent: 'center',
    position: "absolute",
    // marginTop: -8
    },
 })