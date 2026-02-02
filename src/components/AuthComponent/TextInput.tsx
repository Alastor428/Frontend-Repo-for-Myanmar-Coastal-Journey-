import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';

const TextInputComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#1CB5B0' }]}>
            To
          </Text>
        );
      }
      return null;
    };

    return (
        <View style={styles.container}>
            {renderLabel()}
        </View>
    );
};

export default TextInputComponent;

const styles= StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: 328,
      height: 48,
      paddingTop:16,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 8,
      top: 8,
      zIndex: 999,
      fontSize: 12,
      paddingHorizontal:8,
      fontFamily: "Poppins",
      fontWeight: "medium"
    },
});