import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { SocialMediaType } from 'react-native-elements/dist/social/SocialIcon';
import LineDivider from '../../components/LineDivider';
import LoginForm from '../../components/LoginForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface LoginScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const onLogin = () => {};
  const onRegister = () => navigation.navigate('Register');
  const forgotPasswordHandler = () => {};

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
      <Text style={{ marginBottom: 10 }}>Sign In With</Text>
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
    position: 'absolute',
    bottom: 0,
    height: '10%',
  },
  clickableText: {
    color: '#4797F1',
  },
});

export default LoginScreen;
