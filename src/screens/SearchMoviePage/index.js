import React, {useState, useEffect} from 'react';

import {
  View,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {Input, Header, Footer} from '../../components';

export default function SearchMoviePage({navigation}) {
  return (
    <View>
      <Header navigation={navigation} />
      <ScrollView style={styles.innerContainer}>
        <View style={styles.wrapperSearch}>
          <Input placeholder="Search keyword here" />

          <TouchableOpacity style={styles.button}>
            <Text>Test</Text>
          </TouchableOpacity>
        </View>

        {/* flatlist */}
      </ScrollView>

      <View style={{flex: 1}}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'red',
  },
  wrapperSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
});
