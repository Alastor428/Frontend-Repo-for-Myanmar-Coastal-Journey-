 import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import { Icon } from 'react-native-paper';

  const data = [
    { label: 'Yangon', value: '1' },
    { label: 'Mandalay', value: '2' },
    { label: 'Nay Pyi Taw', value: '3' },
  ];

  const SourceComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#1CB5B0' }]}>
            From
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
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'From' : 'Choose destination...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
    source="map-marker"
    size={20}
    color={ "#1CB5B0" }
  />
          )}
        />
      </View>
    );
  };

  export default SourceComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: 298,
      height: 48,
      paddingTop:16,
    },
    dropdown: {
      height: 48,
      width: 298,
      borderColor: '#1CB5B0',
      opacity: 0.8,
      borderWidth: 0.5,
      borderRadius: 8,
    },
    icon: {
      marginRight: 8,
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
    placeholderStyle: {
      fontSize: 16,
      fontFamily: 'Poppins',
    },
    selectedTextStyle: {
      fontSize: 16,
      fontFamily: 'Poppins',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });