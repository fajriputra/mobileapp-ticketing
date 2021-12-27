import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {REACT_APP_HOST} from '@env';

export default function DetailImage({data}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperImage}>
        <Image
          source={
            data?.image
              ? {uri: `${REACT_APP_HOST}/uploads/movie/${data?.image}`}
              : {
                  uri: 'https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg',
                }
          }
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperImage: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderStyle: 'solid',
    width: 223,
    height: 308,
    padding: 32,
  },
  image: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
