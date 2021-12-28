import React, {useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Footer, Header} from '../../components';
import {
  ProfileDetail,
  ProfileInfo,
  OrderHistory,
} from '../../parts/ProfilePage';

export default function ProfilePage({navigation}) {
  const [tabAccount, setTabAccount] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.tabCard}>
        <Text
          style={[styles.textSwitch, tabAccount && styles.textActive]}
          onPress={() => setTabAccount(true)}>
          Details Account
          {tabAccount && <View style={styles.borderActive} />}
        </Text>
        <Text
          style={[styles.textSwitch, !tabAccount && styles.textActive]}
          onPress={() => setTabAccount(false)}>
          Order Historyy
          {!tabAccount && <View style={styles.borderActive} />}
        </Text>
      </View>

      <View style={styles.innerContainer}>
        {tabAccount && <ProfileInfo />}
        {tabAccount ? (
          <ProfileDetail />
        ) : (
          <OrderHistory navigation={navigation} />
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6F8',
  },
  tabCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
    zIndex: 1,
  },
  textSwitch: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 26,
    letterSpacing: 1,
    textAlign: 'center',
    color: '#AAAAAA',
    // position: 'relative',
  },
  textActive: {
    color: '#14142B',
  },
  // borderActive: {
  //   position: 'absolute',
  //   borderWidth: 1,
  //   borderStyle: 'solid',
  //   borderColor: '#5F2EEA',
  //   bottom: 0,
  //   zIndex: 3,
  //   // height: 50,
  // },
  innerContainer: {
    paddingHorizontal: 15,
  },
});
