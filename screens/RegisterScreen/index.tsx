import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import RegisterForm from '../../components/RegisterForm';
import { RootStackParamList } from '../../types';

interface RegisterScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
}

const RegisterScreen: React.FC<RegisterScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icon.png')} style={styles.image} />
      <RegisterForm />
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
