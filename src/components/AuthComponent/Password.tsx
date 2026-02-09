import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { IconButton} from 'react-native-paper';


const PasswordComponent = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [secure, setSecure] = useState(true);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: '#1CB5B0' }]}>
          Password*
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <TextInput
        key={secure ? 'hidden' : 'visible'}
        secureTextEntry={secure}
        style={[styles.input, isFocus && { borderColor: '#1CB5B0' }]}
        placeholder={!isFocus ? 'Password*' : 'Enter your password...'}
        value={value}
        onChangeText={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setSecure(prev => !prev)}
          activeOpacity={0.7}
        >
          <IconButton
            icon={secure ? 'eye-off' : 'eye'}
            size={22}
            onPress={() => setSecure(prev => !prev)}
            style={styles.icon}
          />
        </TouchableOpacity>
    </View>
  );
};

export default PasswordComponent;


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
    input: {
      height: 48,
      width: 328,
      borderColor: '#1CB5B0',
      opacity: 0.8,
      borderWidth: 0.5,
      borderRadius: 8,
      fontSize: 16,
      fontFamily: 'Poppins',
      paddingLeft: 10,
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 4,
      //   height: 4,
      // },
      // shadowOpacity: 0.5,
      // shadowRadius: 4,
      // elevation: 4,
    },
    
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 13,
  },
  icon: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
});