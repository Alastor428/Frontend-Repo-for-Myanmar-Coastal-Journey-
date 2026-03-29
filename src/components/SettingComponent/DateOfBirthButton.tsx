import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Icon, IconButton } from "react-native-paper";
interface ProfileButtonProps {
    dateOfBirth: string;
  onPress: () => void;
}
const DateOfBirthButton: React.FC<ProfileButtonProps> = ({ dateOfBirth, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>    
        <View style={styles.container}>
            <Text style={styles.text}>Date of Birth</Text>
            <Text style={styles.text2}>{dateOfBirth}</Text>
            <IconButton icon="chevron-right" size={24} iconColor="#1CB5B0" style={styles.icon2} />
        </View>
    </Card>
  );
};

export default DateOfBirthButton;

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
