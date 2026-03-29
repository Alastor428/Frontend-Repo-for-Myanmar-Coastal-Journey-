import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
interface BeachButtonProps {
  onPress: () => void;
}
const TravelPackageButton: React.FC<BeachButtonProps> = ({ onPress }) => {
  const navigation = useNavigation<any>();
  return (
    <Card style={styles.card} onPress={() => alert("Travel Packages")}>    
        <View style={styles.container}>
            <Text style={styles.text}>Travel Packages</Text>
        </View>
    </Card>
  );
};

export default TravelPackageButton;

const styles = StyleSheet.create({
  card: {
    margin: 0,
    borderRadius: 8,
    width: 148,
    backgroundColor: "#1CB5B0",
  },        
    container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    width: 148,
    height: 40,
    justifyContent: "center",
  },
    text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
