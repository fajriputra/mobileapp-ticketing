import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {Button, Input} from '../../../components';

import {getDataUser} from '../../../stores/user/actions';

import axios from '../../../helpers/axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};

export default function ProfileDetail() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const {firstName, lastName, email, phoneNumber} = form;

  useEffect(() => {
    dispatch(getDataUser()).then(res => {
      setForm({
        ...form,
        firstName: res.value.data.data[0].firstName,
        lastName: res.value.data.data[0].lastName,
        email: res.value.data.data[0].email,
        phoneNumber: res.value.data.data[0].phoneNumber,
      });
    });
  }, [dispatch]);

  const handleChange = (value, fields) => {
    setForm({...form, [fields]: value});
    setPassword({...password, [fields]: value});
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleUpdateProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await axios.patch('/user/update-profile', {
        firstName,
        lastName,
        phoneNumber,
      });

      ToastAndroid.show(res.data.message, ToastAndroid.LONG);

      dispatch(getDataUser());
    } catch (err) {
      err.response.data.message &&
        ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
    }
    setLoadingProfile(false);
  };

  const handleUpdatePassword = async () => {
    setLoadingPassword(true);
    try {
      const res = await axios.patch('/user/update-password', password);

      ToastAndroid.show(res.data.message, ToastAndroid.LONG);

      setPassword({...password, newPassword: '', confirmPassword: ''});
    } catch (err) {
      err.response.data.message &&
        ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);

      setPassword({...password, newPassword: '', confirmPassword: ''});
    }
    setLoadingPassword(false);
  };

  return (
    <View>
      <Text style={styles.textAccount}>Account Settings</Text>

      <View style={styles.cardAccount}>
        <Text style={styles.textTitleAccont}>Detail Information</Text>
        <View style={styles.lineBreak} />

        <View style={styles.formGroup}>
          <Input
            label="First Name"
            keyboardType="default"
            placeholder="ex: Jonas El"
            secureTextEntry={false}
            editable={true}
            value={firstName}
            onChangeText={value => handleChange(value, 'firstName')}
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            label="Last Name"
            keyboardType="default"
            placeholder="ex: Rodriguez"
            secureTextEntry={false}
            editable={true}
            value={lastName}
            onChangeText={value => handleChange(value, 'lastName')}
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            label="Email Address"
            keyboardType="email-address"
            placeholder="ex: rodriguez@gmail.com"
            secureTextEntry={false}
            editable={false}
            value={email}
            onChangeText={value => handleChange(value, 'email')}
          />
        </View>
        <View style={[styles.formGroup, styles.lastChild]}>
          <Input
            label="Phone Number"
            keyboardType="numeric"
            placeholder="ex: 08xx xxx xxx"
            secureTextEntry={false}
            editable={true}
            value={phoneNumber}
            onChangeText={value => handleChange(value, 'phoneNumber')}
          />
        </View>
      </View>

      <Button onPress={handleUpdateProfile}>
        {loadingProfile ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.textUpdate}>Update changes</Text>
        )}
      </Button>

      <View style={[styles.cardAccount, styles.cardAccountPassword]}>
        <Text style={styles.textTitleAccont}>Account and Privacy</Text>
        <View style={styles.lineBreak} />

        <View style={styles.formGroup}>
          <Input
            label="New Password"
            placeholder="Write your new password"
            secureTextEntry={showPassword ? false : true}
            editable={true}
            value={password.newPassword}
            onChangeText={value => handleChange(value, 'newPassword')}
          />

          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            onPress={handleShowPassword}
            style={styles.icon}
            size={20}
          />
        </View>
        <View style={[styles.formGroup, styles.lastChild]}>
          <Input
            label="Confirmation Password"
            placeholder="Confirm your password"
            secureTextEntry={showPassword ? false : true}
            editable={true}
            value={password.confirmPassword}
            onChangeText={value => handleChange(value, 'confirmPassword')}
          />

          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            onPress={handleShowPassword}
            style={styles.icon}
            size={20}
          />
        </View>
      </View>

      <Button onPress={handleUpdatePassword}>
        {loadingPassword ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.textUpdate}>Update changes</Text>
        )}
      </Button>

      <View style={{marginBottom: 54}} />
    </View>
  );
}

const styles = StyleSheet.create({
  textAccount: {
    marginBottom: 24,
    fontSize: 18,
    fontWeight: '600',
    color: '#14142B',
    lineHeight: 24,
    letterSpacing: 1,
  },
  cardAccount: {
    backgroundColor: '#ffffff',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 25,
  },
  cardAccountPassword: {
    marginTop: 25,
  },
  textTitleAccont: {
    fontSize: 16,
    fontWeight: '400',
    color: '#14142B',
    lineHeight: 28,
    letterSpacing: 1,
  },

  lineBreak: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderStyle: 'solid',
    marginTop: 10,
    marginBottom: 40,
  },
  formGroup: {
    marginBottom: 25,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 45,
    right: 20,
  },
  lastChild: {
    marginBottom: 0,
  },
  textUpdate: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: 'center',
    color: '#ffffff',
  },
});
