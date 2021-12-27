import React, {useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import tickitz from '../../../assets/images/logo-tickitz.png';

import axios from '../../../helpers/axios';
import {Input, Button} from '../../../components';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
};

export default function Register({navigation}) {
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

        return false;
      }
    }
    setLoading(true);
    try {
      const res = await axios.post('/auth/register', form);

      setSuccess(res.data.message);
      setForm(initialState);

      setTimeout(() => {
        setSuccess(null);
        navigation.navigate('Login', {
          screen: 'Login',
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={tickitz} style={styles.logoBrand} />

      <Text style={styles.textSignup}>Signup</Text>

      {success && <Text style={styles.textSuccess}>{success}</Text>}

      <View style={{marginBottom: 20, position: 'relative'}}>
        <Input
          label="First Name"
          keyboardType="default"
          placeholder="Write your firstname"
          secureTextEntry={false}
          editable={true}
          value={form.firstName}
          onChangeText={value => handleChange(value, 'firstName')}
        />
      </View>
      <View style={{marginBottom: 20, position: 'relative'}}>
        <Input
          label="Last Name"
          keyboardType="default"
          placeholder="Write your lastname"
          secureTextEntry={false}
          editable={true}
          value={form.lastName}
          onChangeText={value => handleChange(value, 'lastName')}
        />
      </View>
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
      <View style={{marginBottom: 20, position: 'relative'}}>
        <Input
          label="Phone Number"
          keyboardType="numeric"
          placeholder="Write your phone number"
          secureTextEntry={false}
          editable={true}
          value={form.phoneNumber}
          onChangeText={value => handleChange(value, 'phoneNumber')}
        />
      </View>
      <View style={{marginBottom: 40, position: 'relative'}}>
        <Input
          label="Password"
          placeholder="Create your password"
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
          <Text style={styles.textButton}>Join for free now</Text>
        )}
      </Button>

      <Text
        style={styles.textLink}
        onPress={() => navigation.navigate('Login')}>
        Do you already have an account?
        <Text style={styles.textLinkSignin}> Sign in</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginHorizontal: 15,
  },
  logoBrand: {
    width: 100,
    height: 32,
  },
  textSignup: {
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
  textLink: {
    textAlign: 'center',
    marginTop: 30,
    color: '#6E7191',
  },
  textLinkSignin: {
    marginLeft: 8,
    color: '#5F2EEA',
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
