import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface MenuComponentProps {
  menu: string;
  prise: string;
}

const MenuComponent: React.FC<MenuComponentProps> = ({ menu, prise }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.menuText}>{menu}</Text>
        <Text style={styles.priceText}>{prise}</Text>
      </View>
    </View>
  );
};

export default MenuComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%", 
    height: 48,
    borderColor: "rgba(28, 181, 176, 0.25)",
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flex: 1, 
    paddingHorizontal: 16,
    justifyContent: "space-between", 
    alignItems: "center",
  },
  menuText: {
    fontFamily: "Poppin",
    fontSize: 14,
    fontWeight: "500",
  },
  priceText: {
    fontFamily: "Poppin",
    fontSize: 14,
    fontWeight: "500",
  },
});
