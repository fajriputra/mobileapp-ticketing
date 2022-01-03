import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Header} from '../../components';
import {REACT_APP_HOST} from '@env';

import {getMovieFilter} from '../../stores/movies/actions';

const initialState = {
  page: 1,
  limit: 4,
  keyword: '',
  month: '',
  sortBy: 'name',
  sortType: 'asc',
};

export default function SearchMoviePage({navigation}) {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);

  const [refresh, setRefresh] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingInfinite, setLoadingInfinite] = useState(false);
  const [queryMovie, setQueryMovie] = useState(initialState);
  const [filtered, setFiltered] = useState(movies.data);
  const [wrapperKeyword, setWrapperKeyword] = useState('');

  const toDetailPage = id => {
    navigation.navigate('DetailPage', {movieId: id});
  };

  const handleChangeKeyword = value => {
    setWrapperKeyword(value);
  };

  useEffect(() => {
    getData();
  }, [queryMovie.page, queryMovie.keyword]);

  const handleSearch = () => {
    setLoadingSearch(true);
    setQueryMovie({...queryMovie, page: 1, keyword: wrapperKeyword});

    getData();
  };

  const getData = () => {
    if (queryMovie.page <= movies?.pageInfo?.totalPage) {
      dispatch(
        getMovieFilter(
          queryMovie.page,
          queryMovie.limit,
          queryMovie.keyword,
          queryMovie.month,
          queryMovie.sortBy,
          queryMovie.sortType,
        ),
      )
        .then(res => {
          if (queryMovie.page === 1) {
            setFiltered(res.value.data.data);
          } else {
            setFiltered([...filtered, ...res.value.data.data]);
          }
        })
        .finally(() => {
          setWrapperKeyword('');
          setLoadingSearch(false);
          setLoadingInfinite(false);
          setRefresh(false);
          setLoadMore(false);
        });
    } else {
      setLastPage(true);
    }
  };

  const handleRefresh = () => {
    setQueryMovie({...queryMovie, page: 1});
    setLastPage(false);
    if (queryMovie.page !== 1) {
      setRefresh(true);
    }
  };

  const handleLoadMore = () => {
    if (!loadMore) {
      const newPage = queryMovie.page + 1;
      setLoadMore(true);

      if (newPage <= movies?.pageInfo?.totalPage + 1) {
        setLoadingInfinite(true);
        setQueryMovie({...queryMovie, page: newPage});
      } else {
        setLoadingInfinite(false);
      }
    }
  };
  return (
    <View style={{backgroundColor: '#ffffff'}}>
      <Header navigation={navigation} />
      <View style={styles.innerContainer}>
        <View style={styles.wrapperSearch}>
          <Input
            placeholder="Search keyword here"
            keyboardType="default"
            secureTextEntry={false}
            editable={true}
            value={wrapperKeyword}
            onChangeText={value => handleChangeKeyword(value)}
          />

          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={handleSearch}
            activeOpacity={1}>
            <Icon name="search" color="#ffffff" style={styles.iconSearch} />
          </TouchableOpacity>
        </View>

        {loadingSearch ? (
          <View style={{marginVertical: 40}}>
            <ActivityIndicator size="large" color="#5F2EEA" />
          </View>
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
            onRefresh={handleRefresh}
            refreshing={refresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() =>
              lastPage ? (
                <Text style={{height: 450}}>No more data</Text>
              ) : (
                loadingInfinite && (
                  <View style={{height: 500}}>
                    <ActivityIndicator size="large" color="#5F2EEA" />
                  </View>
                )
              )
            }
          />
        ) : (
          <View style={styles.notFound}>
            <Text>Movie {queryMovie.keyword} was not found</Text>
          </View>
        )}
      </View>
    </View>
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
  },
  buttonSearch: {
    backgroundColor: '#5F2EEA',
    padding: 15,
    borderRadius: 6,
  },
  iconSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
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
    marginVertical: 40,
  },
});
