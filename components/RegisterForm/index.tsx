import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';

interface RegisterFormProps {
  onRegister?: ((event: GestureResponderEvent) => void);
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { onRegister } = props;

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
      <Input
        placeholder="First Name"
        onChangeText={setFirstName}
        value={firstName}
        containerStyle={styles.inputs}
      />
      <Input
        placeholder="Last Name"
        onChangeText={setLastName}
        value={lastName}
        containerStyle={styles.inputs}
      />
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
        title="Create Account"
        onPress={onRegister}
        containerStyle={styles.registerButton}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputs: {
    width: '75%',
  },
  registerButton: {
    width: '75%',
    borderRadius: 25,
  },
});

export default RegisterForm;
