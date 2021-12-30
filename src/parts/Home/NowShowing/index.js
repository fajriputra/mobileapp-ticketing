import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {REACT_APP_HOST} from '@env';

function NowShowing({navigation, data}) {
  const toDetailPage = id => {
    navigation.navigate('DetailPage', {movieId: id});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nowShowing}>Now Showing</Text>
        <Text
          style={styles.viewAll}
          onPress={() => navigation.navigate('SearchMoviePage')}>
          view all
        </Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        contentContainerStyle={styles.content}
        renderItem={({item}) => (
          <View key={item.id} style={styles.wrapImage}>
            <Image
              style={styles.image}
              source={
                item.image
                  ? {uri: `${REACT_APP_HOST}/uploads/movie/${item.image}`}
                  : {
                      uri: 'https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg',
                    }
              }
            />

            <View style={styles.wrapDesc}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.category}>{item.category.join(', ')}</Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => toDetailPage(item.id)}
              activeOpacity={1}>
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 56,
    paddingTop: 48,
    backgroundColor: 'rgba(214, 216, 231, 1)',
  },
  header: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  nowShowing: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    color: '#5F2EEA',
  },
  viewAll: {
    fontSize: 14,
    lineHeight: 26,
    fontWeight: '600',
    color: '#5F2EEA',
  },
  content: {
    paddingHorizontal: 15,
  },
  wrapImage: {
    borderColor: '#ffffff',
    borderWidth: 3,
    borderRadius: 6,
    padding: 16,
    marginRight: 16,
  },
  image: {
    padding: 16,
    width: 122,
    height: 185,
    borderRadius: 6,
  },
  wrapDesc: {
    width: 122,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#14142B',
    marginTop: 12,
  },
  category: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5F2EEA',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
    color: '#5F2EEA',
  },
});

export default NowShowing;
