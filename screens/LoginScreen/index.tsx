import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { SocialMediaType } from 'react-native-elements/dist/social/SocialIcon';
import { LinearGradient } from 'expo-linear-gradient';
import useGoogleAuth from '../../hooks/useGoogleAuth';
import useFacebookAuth from '../../hooks/useFacebookAuth';

interface LoginScreenProps {
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const googleAuth = useGoogleAuth();
  const fbAuth = useFacebookAuth();

  // Login with email/password removed in fa3165a
  return (
    <LinearGradient
        colors={["#47BDC4", "#f47fec"]}
        start={[0.1, 0.1]}
        style={styles.linearGradient}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/logo/pettr.png')}
            style={styles.image}
          />
        </View>
        <Icon
          type='google'
          onPress={googleAuth}
          title='Sign In With Google'
        />
        <Icon
          type='facebook'
          onPress={fbAuth}
          title='Sign In With Facebook'
        />
      </View>
    </LinearGradient>
  );
}

interface IconProps {
  type: SocialMediaType;
  title?: string;
  onPress?: () => void;
}

const Icon: React.FC<IconProps> = ({ type, title, onPress }) => {
  return (
    <View style={styles.iconContainer}>
      <SocialIcon
        type={type}
        title={title}
        button
        iconType={'font-awesome'}
        iconColor={'white'}
        raised
        iconSize={24}
        onPress={onPress}
        onLongPress={onPress}
      />
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '75%',
    height: '75%',
  },
  iconContainer: {
    width: '80%',
    marginLeft: '10%',
    top: '-10%',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default LoginScreen;
