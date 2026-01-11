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
   TouchableOpacity,
   StatusBar,
    Modal,
 } from "react-native";

 interface BeachScreenPhotoProps {
  imageUrl: ImageSourcePropType;

}
const { width } = Dimensions.get("window");
const CARD_WIDTH = 208 + 8;
const BeachScreenPhoto: React.FC<BeachScreenPhotoProps> = ({
    imageUrl,
}) => {
    const [visible, setVisible] = useState(false);
  return (
    <>
    <TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(true)}>
      <View style={styles.card}>  
          <Image source={imageUrl} style={styles.image} />
      </View>
    </TouchableOpacity>
    <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <StatusBar hidden />
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <Image source={imageUrl} style={styles.fullImage} resizeMode="contain" />
        </TouchableOpacity>
      </Modal>
      </>
  );
};

export default BeachScreenPhoto;
const styles = StyleSheet.create({
  card: {
    margin: 0,      
    width: 393,
    height: 448,
  },    
    container: {
    flexDirection: "row",
  },    
    image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    },
    modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: width,
    height: "100%",
  },
});