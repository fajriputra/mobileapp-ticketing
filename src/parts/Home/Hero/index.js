import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import HeroImage from '../../../assets/images/hero-image.png';

function Hero() {
  return (
    <View style={styles.container}>
      <Text style={styles.desc}>Nearest Cinema, Newest Movie,</Text>
      <Text style={styles.title}>Find out now!</Text>

      <View style={{alignItems: 'center'}}>
        <Image style={styles.image} source={HeroImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 57,
    paddingBottom: 80,
    paddingHorizontal: 15,
  },
  title: {
    color: '#5F2EEA',
    fontSize: 38,
    lineHeight: 50,
    fontWeight: '700',
    marginBottom: 40,
  },
  desc: {
    fontSize: 14,
    color: '#A0A3BD',
    lineHeight: 17,
  },
  image: {
    width: 327,
    height: 372,
  },
});

export default Hero;
