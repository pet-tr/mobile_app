import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem  from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { CameraType, FlashMode } from './types';

interface CameraScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Camera'>;
}

const ALBUM_NAME: string = 'Pet-tr';

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {

  const camera = React.useRef<Camera>()

  const [cameraReady, setCameraReady] = React.useState<boolean>(false);
  const [hasCamPermission, setCamPermission] = React.useState<boolean>();
  const [hasMediaLibPermission, setMediaLibPermission] = React.useState<boolean>();

  const [album, setAlbum] = React.useState<MediaLibrary.Album>();

  const [camType, setcamType] = React.useState<CameraType>(CameraType.back);
  const [camFlashMode, setCamFlashMode] = React.useState<FlashMode>(FlashMode.off);

  const [hasFocus, setFocus] = React.useState<boolean>(false); 

  const requestCamPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setCamPermission(status === MediaLibrary.PermissionStatus.GRANTED);
  };

  const requestMediaLibPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setMediaLibPermission(status === MediaLibrary.PermissionStatus.GRANTED);
  }

  const getAlbum = async () => {
    if (hasMediaLibPermission) {

      const _album: MediaLibrary.Album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
      setAlbum(_album || undefined);
    }
  }

  React.useEffect(() => {
    requestCamPermissions();
    requestMediaLibPermissions();
    getAlbum();
  }, []);

  const capture = async () => {
    if (camera.current != null && cameraReady) {

      const { uri } = await camera.current.takePictureAsync();

      const asset: MediaLibrary.Asset = await MediaLibrary.createAssetAsync(uri);

      if (album == undefined) {

        const _album: MediaLibrary.Album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset, false);
        setAlbum(_album)

      } else {

        await MediaLibrary.addAssetsToAlbumAsync([asset], album);

      }
    }
  }

  useFocusEffect(() => {
    setFocus(true);
    return () => {
      setFocus(false)
    }
  })

  if (hasCamPermission === undefined || hasMediaLibPermission === undefined) {
    return <View />;
  }

  if (hasCamPermission === false || hasMediaLibPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {hasFocus && <Camera 
        ref={(ref : Camera) => { camera.current = ref }}
        onCameraReady={() => { setCameraReady(true) }} 
        style={styles.camera}  
        type={camType} 
        flashMode={camFlashMode}
      >
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
              onPress={() => {
                setCamFlashMode(
                  camFlashMode === FlashMode.off
                    ? FlashMode.on
                    : FlashMode.off
                )
              }}>
              <MaterialCommunityIcons name={ camFlashMode === FlashMode.off ? 'lightning-bolt-outline' : 'lightning-bolt' } size={25} color='white' />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerFlipContainer}>
            <TouchableOpacity
              style={styles.footerFlipButton}
              onPress={() => {
                setcamType(
                  camType === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
              }}>
              <Ionicons name={ camType === CameraType.back ? 'camera-reverse' : 'camera-reverse-outline' } size={35} color='white' />
            </TouchableOpacity>
          </View>
          
          <View style={styles.footerCaptureContainer}>
            <View style={styles.footerCaptureRing}>
              <TouchableOpacity
                style={styles.footerCaptureButton}
                onPress={() => { 
                  capture(); 
                 }}>
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
    height: 72,
    width: 72,
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
