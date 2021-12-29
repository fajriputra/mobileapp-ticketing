import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Input} from '../../../components';

export default function PersonaInfo() {
  const {data} = useSelector(state => state.user);

  return (
    <View>
      <Text style={styles.textInfo}>Personal Info</Text>

      <View style={styles.cardPersonalInfo}>
        <View style={{marginBottom: 20, position: 'relative'}}>
          <Input
            label="Full Name"
            keyboardType="default"
            secureTextEntry={false}
            editable={false}
            value={`${data.firstName} ${data.lastName}`}
          />
        </View>
        <View style={{marginBottom: 20, position: 'relative'}}>
          <Input
            label="Email Address"
            keyboardType="email-address"
            secureTextEntry={false}
            editable={false}
            value={data.email}
          />
        </View>
        <View style={{marginBottom: 20, position: 'relative'}}>
          <Input
            label="Phone Number"
            keyboardType="numeric"
            secureTextEntry={false}
            editable={false}
            value={data.phoneNumber}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInfo: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 1,
    lineHeight: 24,
    marginBottom: 16,
  },
  cardPersonalInfo: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
});
