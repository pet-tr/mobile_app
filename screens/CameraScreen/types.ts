import { Camera } from 'expo-camera';

export enum CameraType {
  back = Camera.Constants.Type.back,
  front = Camera.Constants.Type.front,
}

export enum FlashMode {
  off = Camera.Constants.FlashMode.off,
  on = Camera.Constants.FlashMode.on,
}
