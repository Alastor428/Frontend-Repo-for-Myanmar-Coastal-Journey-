import React from "react";
import { 
    View,
    StyleSheet,
    ImageSourcePropType,Image
} from "react-native";

interface TopImageComponentProps{
    imageUrl: ImageSourcePropType;
}
const TopImageComponent: React.FC <TopImageComponentProps> =({
    imageUrl,
})=>{
    return(
        <View style={styles.container}>
            <Image source={imageUrl} style={styles.image} />
        </View>
    )
};
export default TopImageComponent;

const styles= StyleSheet.create({
    container:{
        height:232,
        width:328,
    },
    image: {
        height: 232,
        width:328,
        borderRadius: 8,
    }
})