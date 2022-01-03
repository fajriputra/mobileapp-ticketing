import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export default function Input(props) {
  const {
    keyboardType,
    placeholder,
    onChangeText,
    value,
    secureTextEntry,
    editable,
    label,
  } = props;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.formControl]}
        keyboardType={keyboardType}
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0A3BD"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formControl: {
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DEDEDE',
    color: '#A0A3BD',
    fontSize: 16,
    marginBottom: 0,
  },
  label: {
    marginBottom: 10,
    color: '#4E4B66',
    fontSize: 16,
  },
});
