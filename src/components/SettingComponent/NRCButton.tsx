import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Icon, IconButton } from "react-native-paper";
interface ProfileButtonProps {
    nrc?: string;
    passportNumber?: string;
}
const NRCButton: React.FC<ProfileButtonProps> = ({ nrc,passportNumber}) => {
  return (
    <Card style={styles.card} >    
        <View style={styles.container}>
            <Text style={styles.text}>NRC</Text>
            <Text style={styles.text2}>{nrc || passportNumber}</Text>
        </View>
    </Card>
  );
};

export default NRCButton;

const styles = StyleSheet.create({
  card: {
    margin: 0,
    borderRadius: 8,
    width: '100%',
    backgroundColor: "#fff",
  },        
    container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 40,
  },
    text: {
    fontSize: 14,
    fontWeight: "500",
  },
    text2: {
    fontSize: 14,
    color: "#000",
    fontWeight: "200",
    marginLeft: 'auto',
  },
    icon2: {
    margin: -10,
  },
});
