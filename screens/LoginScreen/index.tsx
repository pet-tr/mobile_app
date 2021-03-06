import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { SocialMediaType } from 'react-native-elements/dist/social/SocialIcon';
import LineDivider from '../../components/LineDivider';
import LoginForm from '../../components/LoginForm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

interface LoginScreenProps {

}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation();

  const onLogin = (email: string, password: string) => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(() => {}); // TODO: handle error
  };
  const onRegister = () => navigation.navigate('Register');
  const forgotPasswordHandler = () => {};

  // TODO: use Animated view to resize image when keyboard is overlaid
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icon.png')} style={styles.image} />
      <LoginForm onLogin={onLogin} />
      <View style={{ height: 15 }}/>
      <TouchableOpacity>
        <Text onPress={forgotPasswordHandler} style={styles.clickableText}>Forgot password?</Text>
      </TouchableOpacity>
      <View style={{ height: 10 }} />
      <LineDivider> OR </LineDivider>
      <View style={{ height: 10 }} />
      <Text style={{ marginBottom: 10 }}>Log in with</Text>
      <View style={styles.socialIconsContainer}>
        <Icon type='facebook' onPress={() => {}}/>
        <Icon type='instagram' onPress={() => {}}/>
        <Icon type='google' onPress={() => {}}/>
      </View>
      <View style={styles.register}>
      <TouchableOpacity>
        <Text onPress={onRegister} style={styles.clickableText}>Create an account</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

interface IconProps {
  type: SocialMediaType;
  onPress?: () => void;
}

const Icon: React.FC<IconProps> = ({ type, onPress }) => {
  return (
      <SocialIcon
        type={type}
        button={false}
        iconType={'font-awesome'}
        iconColor={'white'}
        raised
        iconSize={24}
        onPress={onPress}
        onLongPress={onPress}
      />
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
  socialIconsContainer: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-between',
  },
  register: {
    marginTop: 10,
  },
  clickableText: {
    color: '#4797F1',
  },
});

export default LoginScreen;
