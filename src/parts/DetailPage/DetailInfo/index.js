import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Synopsis} from '..';
import {getMonthDateYear} from '../../../helpers/formatDate';

export default function DetailInfo({data}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.column1}>
          <View>
            <Text style={styles.textTitle}>Release date</Text>
            <Text style={[styles.textSubTitle, styles.rowGap]}>
              {getMonthDateYear(data?.releaseDate)}
            </Text>
          </View>
          <View>
            <Text style={styles.textTitle}>Duration</Text>
            <Text style={styles.textSubTitle}>{data?.duration}</Text>
          </View>
        </View>
        <View style={styles.column2}>
          <View>
            <Text style={styles.textTitle}>Directed by</Text>
            <Text style={[styles.textSubTitle, styles.rowGap]}>
              {data?.director}
            </Text>
          </View>
          <View>
            <Text style={styles.textTitle}>Casts</Text>
            <Text style={styles.textSubTitle}>{data?.cast.join(', ')}</Text>
          </View>
        </View>
      </View>
      <View style={styles.lineBreak} />
      <Synopsis data={data?.synopsis} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  column1: {
    flex: 1,
  },
  column2: {
    flex: 1,
  },
  rowGap: {
    marginBottom: 22,
  },
  textTitle: {
    color: '#8692A6',
    lineHeight: 23,
    letterSpacing: 1,
    fontSize: 13,
  },
  textSubTitle: {
    color: '#121212',
    fontSize: 15,
    lineHeight: 28,
    letterSpacing: 1,
  },
  lineBreak: {
    borderWidth: 1,
    borderColor: '#D6D8E7',
    borderStyle: 'solid',
    marginTop: 40,
    marginBottom: 24,
  },
});
