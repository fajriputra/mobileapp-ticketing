import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function Synopsis({data}) {
  return (
    <View>
      <Text style={styles.textSynopsis}>Synopsis</Text>
      <Text style={styles.synopsis}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textSynopsis: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 1,
    color: '#14142B',
    marginBottom: 8,
  },
  synopsis: {
    color: '#4E4B66',
    letterSpacing: 1,
    lineHeight: 22,
    fontSize: 13,
    fontWeight: '400',
  },
});
