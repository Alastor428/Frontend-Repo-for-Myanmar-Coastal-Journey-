import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from 'react-native-paper';

  const data = [
    { label: 'Local', value: 'Local' },
    { label: 'Foreigner', value: 'Foreigner' },
  ];

  type TicketTypeComponentProps = {
    value?: string | null;
    onChange?: (value: string) => void;
  };

  const TicketTypeComponent: React.FC<TicketTypeComponentProps> = ({ value: valueProp, onChange }) => {
    const [internalValue, setInternalValue] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const value = valueProp ?? internalValue;

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#1CB5B0' }]}>
            Ticket Type
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#1CB5B0' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Ticket Type' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            if (!onChange) setInternalValue(item.value);
            onChange?.(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  export default TicketTypeComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: "100%",
      height: 48,
      paddingTop:16,
    },
    dropdown: {
      height: 48,
      width: "100%",
      borderColor: '#1CB5B0',
      opacity: 0.8,
      borderWidth: 0.5,
      borderRadius: 8,
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
      fontWeight: "500"
    },
    placeholderStyle: {
      fontSize: 16,
      fontFamily: 'Poppins',
      left: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      fontFamily: 'Poppins',
      left: 16,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });