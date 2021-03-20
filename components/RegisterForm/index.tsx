import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';

interface RegisterFormProps {
  onRegister?: (email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { onRegister } = props;

  // TODO: dedicated screen for filling out personal info
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verify, setVerify] = useState<string>('');

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
      <Input
        placeholder="Verify Password"
        leftIcon={
          <MaterialIcons name="lock" size={20} color="grey" />
        }
        onChangeText={setVerify}
        value={verify}
        secureTextEntry
        containerStyle={styles.inputs}
      />
      <Button
        title="Create Account"
        onPress={() => {
          if (onRegister && verify === password) {
            onRegister(email, password);
          }
        }}
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
