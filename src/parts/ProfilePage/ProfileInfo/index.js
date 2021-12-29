import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {REACT_APP_HOST} from '@env';

import {capitalFirstLetter, toPascalCase} from '../../../helpers/convertText';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from '../../../helpers/axios';

import {getDataUser} from '../../../stores/user/actions';

export default function ProfileInfo() {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.user);

  const handleUpdateImage = value => {
    if (value === null || !value) {
    } else {
      const setData = {
        image: value,
      };

      console.log('TERUPDATEEEEEEEEEEEE', setData);

      const formData = new FormData();
      for (const item in setData) {
        formData.append(item, setData[item]);
      }

      // console.log(formData);

      axios
        .patch('/user/avatar', formData)
        .then(res => {
          console.log(res);
          ToastAndroid.show(res.data.message, ToastAndroid.LONG);

          dispatch(getDataUser());
        })
        .catch(err => {
          console.log(err.response);
          err.response.data.message &&
            ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
        });
    }
  };

  const handleImage = () => {
    Alert.alert('Upload image', 'Choose your taked from', [
      {
        text: 'Gallery',
        onPress: async () => {
          try {
            const result = await launchImageLibrary();

            if (result.didCancel) {
            } else {
              handleUpdateImage({
                uri: result.assets[0].uri,
                name: result.assets[0].fileName,
                type: result.assets[0].type,
              });
            }
          } catch (err) {
            err.response.data.message &&
              ToastAndroid.show(err.response, ToastAndroid.LONG);
          }
        },
      },

      {
        text: 'Camera',
        onPress: async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'App Camera Permission',
              message: 'App needs access to your camera',
              buttonNeutral: 'Ask me later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            ToastAndroid.show('Camera permission given', ToastAndroid.LONG);

            try {
              const result = await launchCamera({
                maxHeight: 10000,
                maxWidth: 10000,
                quality: 0.5,
              });
              if (result.didCancel) {
              } else {
                handleUpdateImage({
                  uri: result.assets[0].uri,
                  name: result.assets[0].fileName,
                  type: result.assets[0].type,
                });
              }
            } catch (err) {
              err.response &&
                ToastAndroid.show(err.response, ToastAndroid.LONG);
            }
          } else {
            ToastAndroid.show('Camera permisson denied', ToastAndroid.LONG);
          }
        },
      },
    ]);
  };

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

      <TouchableOpacity
        activeOpacity={1}
        style={styles.buttonChoosePhoto}
        onPress={handleImage}>
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
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
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
