/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {getLocation} from '../../../stores/location/actions';
import {getSchedule} from '../../../stores/schedules/actions';
import {formatRp} from '../../../helpers/formatRp';
import {formatAMPM} from '../../../helpers/formatTime';

import ebvid from '../../../assets/images/sponsor/logo-ebvid.png';
import hiflix from '../../../assets/images/sponsor/logo-hiflix.png';
import cinone from '../../../assets/images/sponsor/logo-cineone.png';
import Pagination from '../../../components/Pagination';

const initialState = {
  page: 1,
  limit: 4,
  movieId: '',
  location: '',
  sortType: 'asc',
};

export default function Showtimes({navigation, movie}) {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.location);
  const {pageInfo} = useSelector(state => state.schedules);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [querySchedule, setQuerySchedule] = useState(initialState);
  const [timeSchedule, setTimeSchedule] = useState('');
  const [dateSchedule, setDateSchedule] = useState(new Date());
  const [filtered, setFiltered] = useState([]);

  const {page, limit, movieId, location, sortType} = querySchedule;

  const passingData = {
    dataMovie: {...movie},
    dateSchedule: dateSchedule.toISOString().split('T')[0],
    timeSchedule: timeSchedule.timeSchedule,
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getLocation());
    dispatch(getSchedule(page, limit, movieId, location, sortType))
      .then(res => {
        setFiltered(res.value.data.data);
      })
      .catch(err => console.log(err.response.data.message))
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setLoading(false);
    };
  }, [dispatch, limit, location, movieId, page, sortType]);

  const handleChooseDate = value => {
    const dateNow = new Date().toISOString().split('T')[0];
    const chooseDate = new Date(value).toISOString().split('T')[0];
    if (chooseDate >= dateNow) {
      setDateSchedule(value);
    } else {
      ToastAndroid.show("You can't select previous date", ToastAndroid.LONG);
    }
  };

  const handleSelectedLocation = value => {
    setQuerySchedule({...querySchedule, location: value, page: 1});
  };

  const handleTime = (time, scheduleId) => {
    setTimeSchedule({
      scheduleId,
      timeSchedule: time,
    });
  };

  const handlePagination = value => {
    setQuerySchedule({...querySchedule, page: value});
  };

  const handleBooking = data => {
    navigation.navigate('OrderPage', {query: {...passingData, schedule: data}});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Showtimes and Tickets</Text>

      <View style={styles.wrapperPicker}>
        <View style={{marginBottom: 12}}>
          <DatePicker
            modal
            open={open}
            date={dateSchedule}
            fadeToColor="#FFFFFF"
            textColor="#000000"
            onConfirm={value => {
              setOpen(false);
              handleChooseDate(value);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TouchableHighlight
            style={styles.buttonDate}
            onPress={() => setOpen(true)}
            underlayColor="none">
            <View>
              <Icon
                name="calendar-alt"
                color="#4E4B66"
                style={{position: 'absolute', left: 18}}
                size={20}
              />
              <Text style={styles.buttonDate_title}>
                {dateSchedule ? (
                  new Date(dateSchedule).toISOString().split('T')[0]
                ) : (
                  <Text>Set a Date</Text>
                )}
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View
          style={{
            backgroundColor: '#EFF0F6',
            minWidth: 250,
            borderRadius: 4,
          }}>
          <View>
            <Icon
              name="map-marker-alt"
              color="#4E4B66"
              style={{position: 'absolute', left: 18, top: 16}}
              size={18}
            />
          </View>
          <Picker
            dropdownIconColor="#EFF0F6"
            selectedValue={querySchedule.location}
            onValueChange={value => handleSelectedLocation(value)}
            style={{
              color: '#4E4B66',
              marginLeft: 40,
            }}>
            <Picker.Item label="Set a city" enabled={false} />
            {data.map(item => (
              <Picker.Item label={item.nama} value={item.nama} key={item.id} />
            ))}
          </Picker>
        </View>
      </View>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
          }}>
          <ActivityIndicator size="large" color="#5F2EEA" />
        </View>
      ) : filtered.length > 0 ? (
        filtered.map(item => (
          <View style={styles.cardSchedule} key={item.id}>
            <View style={styles.cardSchedule_header}>
              <View style={styles.imageWrapper}>
                <Image
                  source={
                    item.premier === 'ebv.id'
                      ? ebvid
                      : item.premier === 'hiflix Cinema'
                      ? hiflix
                      : item.premier === 'CineOne21'
                      ? cinone
                      : {
                          uri: 'https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg',
                        }
                  }
                  style={styles.imagePremiere}
                />
              </View>
              <Text style={styles.address}>{item.location}</Text>
            </View>

            <View style={styles.lineBreak} />

            <View style={styles.cardTime}>
              {item.time.map((tm, index) => (
                <Text
                  key={index}
                  style={[
                    styles.textTime,
                    item.id === timeSchedule.scheduleId &&
                      tm === timeSchedule.timeSchedule &&
                      styles.timeActive,
                  ]}
                  onPress={() => handleTime(tm, item.id)}>
                  {formatAMPM(tm)}
                </Text>
              ))}
            </View>

            <View style={styles.priceWrapper}>
              <Text style={styles.textPrice}>Price</Text>
              <Text style={styles.textPriceNumber}>
                {formatRp(item.price)}/seat
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.buttonBook,
                item.id === timeSchedule.scheduleId && styles.buttonActive,
              ]}
              onPress={() => handleBooking(item)}
              activeOpacity={1}
              disabled={item.id !== timeSchedule.scheduleId}>
              <Text style={styles.textBook}>Book now</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            color: '#000000',
          }}>
          <Text>Schedule is not available at {querySchedule.location}</Text>
        </View>
      )}

      {filtered.length > 0 && (
        <Pagination
          totalData={pageInfo?.totalData}
          currentPage={page}
          onPageChange={value => handlePagination(value)}
          limit={limit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
  },
  textTitle: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1,
    lineHeight: 34,
    textAlign: 'center',
  },
  wrapperPicker: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 48,
  },
  buttonDate: {
    backgroundColor: '#EFF0F6',
    borderRadius: 4,
    minWidth: 250,
    paddingVertical: 11,
  },
  buttonDate_title: {
    color: '#4E4B66',
    marginHorizontal: 58,
    fontSize: 14,
    marginTop: 2,
    fontWeight: '600',
  },
  cardSchedule: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardSchedule_header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 80,
    height: 36,
    marginBottom: 12,
  },
  imagePremiere: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  address: {
    lineHeight: 22,
    color: '#AAAAAA',
    textAlign: 'center',
    letterSpacing: 1,
    fontSize: 13,
    fontWeight: '300',
  },
  lineBreak: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderStyle: 'solid',
    marginTop: 23,
    marginBottom: 16,
  },
  cardTime: {
    flexDirection: 'row',
  },
  textTime: {
    color: '#A0A3BD',
    fontSize: 12,
    lineHeight: 23,
    letterSpacing: 1,
    marginRight: 16,
  },
  timeActive: {
    color: '#4E4B66',
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
  textPrice: {
    fontSize: 14,
    color: '#6B6B6B',
    lineHeight: 24,
  },
  textPriceNumber: {
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1,
    lineHeight: 26,
    color: '#000000',
  },
  buttonBook: {
    backgroundColor: '#5F2EEA',
    opacity: 0.5,
    borderRadius: 4,
    paddingVertical: 12,
  },
  buttonActive: {
    opacity: 1,
  },
  textBook: {
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
    lineHeight: 24,
    textAlign: 'center',
    fontSize: 14,
  },
});
