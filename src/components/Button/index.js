import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';

export default function Button({children, onPress, isDisabled}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} disabled={isDisabled}>
      <View style={styles.button}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5F2EEA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 8,
  },
});
