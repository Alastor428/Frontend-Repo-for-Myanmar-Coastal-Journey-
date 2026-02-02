import React from "react";
import SeatLegend from "./Bus_fixed_sample_seat";
import SeatLayout from "./Bus_ticket_seat_layout";
import { View, StyleSheet } from "react-native";

const BusTicketSeatSelectionScreen = () => {
    return(
        <View style={styles.outerContainer}>
            <SeatLegend/>
            <View style={{ flex: 1 }}> 
                <SeatLayout/>
           </View>
        </View>
    )
}   

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1, 
        backgroundColor: "#EFF3F4",
        
    }
});

export default BusTicketSeatSelectionScreen;