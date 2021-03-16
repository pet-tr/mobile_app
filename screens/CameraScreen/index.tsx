import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

interface CameraScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Camera'>;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {

  const [camera, setCamera] = React.useState<Camera | null>();
  const [hasPermission, setHasPermission] = React.useState<boolean>();
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

  if (hasPermission === undefined) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {hasFocus && <Camera ref={(ref) => { setCamera(ref) }} style={styles.camera} type={type}>
        <View style={styles.headerContainer}>
          <View style={styles.headerBackContainer}>
            <TouchableOpacity
              style={styles.headerBackButton}
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialIcons name='arrow-back-ios' size={25} color='white' />
            </TouchableOpacity>
          </View>

          <View style={styles.headerFlashContainer}>
            <TouchableOpacity
              style={styles.headerFlashButton}
              onPress={() => {}}>
              <MaterialCommunityIcons name='lightning-bolt' size={25} color='white' />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerFlipContainer}>
            <TouchableOpacity
              style={styles.footerFlipButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Ionicons name={ type === Camera.Constants.Type.back ? 'camera-reverse' : 'camera-reverse-outline' } size={35} color='white' />
            </TouchableOpacity>
          </View>
          
          <View style={styles.footerCaptureContainer}>
            <View style={styles.footerCaptureRing}>
              <TouchableOpacity
                style={styles.footerCaptureButton}
                onPress={() => {}}>
                <View style={styles.footerCaptureButton} />
              </TouchableOpacity>
            </View>
          </View>


          <View style={styles.footerFilterContainer}>
            <TouchableOpacity
              style={styles.footerFilterButton}
              onPress={() => {}}>
              <Ionicons name='color-filter' size={35} color='white' />
            </TouchableOpacity>
          </View>
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
  // Header
  headerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 30,
  },
  // Back Button
  headerBackContainer: {
    flex: 0.5,
    alignSelf: 'flex-start',
  },
  headerBackButton:{
    alignSelf: 'flex-start',
  },
  // Flash Button
  headerFlashContainer: {
    flex: 0.5,
    alignSelf: 'flex-start',
  },
  headerFlashButton: {
    alignSelf: 'flex-end',
  },
  // Footer
  footerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 30,
  },
  // Flip Button
  footerFlipContainer: {
    flex: 0.33,
    alignSelf: 'flex-end',
  },
  footerFlipButton: {
    alignSelf: 'center',
  },
  // Capture Button
  footerCaptureContainer: {
    flex: 0.34,
    alignSelf: 'flex-end',
  },
  footerCaptureRing: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 64,
    width: 64,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  footerCaptureButton: {
    alignSelf: 'center',
    height: 56,
    width: 56,
    borderRadius: 50,
    backgroundColor: "red",
  },
  // Filter Button
  footerFilterContainer: {
    flex: 0.33,
    alignSelf: 'flex-end',
  },
  footerFilterButton: {
    alignSelf: 'center',
  },

  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default CameraScreen;