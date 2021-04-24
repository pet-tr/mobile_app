import firebase from 'firebase';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import RegisterForm from '../../components/RegisterForm';

interface RegisterScreenProps {
}

// Deprecate: fa3165a
const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const onRegister = (email: string, password: string) => {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {}) // TODO: email confirmation
      .catch(() => {}); // TODO: handle error
  }

  // TODO: use Animated view to resize image when keyboard is overlaid
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icon.png')} style={styles.image} />
      <RegisterForm onRegister={onRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
});

export default RegisterScreen;
