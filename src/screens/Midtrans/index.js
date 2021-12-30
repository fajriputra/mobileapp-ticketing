import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {WebView} from 'react-native-webview';

function Midtrans({navigation, route}) {
  const toProfile = () => {
    navigation.navigate('ProfilePage');
  };

  const LoadingIndicatorView = () => {
    return (
      <ActivityIndicator
        color="#5F2EEA"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          renderLoading={LoadingIndicatorView}
          startInLoadingState={true}
          source={{
            uri: route.params.query.urlRedirect,
          }}
          style={{width: '100%', height: '100%'}}
        />
        <View style={styles.tabBarContainer}>
          <TouchableOpacity onPress={toProfile}>
            <Text style={{color: '#5F2EEA'}}>See my profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: '#d3d3d3',
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 24,
  },
  arrow: {
    color: '#ef4771',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Midtrans;
