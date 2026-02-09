import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{7,15}$/;

const EmailComponent = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState('');

  const validateInput = () => {
    if (!value) {
      setError('Please fill the data first');
      return;
    }

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      setError('Enter a valid email or phone number');
      return;
    }

    setError('');
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: '#1CB5B0' }]}>
          Email or Phone Number*
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {renderLabel()}
        <TextInput
          style={[
            styles.input,
            isFocus && { borderColor: '#1CB5B0' },
            error && { borderColor: 'red' },
          ]}
          placeholder={!isFocus ? 'Enter your Email or Phone Number' : '@gmail.com'}
          value={value}
          onChangeText={(text) => {
            onChange(text);
            if (error) setError('');
          }}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            setIsFocus(false);
            validateInput();
          }}
          keyboardType="email-address"
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default EmailComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  container: {
    backgroundColor: 'white',
    width: 328,
    height: 48,
    paddingTop: 16,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 8,
    top: 8,
    zIndex: 999,
    fontSize: 12,
    paddingHorizontal: 8,
    fontFamily: 'Poppins',
    fontWeight: '500',
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
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 0.5,
    // shadowRadius: 4,
    // elevation: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 24,
    marginLeft: 4,
    fontFamily: 'Poppins',
  },
});
