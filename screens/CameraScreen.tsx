import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen({ navigation: { goBack } }) {

  const [camera, setCamera] = React.useState<Camera | null>(null);
  const [hasPermission, setHasPermission] = React.useState<any>(null);
  const [type, setType] = React.useState<any>(Camera.Constants.Type.back);
  const [hasFocus, setFocus] = React.useState<boolean>(false); 

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useFocusEffect(() => {
    setFocus(true);
    return () => {
      setFocus(false)
    }
  })

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {hasFocus && <Camera ref={(ref) => { setCamera(ref) }} style={styles.camera} type={type}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => {
              goBack();
            }}>
            <Text style={styles.text}> Back </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerFlashButton}
            onPress={() => {
              goBack();
            }}>
            <Text style={styles.text}> Flash </Text>
          </TouchableOpacity>
          
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.footerFlipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerCaptureButton}
            onPress={() => {
            }}>
            <Text style={styles.text}> Capture </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerFilterButton}
            onPress={() => {
            }}>
            <Text style={styles.text}> Filter </Text>
          </TouchableOpacity>
        </View>
      </Camera>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },

  headerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 30,
  },
  headerBackButton:{
    flex: 0.5,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  headerFlashButton: {
    flex: 0.5,
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
  },

  footerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 30,
  },
  footerFlipButton: {
    flex: 0.33,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  footerCaptureButton: {
    flex: 0.34,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  footerFilterButton: {
    flex: 0.33,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    color: 'white',
  },
});
