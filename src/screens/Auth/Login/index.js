import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Image, View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import tickitz from '../../../assets/images/logo-tickitz.png';

import {userLogin} from '../../../stores/auth/actions';
import {getDataUser} from '../../../stores/user/actions';

import {Input, Button} from '../../../components';

const initialState = {
  email: '',
  password: '',
};

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (value, fields) => {
    setForm({...form, [fields]: value});
  };

  const handleSubmit = async () => {
    for (const data in form) {
      if (form[data] === '') {
        setError('Please fill all fields');

        setTimeout(() => {
          setError(null);
        }, 3000);

        return;
      }
    }
    setLoading(true);
    try {
      const res = await dispatch(userLogin(form));

      await AsyncStorage.setItem('token', res.value.data.data.token);
      await AsyncStorage.setItem(
        'refreshToken',
        res.value.data.data.refreshToken,
      );

      setSuccess(res.value.data.message);
      setForm(initialState);

      dispatch(getDataUser());

      setTimeout(() => {
        setSuccess(null);
        navigation.navigate('AppScreen', {
          screen: 'Home',
        });
      }, 3000);
    } catch (err) {
      err.response.data.message && setError(err.response.data.message);
      setForm(initialState);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={tickitz} style={styles.logoBrand} />

      <Text style={styles.textSignin}>Signin</Text>

      {success && <Text style={styles.textSuccess}>{success}</Text>}

      <View style={{marginBottom: 20, position: 'relative'}}>
        <Input
          label="Email Address"
          keyboardType="email-address"
          placeholder="Write your email address"
          secureTextEntry={false}
          editable={true}
          value={form.email}
          onChangeText={value => handleChange(value, 'email')}
        />
      </View>

      <View style={{marginBottom: 40, position: 'relative'}}>
        <Input
          label="Password"
          placeholder="Write your password"
          secureTextEntry={showPassword ? false : true}
          editable={true}
          value={form.password}
          onChangeText={value => handleChange(value, 'password')}
        />

        <Icon
          name={showPassword ? 'eye' : 'eye-slash'}
          onPress={handleShowPassword}
          style={styles.icon}
          size={20}
        />
      </View>

      {error && <Text style={styles.textError}>{error}</Text>}

      <Button onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator size="small" color="#DEDEDE" />
        ) : (
          <Text style={styles.textButton}>Sign in</Text>
        )}
      </Button>

      <Text
        style={styles.textLinkWrapper}
        onPress={() => navigation.navigate('Register')}>
        Don't have an account? <Text style={styles.textLink}>Sign up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    paddingHorizontal: 15,
  },
  logoBrand: {
    width: 100,
    height: 32,
  },
  textSignin: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginVertical: 20,
  },
  icon: {
    position: 'absolute',
    top: 45,
    right: 15,
  },
  textButton: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  textLinkWrapper: {
    textAlign: 'center',
    marginTop: 30,
    color: '#6E7191',
  },
  textLink: {
    color: '#5F2EEA',
    textDecorationLine: 'underline',
  },
  textError: {
    color: '#FF5B37',
    textAlign: 'center',
    marginBottom: 30,
  },
  textSuccess: {
    color: '#1EC15F',
    textAlign: 'center',
  },
});
