import React, {useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import tickitz from '../../assets/images/logo-tickitz.png';
import Icon from 'react-native-vector-icons/Ionicons';

import axios from '../../helpers/axios';

export default function Header({navigation}) {
  const [isCollapse, setIsCollapse] = useState(false);

  const handleCollapse = () => setIsCollapse(!isCollapse);

  const moveScreen = screen => {
    navigation.navigate(screen);
    setIsCollapse(false);
  };

  const handleLogout = async () => {
    setIsCollapse(false);

    await axios.post('/auth/logout');
    await AsyncStorage.clear();

    navigation.navigate('AuthScreen', {
      screen: 'Login',
    });
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View>
          <Image source={tickitz} style={styles.logoBrand} />
        </View>
        <View>
          {!isCollapse ? (
            <Icon
              name="menu-outline"
              color="#000000"
              size={20}
              onPress={handleCollapse}
            />
          ) : (
            <Icon
              name="close-outline"
              color="#000000"
              size={20}
              onPress={handleCollapse}
            />
          )}
        </View>
      </View>

      {isCollapse && (
        <View
          style={[styles.navigationContainer, isCollapse && styles.collapse]}>
          <View style={styles.navigationRows}>
            <View style={{marginTop: 40}}>
              <Text
                style={styles.navigationLink}
                onPress={() => moveScreen('Home')}>
                Home
              </Text>
            </View>
            <View style={styles.navigationLine} />
            <View>
              <Text
                style={styles.navigationLink}
                onPress={() => moveScreen('ProfilePage')}>
                Profile
              </Text>
            </View>
            <View style={styles.navigationLine} />
            <View>
              <Icon
                name="log-out"
                size={20}
                color="#000000"
                style={{position: 'absolute', left: 130}}
              />
              <Text style={styles.navigationLink} onPress={handleLogout}>
                Logout
              </Text>
            </View>
            <View style={styles.navigationLine} />
            <Text style={styles.navigationLinkFooter}>
              &copy; 2021 Tickitz. All Rights Reserved.
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },

  logoBrand: {
    width: 132,
    height: 36,
  },
  navigationContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
  },

  collapse: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  navigationRows: {
    flexDirection: 'column',
  },

  navigationLine: {
    marginTop: 20,
    marginBottom: 25,
    width: '100%',
    height: 1,
    backgroundColor: '#DEDEDE',
  },
  navigationLink: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  navigationLinkFooter: {
    color: '#6E7191',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
});
