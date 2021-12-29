import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Header, Footer} from '../../components';
import OrderInfo from '../../parts/OrderPage/OrderInfo';
import Seats from '../../parts/OrderPage/Seats';

import axios from '../../helpers/axios';

export default function OrderPage({navigation, route}) {
  const listSeat = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  const [loading, setLoading] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);

  const handleSelectedSeat = data => {
    if (selectedSeat.includes(data)) {
      const deleteSeat = selectedSeat.filter(el => {
        return el !== data;
      });
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, data]);
    }
  };

  const dataOrder = {...route.params.query, seats: selectedSeat};

  const {dataMovie, schedule, dateSchedule, timeSchedule} = dataOrder;

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `/booking/seat?movieId=${dataMovie.id}&scheduleId=${schedule.id}&dateSchedule=${dateSchedule}&timeSchedule=${timeSchedule}`,
      )
      .then(res => {
        const {data} = res.data;

        const seats = data.map(item => item.seat);

        setReservedSeat(seats);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dataMovie.id, dateSchedule, schedule.id, timeSchedule]);

  const resetSeat = () => setSelectedSeat([]);

  const handleCheckout = () => {
    if (!selectedSeat.length) {
      ToastAndroid.show('Please select your seat', ToastAndroid.LONG);
    } else {
      navigation.navigate('PaymentPage', {query: dataOrder});
    }
  };

  if (loading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="#5F2EEA" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.innerContainer}>
        <Text style={styles.textChoose}>Choose your seat</Text>
        <View style={styles.cardSeat}>
          <View style={styles.borderLine} />
          <FlatList
            data={listSeat}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <Seats
                seatAlphabhet={item}
                reserved={reservedSeat}
                selected={selectedSeat}
                selectSeat={handleSelectedSeat}
              />
            )}
          />

          <View style={styles.wrapperInfoKey}>
            <Text style={styles.textSeatingKey}>Seating Key</Text>

            <View style={styles.wrapperSeatKeyText}>
              <View style={[styles.seatKeyInfoText, styles.seatKeyAbjad]}>
                <Icon
                  name="arrow-down"
                  size={20}
                  color="#14142B"
                  style={styles.icon}
                />
                <Text style={styles.keyText}>A - G</Text>
              </View>
              <View style={styles.seatKeyInfoText}>
                <Icon
                  name="arrow-right"
                  size={20}
                  color="#14142B"
                  style={styles.icon}
                />
                <Text style={styles.keyText}>1 - 14</Text>
              </View>
            </View>

            <View style={styles.boxWrapperSeat}>
              <View style={[styles.boxSeat, styles.available]}>
                <View style={styles.boxSeatAvailable} />
                <Text style={styles.textKeyAlphabet}>Available</Text>
              </View>
              <View style={styles.boxSeat}>
                <View style={styles.boxSeatSelected} />
                <Text style={styles.textKeyAlphabet}>Selected</Text>
              </View>
            </View>
            <View style={styles.boxSeat}>
              <View style={styles.boxSeatSold} />
              <Text style={styles.textKeyAlphabet}>Sold</Text>
            </View>
          </View>
        </View>

        <OrderInfo data={dataOrder} />

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.buttonResetSeat}
            onPress={resetSeat}
            activeOpacity={1}>
            <Text style={styles.textResetSeat}>Reset seat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCheckout}
            onPress={handleCheckout}
            activeOpacity={1}>
            <Text style={styles.textCheckout}>Checkout now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6F8',
  },
  innerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 40,
  },
  textChoose: {
    fontSize: 18,
    lineHeight: 34,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#14142B',
    marginBottom: 16,
  },
  cardSeat: {
    paddingHorizontal: 16,
    paddingVertical: 40,
    backgroundColor: '#ffffff',
    marginBottom: 26,
    borderRadius: 6,
  },
  borderLine: {
    borderRadius: 6,
    borderWidth: 6,
    borderStyle: 'solid',
    borderColor: '#9570FE',
    marginBottom: 16,
  },
  wrapperInfoKey: {
    marginTop: 24,
  },
  textSeatingKey: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 1,
    color: '#000000',
  },
  wrapperSeatKeyText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 67,
  },
  seatKeyInfoText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  seatKeyAbjad: {
    marginRight: 73,
  },
  icon: {
    marginRight: 8,
  },
  keyText: {
    fontSize: 13,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#4E4B66',
  },
  boxWrapperSeat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  boxSeat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  available: {
    marginRight: 40,
  },
  boxSeatAvailable: {
    width: 20,
    height: 20,
    backgroundColor: '#D6D8E7',
    borderRadius: 4,
    marginRight: 8,
  },
  boxSeatSelected: {
    width: 20,
    height: 20,
    backgroundColor: '#5F2EEA',
    borderRadius: 4,
    marginRight: 8,
  },
  boxSeatSold: {
    width: 20,
    height: 20,
    backgroundColor: '#6E7191',
    borderRadius: 4,
    marginRight: 8,
  },
  textKeyAlphabet: {
    color: '#4E4B66',
    fontSize: 13,
    letterSpacing: 1,
    lineHeight: 22,
    fontWeight: '400',
  },
  buttonWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonResetSeat: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderColor: '#5F2EEA',
    borderWidth: 1,
    borderStyle: 'solid',
    minWidth: 150,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  textResetSeat: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#5F2EEA',
  },
  buttonCheckout: {
    backgroundColor: '#5F2EEA',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#5F2EEA',
    borderRadius: 4,
    minWidth: 150,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  textCheckout: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#ffffff',
  },
});
