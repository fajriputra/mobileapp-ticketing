import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {View, Text} from 'react-native';
import {store, persistor} from './src/stores';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View>
          <Text>test</Text>
        </View>
      </PersistGate>
    </Provider>
  );
}

export default App;
