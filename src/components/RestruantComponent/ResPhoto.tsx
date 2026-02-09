import React, {useState} from "react";
import { 
    View,
    StyleSheet,
    ImageSourcePropType,
    Image
} from "react-native";

interface RestruantPhotoComponentProps{
    imageUrl: ImageSourcePropType;
    onPress?: () => void;
}

const RestruantPhotoComponent: React.FC<RestruantPhotoComponentProps>=({
    imageUrl,
    onPress,
}) => {
    const [viewerVisible, setViewerVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <View style={styles.container}>
            <Image source={imageUrl} style={styles.image}/>
        </View>
    );
};
export default RestruantPhotoComponent;

const styles=StyleSheet.create({
    container:{
        flex: 1,
        height:104,
        width:104,
    },
    image: {
        width: 104,
        height: 104,
        borderRadius: 8,
    },
});
