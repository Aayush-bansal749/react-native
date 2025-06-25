import {pick} from '@react-native-documents/picker';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

const Show = createNativeStackNavigator();
const PermissionsPage = () => (
  <View style={{flex: 1, backgroundColor: 'black'}} />
);

const NoCameraDeviceError = () => (
  <View style={{flex: 1, backgroundColor: 'red'}} />
);
const Camscreen = () => {
  const [selectedCam, selectCam] = useState('back');
  const [selectedFlash, selectFlash] = useState('off');

  const device = useCameraDevice(selectedCam);
  const cameraRef = useRef<Camera>(null);

  const navigation: any = useNavigation();
  const {
    hasPermission: hasCamPermission,
    requestPermission: requestCamPermission,
  } = useCameraPermission();

  const {
    hasPermission: hasMicPermission,
    requestPermission: requestMicPermission,
  } = useMicrophonePermission();

  useEffect(() => {
    if (!hasCamPermission) requestCamPermission();
    if (!hasMicPermission) requestMicPermission();
  }, [hasCamPermission, hasMicPermission]);

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePhoto({flash: selectedFlash});
      console.log(photo);
      navigation.navigate('Picture', {photo});
    } catch (error) {
      console.error('Failed to take or save photo:', error);
      Alert.alert('Error', 'Photo capture or save failed.');
    }
  };

  if (!hasCamPermission || !hasMicPermission) return <PermissionsPage />;
  if (device == null) return <NoCameraDeviceError />;
  console.log(selectedFlash, selectedFlash === 'off');
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        pointerEvents="none"
      />
      <TouchableOpacity
        style={styles.FlashButton}
        onPress={() => {
          selectFlash(prev => (prev === 'off' ? 'on' : 'off'));
        }}>
        {selectedFlash === 'off' ? (
          <Text style={styles.flashButtonOff}>⚡︎</Text>
        ) : (
          <Text style={styles.flashButtonOn}>⚡</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mediaButton}
        onPress={async () => {
          const [photo] = await pick({
            mode: 'open',
          });
          navigation.navigate('Picture', {photo});
        }}>
        <Text style={styles.flashButtonOff}>[◉°]</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => {
          takePhoto();
        }}></TouchableOpacity>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => {
          selectCam(prev => (prev === 'back' ? 'front' : 'back'));
        }}>
        <Text style={styles.flipButton}>⇄</Text>
      </TouchableOpacity>
    </View>
  );
};

const Picture = ({route}) => {
  const {photo} = route.params;

  const uri = photo?.path ? 'file://' + photo.path : photo?.uri;
  return (
    <View style={styles.container}>
      <Image source={{uri}} style={{flex: 1}} />
    </View>
  );
};
function Camm() {
  return (
    <Show.Navigator>
      <Show.Screen
        name={'Camera'}
        component={Camscreen}
        options={{headerShown: false}}
      />
      <Show.Screen name={'Picture'} component={Picture} />
    </Show.Navigator>
  );
}

export default Camm;

const styles = StyleSheet.create({
  container: {flex: 1},
  captureButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 65,
    height: 65,
    width: 65,
    backgroundColor: 'transparent',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    height: 65,
    width: 78,
    backgroundColor: 'transparent',
    marginLeft: 220,
  },
  flipButton: {
    color: 'white',
    position: 'absolute',
    bottom: -13,
    fontSize: 80,
  },
  FlashButton: {
    position: 'absolute',
    top: 40,
    alignSelf: 'flex-end',
    borderRadius: 65,
    height: 65,
    width: 65,
    backgroundColor: 'transparent',

    justifyContent: 'center',
  },
  flashButtonOff: {
    color: 'white',
    position: 'absolute',

    alignSelf: 'center',
    fontSize: 40,
  },
  flashButtonOn: {
    color: 'white',
    position: 'absolute',

    alignSelf: 'center',
    fontSize: 30,
  },
  mediaButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    height: 65,
    width: 78,
    backgroundColor: 'transparent',
    marginRight: 220,
  },
});
