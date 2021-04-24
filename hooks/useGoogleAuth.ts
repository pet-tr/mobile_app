import { useEffect } from 'react';
import { GOOGLE_CLIENT_ID } from '@env';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';

export default function useGoogleAuth(): () => void {
  const [, response, promptAsync] = Google.useIdTokenAuthRequest({ clientId: GOOGLE_CLIENT_ID });
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  const auth = () => {
    promptAsync();
  }

  return auth;
}
