import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
interface BeachButtonProps {
  onPress: () => void;
}
const SelfRegistrationButton: React.FC<BeachButtonProps> = ({ onPress }) => {
  const navigation = useNavigation<any>();
  return (
    <Card style={styles.card} onPress={() => alert("Self Registration")}>    
        <View style={styles.container}>
            <Text style={styles.text}>Self Registration</Text>
        </View>
    </Card>
  );
};

export default SelfRegistrationButton;

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
