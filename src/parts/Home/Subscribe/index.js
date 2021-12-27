import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Subscribe() {
  return (
    <View style={{paddingHorizontal: 15}}>
      <View style={styles.container}>
        <Text style={styles.sub}>Be the vanguard of the</Text>
        <Text style={styles.title}>Moviegoers</Text>

        <TextInput style={styles.input} placeholder="Type your email" />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Join now</Text>
        </TouchableOpacity>

        <Text style={styles.desc}>
          By joining you as a Tickitz member, we will always send you the latest
          updates via email.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    elevation: 2,
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  sub: {
    textAlign: 'center',
    lineHeight: 24,
    color: '#4E4B66',
  },
  title: {
    color: '#5F2EEA',
    fontWeight: '700',
    fontSize: 32,
    textAlign: 'center',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 42,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(222, 222, 222, 1)',
  },
  button: {
    paddingVertical: 16,
    backgroundColor: '#5F2EEA',
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 32,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
  },
  desc: {
    lineHeight: 22,
    textAlign: 'center',
    color: '#4E4B66',
  },
});

export default Subscribe;
