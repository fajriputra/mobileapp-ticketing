import React, {useEffect} from 'react';
import tickitz from '../../assets/images/logo-tickitz-white.png';
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {
  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    setTimeout(() => {
      if (token) {
        navigation.navigate('AppScreen');
      } else {
        navigation.navigate('AuthScreen');
      }
    }, 3000);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={tickitz} style={styles.logoBrand} />

      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5F2EEA',
  },
  logoBrand: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
});
