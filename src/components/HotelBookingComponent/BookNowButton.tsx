import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
interface HotelButtonProps {
  onPress: () => void;
}
const BookNowButton: React.FC<HotelButtonProps> = ({ onPress }) => {
  const navigation = useNavigation<any>();
  return (
    <Card style={styles.card} onPress={onPress} theme={{ roundness: 0 }} >    
        <View style={styles.container}>
            <Text style={styles.text}>Book Now</Text>
        </View>
    </Card>
  );
};

export default BookNowButton;

const styles = StyleSheet.create({
  card: {
    margin: 0,
    borderBottomRightRadius: 8,
    width: "100%",
    backgroundColor: "#E8C3B0",
  },        
    container: {
    flexDirection: "row",
    // paddingVertical: 12,
    // paddingHorizontal: 8,
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems:"center"
  },
    text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
