import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Header, Footer} from '../../components';
import {REACT_APP_HOST} from '@env';

import {getMovieFilter} from '../../stores/movies/actions';

const initialState = {
  page: 1,
  limit: 3,
  keyword: '',
  month: '',
  sortBy: 'name',
  sortType: 'asc',
};

export default function SearchMoviePage({navigation}) {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);

  const [loading, setLoading] = useState(false);
  const [queryMovie, setQueryMovie] = useState(initialState);
  const [filtered, setFiltered] = useState(movies.data);

  const toDetailPage = id => {
    navigation.navigate('DetailPage', {movieId: id});
  };

  const handleChangeKeyword = value => {
    setQueryMovie({...queryMovie, keyword: value});
  };

  const handleSearch = () => {
    setLoading(true);
    dispatch(
      getMovieFilter(
        1,
        queryMovie.limit,
        queryMovie.keyword,
        queryMovie.month,
        queryMovie.sortBy,
        queryMovie.sortType,
      ),
    )
      .then(res => {
        setFiltered(res.value.data.data);
      })
      .finally(() => {
        setQueryMovie(initialState);
        setLoading(false);
      });
  };

  return (
    <ScrollView style={{backgroundColor: '#ffffff'}}>
      <Header navigation={navigation} />
      <View style={styles.innerContainer}>
        <View style={styles.wrapperSearch}>
          <Input
            placeholder="Search keyword here"
            keyboardType="default"
            secureTextEntry={false}
            editable={true}
            value={queryMovie.keyword}
            onChangeText={value => handleChangeKeyword(value)}
          />

          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={handleSearch}
            activeOpacity={1}>
            <Icon name="search" color="#ffffff" style={styles.iconSearch} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#5F2EEA" />
        ) : filtered.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filtered}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
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
                  onPress={() => toDetailPage(item.id)}
                  activeOpacity={1}>
                  <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.notFound}>
            <Text>Movie are you looking for was not found</Text>
          </View>
        )}
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: 15,
  },
  wrapperSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  buttonSearch: {
    backgroundColor: '#5F2EEA',
    padding: 15,
    borderRadius: 6,
  },
  iconSearch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapImage: {
    borderColor: '#DEDEDE',
    borderWidth: 3,
    borderRadius: 6,
    padding: 16,
    marginBottom: 16,
    width: 200,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 6,
  },
  wrapDesc: {
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
  notFound: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
  },
});
