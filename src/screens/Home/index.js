/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import Hero from '../../parts/Home/Hero';
import NowShowing from '../../parts/Home/NowShowing';
import Subscribe from '../../parts/Home/Subscribe';
import Upcoming from '../../parts/Home/Upcoming';
import {Footer, Header} from '../../components';

import {getMovie} from '../../stores/movies/actions';

const queryMovie = {
  page: 1,
  limit: 6,
  keyword: '',
  month: '',
  sortBy: 'name',
  sortType: 'asc',
};

export default function Home({navigation}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const {page, limit, keyword, month, sortBy, sortType} = queryMovie;

  const movies = useSelector(state => state.movies);

  useEffect(() => {
    setLoading(true);
    dispatch(getMovie(page, limit, keyword, month, sortBy, sortType)).finally(
      () => {
        setLoading(false);
      },
    );
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="#5F2EEA" />
      </View>
    );
  }

  return (
    <ScrollView style={{backgroundColor: '#ffffff'}}>
      <Header navigation={navigation} />
      <Hero />
      <NowShowing navigation={navigation} data={movies.data} />
      <Upcoming navigation={navigation} />
      <Subscribe />
      <Footer />
    </ScrollView>
  );
}
