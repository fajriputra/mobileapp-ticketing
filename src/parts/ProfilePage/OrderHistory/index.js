import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import ebvid from '../../../assets/images/sponsor/logo-ebvid.png';
import hiflix from '../../../assets/images/sponsor/logo-hiflix.png';
import cineone from '../../../assets/images/sponsor/logo-cineone.png';

import axios from '../../../helpers/axios';
import {formatDate} from '../../../helpers/formatDate';
import {formatAMPM} from '../../../helpers/formatTime';
import Notifications from '../../../helpers/notifications';

export default function OrderHistory({navigation}) {
  const {data} = useSelector(state => state.user);

  const [loading, setLoading] = useState(false);
  const [dataBooking, setDataBooking] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/booking/user-id/${data.id}`)
      .then(res => {
        res.data.data.filter(item => {
          item.statusTicket === 'Active' &&
            Notifications.reminderNotifications(
              'Attention',
              `Hello ${data.firstName}, you have an unused ticket, please use it immediately and enjoy watching`,
            );

          // console.log(
          //   new Date(item.dateBooking).setHours(
          //     new Date().getHours() + item.timeBooking,
          //   ),
          // );
          // if (new Date(item.dateBooking) < new Date()) {
          //   Notifications.scheduleNotifications(
          //     `Hello ${data.firstName}, you have an unused ticket, please use it immediately and enjoy watching`,
          //     'day',
          //     1,
          //   );
          // }
          //  else if (new Date(item.dateBooking) === new Date()) {
          //             Notifications.scheduleNotifications(
          //               `Hello ${data.firstName}, you have an expired ticket movie ${item.name}`,
          //               '',
          //               '',
          //             );
          //           }
        });

        setDataBooking(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setLoading(false);
    };
  }, [data.id]);

  const moveTicket = id => {
    navigation.navigate('TicketResult', {movieId: id});
  };

  const continuePayment = url => {
    navigation.navigate('Midtrans', {query: {urlRedirect: url}});
  };

  return (
    <ScrollView
      style={[styles.container, dataBooking.length > 3 && styles.morethan_3]}
      showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator size="large" color="#5F2EEA" />
      ) : dataBooking.length > 0 ? (
        dataBooking.map(item => (
          <View style={styles.cardOrderHistory} key={item.id}>
            <View style={styles.infoHistory}>
              <View style={styles.imageWrapper}>
                <Image
                  source={
                    item.premier === 'ebv.id'
                      ? ebvid
                      : item.premier === 'hiflix Cinema'
                      ? hiflix
                      : item.premier === 'CineOne21'
                      ? cineone
                      : {
                          uri: 'https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg',
                        }
                  }
                  style={styles.imagePremier}
                />
              </View>

              <View>
                <Text style={styles.textDateTime}>
                  {formatDate(item.dateBooking)} -{' '}
                  {formatAMPM(item.timeBooking.slice(0, 5))}
                </Text>
                <Text style={styles.textMovie}>{item.name}</Text>
              </View>
            </View>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={[
                  styles.buttonTicket,
                  (item.statusTicket === 'inProcess' && styles.notPaid) ||
                    (item.statusTicket === 'notActive' && styles.used) ||
                    (item.statusTicket === 'Active' && styles.notUsed),
                ]}
                activeOpacity={1}>
                <Text style={styles.textTicket}>
                  {(item.statusTicket === 'inProcess' && 'Waiting Payment') ||
                    (item.statusTicket === 'notActive' && 'Ticket used') ||
                    (item.statusTicket === 'Active' && 'Ticket in Active')}
                </Text>
              </TouchableOpacity>
              {item.statusPayment === 'pending' && (
                <Text
                  style={styles.seeTicket}
                  onPress={() => continuePayment(item.urlRedirect)}>
                  Pay here
                </Text>
              )}
              {item.statusPayment === 'success' && (
                <Text
                  style={styles.seeTicket}
                  onPress={() => moveTicket(item.id)}>
                  See ticket
                </Text>
              )}
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.textNoOrder}>You don't have order history yet</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 70,
  },
  morethan_3: {
    height: 650,
  },
  cardOrderHistory: {
    backgroundColor: '#ffffff',
    padding: 24,
    marginBottom: 16,
    borderRadius: 8,
  },
  infoHistory: {
    marginBottom: 32,
  },
  imageWrapper: {
    width: 100,
    height: 40,
    marginBottom: 17,
  },
  imagePremier: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textDateTime: {
    fontSize: 13,
    color: '#AAAAAA',
    fontWeight: '400',
    lineHeight: 22,
  },
  textMovie: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 1,
    color: '#000000',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonTicket: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  notPaid: {
    backgroundColor: '#3134528c',
  },
  notUsed: {
    backgroundColor: '#00ba88',
  },
  used: {
    backgroundColor: '#6e7191',
  },
  textTicket: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  seeTicket: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
    color: '#AAAAAA',
  },
  textNoOrder: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
