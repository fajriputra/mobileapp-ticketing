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

const data = [
  {
    id: 1,
    name: 'asd1',
  },
  {
    id: 2,
    name: 'asd2',
  },
  {
    id: 3,
    name: 'asd3',
  },
  {
    id: 4,
    name: 'asd4',
  },
  {
    id: 5,
    name: 'asd5',
  },
];

export default function SearchMoviePage({navigation}) {
  return (
    <ScrollView>
      <Header navigation={navigation} />
      <View style={styles.innerContainer}>
        <View style={styles.wrapperSearch}>
          <Input placeholder="Search keyword here" />

          <TouchableOpacity style={styles.button}>
            <Text>Test</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          // horizontal
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                height: 100,
                // width: 100,
                backgroundColor: 'red',
                marginVertical: 20,
                // marginRight: 20,
              }}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: 15,
    backgroundColor: 'gray',
  },
  wrapperSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
