/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {REACT_APP_HOST} from '@env';

import {getMovieFilter} from '../../../stores/movies/actions';

const initialState = {
  page: 1,
  limit: 6,
  keyword: '',
  month: '',
  sortBy: 'name',
  sortType: 'asc',
};

function Upcoming({navigation}) {
  const dispatch = useDispatch();

  const [upcoming, setUpcoming] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const {page, limit, keyword, month, sortBy, sortType} = upcoming;

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const toDetailPage = id => {
    navigation.navigate('DetailPage', {movieId: id});
  };

  // console.log(filtered);

  const handleCategory = mth => {
    setUpcoming({...upcoming, month: mth});
    setLoading(true);
    dispatch(getMovieFilter(page, limit, keyword, mth, sortBy, sortType))
      .then(res => {
        setFiltered(res.value.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.upComing}>Upcoming Movies</Text>
        <Text
          style={styles.viewAll}
          onPress={() => navigation.navigate('SearchMoviePage')}>
          view all
        </Text>
      </View>

      <ScrollView
        horizontal
        style={styles.month}
        showsHorizontalScrollIndicator={false}>
        {monthNames.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.monthWrap,
              month === index && styles.monthWrapActive,
            ]}
            onPress={() => handleCategory(index)}
            activeOpacity={1}>
            <Text
              style={[
                styles.monthItem,
                month === index && styles.monthItemActive,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.content}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#5F2EEA" />
          </View>
        ) : filtered.length > 0 ? (
          <>
            {filtered.map(item => (
              <View key={item.id} style={styles.wrapImage}>
                <Image
                  style={styles.image}
                  source={
                    item.image
                      ? {uri: `${REACT_APP_HOST}/uploads/movie/${item.image}`}
                      : {
                          uri: 'https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg',
                        }
                  }
                />
                <View style={styles.wrapDesc}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.category}>
                    {item.category.join(', ')}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => toDetailPage(item.id)}>
                  <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{alignItems: 'center'}}>
              {monthNames[month]
                ? `Movie by month ${monthNames[month]} is not found`
                : 'Select a month to see the upcoming movies'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 72,
    paddingTop: 80,
  },
  header: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  upComing: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    color: '#14142B',
  },
  viewAll: {
    fontSize: 14,
    lineHeight: 26,
    fontWeight: '600',
    color: '#5F2EEA',
  },
  month: {
    paddingHorizontal: 15,
    marginBottom: 40,
  },
  monthWrap: {
    paddingVertical: 12,
    minWidth: 127,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#5F2EEA',
    marginRight: 16,
  },
  monthItem: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    color: '#5F2EEA',
    textAlign: 'center',
  },
  monthWrapActive: {
    backgroundColor: '#5F2EEA',
  },
  monthItemActive: {
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 15,
  },
  wrapImage: {
    borderColor: 'rgba(222, 222, 222, 1)',
    borderWidth: 2,
    borderRadius: 6,
    padding: 16,
    marginRight: 16,
  },
  image: {
    padding: 16,
    width: 122,
    height: 185,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  wrapDesc: {
    width: 122,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#14142B',
    marginTop: 12,
  },
  category: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5F2EEA',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
    color: '#5F2EEA',
  },
});

export default Upcoming;
