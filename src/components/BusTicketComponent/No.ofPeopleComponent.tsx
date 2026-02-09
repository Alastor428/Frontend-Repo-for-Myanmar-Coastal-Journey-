import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';

interface PeopleCountProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const PeopleCountComponent: React.FC<PeopleCountProps> = ({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
}) => {
  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputBox}>

        <Text style={styles.value}>{value}</Text>

        <TouchableOpacity onPress={decrease} disabled={value <= min}>
          <Icon
            source="minus"
            size={20}
            color={value <= min ? '#9CA3AF' : '#1CB5B0'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={increase} disabled={value >= max}>
          <Icon
            source="plus"
            size={20}
            color={value >= max ? '#9CA3AF' : '#1CB5B0'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PeopleCountComponent;

const styles = StyleSheet.create({
  container: {
    width: 328,
    backgroundColor: 'white',
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 8,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: 'medium',
  },

  inputBox: {
    height: 48,
    borderWidth: 0.5,
    borderColor: 'rgba(28, 181, 176, 0.6)',
    borderRadius: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  value: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 'medium',
    color: '#111827',
    marginRight: 176,
  },
});
