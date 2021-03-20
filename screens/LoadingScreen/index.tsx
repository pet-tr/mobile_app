import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import React, { useEffect } from 'react';

interface LoadingScreenProps {
}

const LoadingScreen: React.FC<LoadingScreenProps> = (props) => {
  const navigation = useNavigation();

  const resetRoute = (name: string) => (
    navigation.reset({
      index: 0,
      routes: [{ name }],
    })
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resetRoute('Root');
      } else {
        resetRoute('Login');
      }
    });
  }, []);

  return null;
}

export default LoadingScreen;
