import React from 'react';
import {useSelector} from 'react-redux';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {REACT_APP_HOST} from '@env';

import {capitalFirstLetter, toPascalCase} from '../../../helpers/convertText';

export default function ProfileInfo() {
  const {data} = useSelector(state => state.user);

  return (
    <View style={styles.cardProfile}>
      <View style={styles.cardProfile_header}>
        <Text style={styles.textInfo}>INFO</Text>
        <Icon name="ellipsis-h" size={20} color="#5F2EEA" />
      </View>

      <View style={styles.cardProfile_data}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.avatar}
            source={
              data.avatar
                ? {uri: `${REACT_APP_HOST}/uploads/user/${data.avatar}`}
                : {
                    uri: 'https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg',
                  }
            }
          />
        </View>

        <Text style={styles.textName}>
          {toPascalCase(`${data.firstName || ''} ${data.lastName || ''}`)}
        </Text>
        <Text style={styles.textRol}>
          {capitalFirstLetter(data.role || '')}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={1} style={styles.buttonChoosePhoto}>
        <Text style={styles.textChoosePhoto}>Choose Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardProfile: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 54,
    marginBottom: 25,
  },

  cardProfile_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  textInfo: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4E4B66',
    lineHeight: 32,
    letterSpacing: 1,
  },
  cardProfile_data: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    // backgroundColor: 'red',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textName: {
    color: '#14142B',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 34,
    letterSpacing: 1,
    textAlign: 'center',
  },
  buttonChoosePhoto: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5F2EEA',
    padding: 12,
    width: 120,
    borderRadius: 6,
    marginHorizontal: '26%',
    marginVertical: 10,
  },
  textChoosePhoto: {
    fontWeight: '600',
    color: '#ffffff',
  },
});
