import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

const SetUserNameComponent: React.FC<Props> = ({ value, onChange }) => {
  const [isFocus, setIsFocus] = useState(false);

  const showLabel = value.length > 0 || isFocus;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {showLabel && (
          <Text style={[styles.label, isFocus && styles.labelFocus]}>
            User Name*
          </Text>
        )}

        <TextInput
          style={[styles.input, isFocus && styles.inputFocus]}
          placeholder={!isFocus ? "User Name" : "Enter your User Name"}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetUserNameComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 328,
    height: 48,
    paddingTop: 16,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 8,
    top: 8,
    zIndex: 10,
    fontSize: 12,
    paddingHorizontal: 8,
    fontFamily: "Poppins",
    color: "#999",
  },
  labelFocus: {
    color: "#1CB5B0",
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
    //   shadowColor: '#000',
    //   shadowOffset: {
    //     width: 4,
    //     height: 4,
    //   },
    //   shadowOpacity: 0.5,
    //   shadowRadius: 4,
    //   elevation: 4,
  },
  inputFocus: {
    borderColor: "#1CB5B0",
  },
});
