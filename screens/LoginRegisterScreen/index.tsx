import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { View } from '../../components/Themed';

interface LoginRegisterScreenProps {
}

const LoginRegisterScreen: React.FC<LoginRegisterScreenProps> = (props) => {
  const onLogIn = () => {};
  const onRegister = () => {};

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icon.png')} style={styles.image}/>
      <Button
        title="Log In"
        onPress={onLogIn}
        containerStyle={styles.loginButton}
      />
      <Button
        title="Register"
        onPress={onRegister}
        containerStyle={styles.registerButton}
      />
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
    marginBottom: 50,
  },
  loginButton: {
    width: '50%',
    borderRadius: 25,
    marginTop: 30,
    marginBottom: 20,
  },
  registerButton: {
    width: '50%',
    borderRadius: 25,
  }
});

export default LoginRegisterScreen;
