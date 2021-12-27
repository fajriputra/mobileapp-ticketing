import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function DetailTitle({data}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data?.name}</Text>
      <Text style={styles.category}>{data?.category.join(', ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: 1,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    lineHeight: 32,
    letterSpacing: 1,
    color: '#4E4B66',
    textAlign: 'center',
  },
});
