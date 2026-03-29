import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
interface ProfileButtonProps {
  onPress: () => void;
}
const SaveButton: React.FC<ProfileButtonProps> = ({ onPress }) => {
  const navigation = useNavigation<any>();
  return (
    <Card style={styles.card} onPress={onPress}>    
        <View style={styles.container}>
            <Text style={styles.text}>Next</Text>
        </View>
    </Card>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  card: {
    margin: 0,
    borderRadius: 8,
    width: '100%',
    backgroundColor: "#1CB5B0",
  },        
    container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: "center",
  },
    text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
