import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Icon, IconButton } from "react-native-paper";
interface ProfileButtonProps {
  onPress: () => void;
}
const SupportButton: React.FC<ProfileButtonProps> = ({ onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>    
        <View style={styles.container}>
            <IconButton icon="help-circle-outline" size={24} iconColor="#1CB5B0" style={styles.icon} />
            <Text style={styles.text}>Support</Text>
            <IconButton icon="chevron-right" size={24} iconColor="#1CB5B0" style={styles.icon2} />
        </View>
    </Card>
  );
};

export default SupportButton;

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
    icon: {
    margin: -10,
    marginRight: 8,
  },
    icon2: {
    margin: -10,
    marginLeft: 'auto',
  },
});
