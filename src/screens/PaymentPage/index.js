import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Button, Footer, Header} from '../../components';

import PersonalInfo from '../../parts/PaymentPage/Personalnfo';
import {formatRp} from '../../helpers/formatRp';

import axios from '../../helpers/axios';

export default function PaymentPage({navigation, route}) {
  console.log(route);

  const [loading, setLoading] = useState(false);
  const {dataMovie, dateSchedule, timeSchedule, schedule, seats} =
    route.params.query;

  const handlePayment = () => {
    setLoading(true);

    const setData = {
      dateBooking: dateSchedule,
      movieId: dataMovie.id,
      scheduleId: schedule.id,
      seat: seats,
      timeBooking: timeSchedule,
    };

    axios
      .post('/booking', setData)
      .then(res => {
        navigation.navigate('Midtrans', {query: res.data.data});
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView>
      <Header navigation={navigation} />

      <View style={styles.totalContainer}>
        <Text style={styles.textTotal}>Total Payment</Text>
        <Text style={styles.textTotalPrice}>
          {formatRp(schedule.price * seats.length)}
        </Text>
      </View>

      <View style={styles.innerContainer}>
        <PersonalInfo />
        <View style={{marginBottom: 40}} />

        <Button onPress={handlePayment}>
          {loading ? (
            <ActivityIndicator size="small" color="ffffff" />
          ) : (
            <Text style={styles.textPay}>Pay your order</Text>
          )}
        </Button>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6F8',
  },
  totalContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTotal: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: 1,
    color: '#AAAAAA',
  },
  textTotalPrice: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: 1,
  },
  innerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 40,
  },
  textPay: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 1,
    fontWeight: '700',
    color: '#ffffff',
  },
});
