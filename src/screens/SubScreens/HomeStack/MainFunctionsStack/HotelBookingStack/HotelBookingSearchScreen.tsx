import React, {useState} from "react";
import { 
    View,
    ScrollView,
    Text,
    StyleSheet
 } from "react-native";
 import { IconButton, Icon } from "react-native-paper";
 import Search from "@/components/Search";
 import SearchComponent from "@/components/BusTicketComponent/SearchButton";
 import DateComponent from "@/components/BusTicketComponent/DateComponent";
 import { useNavigation } from "@react-navigation/native";

 const HotelBookingSearchScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [StartDate, setStartDate] = useState<Date | undefined>();
    const [EndDate, setEndDate] = useState<Date | undefined>();

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", width: '100%'}} >
                <View style={{ width: '100%', paddingHorizontal: 32, justifyContent: 'center', alignItems: 'center' }} >
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
                            <Search/>
                        </View>
                        <View style={{paddingHorizontal:8}}>
                            <DateComponent 
                            label="Start Date"
                            value={StartDate}
                            onConfirm={setStartDate}
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
                                <SearchComponent onPress={() => navigation?.navigate("MainTabs")}/>
                            </View>
                        </View>
                    </View>
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
 })