import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

import ebvid from '../../../assets/images/sponsor/logo-ebvid.png';
import cineone from '../../../assets/images/sponsor/logo-cineone.png';
import hiflix from '../../../assets/images/sponsor/logo-hiflix.png';

import {formatDate} from '../../../helpers/formatDate';
import {formatAMPM} from '../../../helpers/formatTime';
import {formatRp} from '../../../helpers/formatRp';

export default function OrderInfo({data}) {
  const {dataMovie, dateSchedule, timeSchedule, schedule, seats} = data;

  return (
    <View>
      <Text style={styles.textOrderInfo}>Order Info</Text>
      <View style={styles.cardOrderInfo}>
        <View style={{paddingHorizontal: 20}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.imageWrapper}>
              <Image
                source={
                  (schedule.premier === 'ebv.id' && ebvid) ||
                  (schedule.premier === 'CineOne21' && cineone) ||
                  (schedule.premier === 'hiflix Cinema' && hiflix)
                }
                style={styles.imagePremiere}
              />
            </View>
            <Text style={styles.textPremiere}>{schedule.premier}</Text>
            <Text style={styles.textMovieName}>{dataMovie.name}</Text>
          </View>

          <View style={{marginVertical: 20}}>
            <View style={styles.contentWrapper}>
              <Text style={styles.textInnerLeft}>
                {formatDate(dateSchedule)}
              </Text>
              <Text style={styles.textInnerRight}>
                {formatAMPM(timeSchedule)}
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.textInnerLeft}>One ticket price</Text>
              <Text style={styles.textInnerRight}>
                {formatRp(schedule.price)}
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.textInnerLeft}>Seat choosed</Text>
              <Text
                style={[
                  styles.textInnerRight,
                  seats.length > 6 && {
                    flex: 1,
                    textAlign: 'right',
                    alignItems: 'center',
                  },
                ]}>
                {seats.join(', ')}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.contentWrapper, styles.morePadding]}>
          <Text style={styles.textTotal}>Total Payment</Text>
          <Text style={styles.textTotalPrice}>
            {formatRp(
              seats.length === 0
                ? schedule.price
                : schedule.price * seats.length,
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textOrderInfo: {
    fontSize: 18,
    lineHeight: 34,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#14142B',
    marginBottom: 16,
  },
  cardOrderInfo: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingTop: 32,
    paddingBottom: 20,
  },
  imageWrapper: {
    width: 100,
    height: 40,
  },
  imagePremiere: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textPremiere: {
    fontSize: 24,
    lineHeight: 34,
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#14142B',
    marginVertical: 6,
  },
  textMovieName: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInnerLeft: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 1,
    color: '#6b6b6b',
  },
  textInnerRight: {
    fontSize: 14,
    letterSpacing: 1,
    lineHeight: 24,
    fontWeight: '600',
    color: '#14142B',
  },
  morePadding: {
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    borderStyle: 'solid',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textTotal: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 34,
    letterSpacing: 1,
  },
  textTotalPrice: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    color: '#5F2EEA',
  },
});
