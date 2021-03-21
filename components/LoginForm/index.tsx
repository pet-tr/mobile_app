import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { onLogin } = props;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
      <Input
        placeholder="E-mail"
        leftIcon={
          <MaterialIcons name="email" size={20} color="grey" />
        }
        onChangeText={setEmail}
        value={email}
        containerStyle={styles.inputs}
      />
      <Input
        placeholder="Password"
        leftIcon={
          <MaterialIcons name="lock" size={20} color="grey" />
        }
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        containerStyle={styles.inputs}
      />
      <Button
        title="Log In"
        onPress={() => {
          if (onLogin) onLogin(email, password);
        }}
        containerStyle={styles.loginButton}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputs: {
    width: '80%',
  },
  loginButton: {
    width: '75%',
    borderRadius: 25,
  },
});


export default LoginForm;
