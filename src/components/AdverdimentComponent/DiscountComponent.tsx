import React,{useState} from "react";
import { 
    Text,
    Card,
 } from "react-native-paper";
import { 
   View,
   Image,
   StyleSheet,
   Dimensions,
   ImageSourcePropType,
 } from "react-native";


interface DiscountComponentProps {
  imageUrl: ImageSourcePropType;
  title: string;
  description: string;
}
const { width } = Dimensions.get("window");
const CARD_WIDTH = 208 + 8;
const DiscountComponent: React.FC<DiscountComponentProps> = ({
  imageUrl,
  title,
  description
}) => {
  return (
    <View style={styles.card}>
      <Image source={imageUrl} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View> 
    </View>
  );
};

export default DiscountComponent;

const styles = StyleSheet.create({
  card: {
    margin: 0,
    borderRadius: 10,

  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  image: {
    width: 328,
    height: 188,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1, 
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Outfit",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    color: "#fff",  
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "medium",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  overlay: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    padding: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});