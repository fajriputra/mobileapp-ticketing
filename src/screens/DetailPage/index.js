/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, ScrollView, View} from 'react-native';

import {Footer, Header} from '../../components';
import {
  DetailImage,
  DetailTitle,
  DetailInfo,
  Showtimes,
} from '../../parts/DetailPage';

import {getMovieById} from '../../stores/movies/actions';

export default function DetailPage({navigation, route}) {
  const dispatch = useDispatch();

  const [detailMovie, setDetailMovie] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    dispatch(getMovieById(route.params.movieId))
      .then(res => {
        setDetailMovie(res.value.data.data);
      })

      .finally(() => {
        setLoading(false);
      });
  }, [route.params.movieId]);

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
      <View style={{paddingHorizontal: 15, paddingTop: 37, paddingBottom: 56}}>
        <DetailImage data={detailMovie[0]} />
        <DetailTitle data={detailMovie[0]} />
        <DetailInfo data={detailMovie[0]} />
      </View>
      <View style={{backgroundColor: '#F5F6F8', paddingHorizontal: 15}}>
        <Showtimes />
      </View>
      <Footer />
    </ScrollView>
  );
}
