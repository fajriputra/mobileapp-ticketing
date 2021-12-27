/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Footer() {
  return (
    <View style={{paddingHorizontal: 15, backgroundColor: '#FFFFFF'}}>
      <View>
        <Image
          source={require('../../assets/images/logo-tickitz.png')}
          style={styles.footer_brandLogo}
        />
        <Text style={styles.footer_description}>
          Stop waiting in line. Buy tickets conveniently, watch movies quietly.
        </Text>

        <View style={{marginBottom: 40}}>
          <Text style={styles.footer_listTextTitle}>Explore</Text>

          <View style={styles.footer_listLink}>
            <Text style={styles.footer_listTextLink}>Cinemas</Text>
            <Text style={styles.footer_listTextLink}>Movies List</Text>
            <Text style={styles.footer_listTextLink}>Notification</Text>
            <Text style={styles.footer_listTextLink}>My Ticket</Text>
          </View>
        </View>

        <View style={{marginBottom: 40}}>
          <Text style={styles.footer_listTextTitle}>Our Sponsor</Text>

          <View style={styles.footer_listLink}>
            <Image
              source={require('../../assets/images/sponsor/logo-ebvid.png')}
              style={styles.footer_listSponsorImage}
            />
            <Image
              source={require('../../assets/images/sponsor/logo-cineone.png')}
              style={styles.footer_listSponsorImage}
            />
            <Image
              source={require('../../assets/images/sponsor/logo-hiflix.png')}
              style={styles.footer_listSponsorImage}
            />
          </View>
        </View>

        <View style={{marginBottom: 40}}>
          <Text style={styles.footer_listTextTitle}>Follow Us</Text>

          <View style={styles.footer_listSocialMedia}>
            <Icon name="facebook" size={20} color="#6E7191" />
            <Icon name="instagram" size={20} color="#6E7191" />
            <Icon name="twitter" size={20} color="#6E7191" />
            <Icon name="youtube" size={20} color="#6E7191" />
          </View>
        </View>

        <View style={styles.footer_copyRight}>
          <Text style={styles.footer_copyRightText}>
            &copy; 2021 Tickitz. All Rights Reserved.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer_brandLogo: {
    width: 132,
    marginTop: 75,
    height: 36,
  },
  footer_description: {
    width: 253,
    color: '#6E7191',
    marginTop: 23,
    marginBottom: 40,
    lineHeight: 24,
  },
  footer_listTextTitle: {
    marginBottom: 12,
    fontWeight: '600',
    color: '#000000',
  },
  footer_listLink: {
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footer_listSponsorImage: {
    width: 80,
    height: 32,
    resizeMode: 'contain',
  },
  footer_listSocialMedia: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '60%',
  },
  footer_copyRight: {
    marginTop: 10,
  },

  footer_copyRightText: {
    color: '#6E7191',
    fontSize: 13,
    marginBottom: 64,
  },
});
