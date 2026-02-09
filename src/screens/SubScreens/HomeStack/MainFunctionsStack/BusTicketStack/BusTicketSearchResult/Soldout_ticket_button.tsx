import React from "react";
import {  Text, StyleSheet, Pressable } from "react-native";

interface Props {
  ticketId: string;
}     

const Soldout_TicketButton: React.FC <Props> =  ({ticketId}) => {
  return (
    <Pressable style={styles.button} onPress={() => console.log("Buy Ticket pressed",ticketId)}>
      <Text style={styles.text}>Sold out</Text>
    </Pressable>
  );
};

export default Soldout_TicketButton;

const styles = StyleSheet.create({
  button: {
    width: 196,                
    height: 36,               
    borderRadius: 4,          
    padding: 10,              
    justifyContent: "center",   
    alignItems: "center",
    backgroundColor: "#D9D9D9", 
    shadowColor: "#D9D9D9",       
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,           
    opacity: 1,
  },
  text: {
    width: 82,                 
    height: 24,               
    fontFamily: "Poppins",
    fontWeight: "500",         
    fontSize: 16,
    lineHeight: 16,           
    textAlign: "center",     
    opacity: 1,
  },
});
