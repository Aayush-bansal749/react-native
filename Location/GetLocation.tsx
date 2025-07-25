import React, {useEffect, useState} from 'react';
import BootSplash from 'react-native-bootsplash';
import Geolocation from '@react-native-community/geolocation';
import {Alert, Linking, Text, TouchableOpacity, View} from 'react-native';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
const Location = () => {
  const [info, setinfo] = useState({
    coords: {
      longitude: 0,
      latitude: 0,
    },
  });
  const [skipPermissionRequests, setSkipPermissionRequests] = useState(false);
  const [authorizationLevel, setAuthorizationLevel] = useState<
    'whenInUse' | 'always' | 'auto'
  >('auto');
  const [locationProvider, setLocationProvider] = useState<
    'playServices' | 'android' | 'auto'
  >('auto');

  useEffect(() => {
    const hideSplashScreen = async () => {
      await BootSplash.hide({fade: true});
    };

    Geolocation.requestAuthorization();
    check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(status => {
      switch (status) {
        case RESULTS.UNAVAILABLE:
          return console.log(
            'This feature is not available (on this device / in this context)',
          );
        case RESULTS.DENIED:
          return console.log(
            'The permission has not been requested / is denied but requestable',
          );
        case RESULTS.BLOCKED:
          return console.log('The permission is denied and not requestable');
        case RESULTS.GRANTED:
          return console.log('The permission is granted');
        case RESULTS.LIMITED:
          return console.log('The permission is granted but with limitations');
      }
    });
    request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(status => {
      switch (status) {
        case RESULTS.UNAVAILABLE:
          return console.log(
            'This feature is not available (on this device / in this context)',
          );
        case RESULTS.DENIED:
          return console.log(
            'The permission has not been requested / is denied but requestable',
          );
        case RESULTS.BLOCKED:
          return console.log('The permission is denied and not requestable');
        case RESULTS.GRANTED:
          return console.log('The permission is granted');
        case RESULTS.LIMITED:
          return console.log('The permission is granted but with limitations');
      }
    });
    hideSplashScreen();
  }, []);

  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests,
      authorizationLevel,
      locationProvider,
    });
  }, [skipPermissionRequests, authorizationLevel, locationProvider]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212121',
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'lightgreen',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() =>
          Geolocation.getCurrentPosition(
            info => {
              setinfo(info);
              console.log(info);
            },
            error => {
              if (error.code === 2) {
                Alert.alert(
                  'Location Disabled',
                  'Please turn on location services (GPS).',
                  [
                    {
                      text: 'Open settings',
                      onPress: () =>
                        Linking.sendIntent(
                          'android.settings.LOCATION_SOURCE_SETTINGS',
                        ),
                    },
                  ],
                  {cancelable: false},
                );
                //
              } else if (error.code === 1) {
                Alert.alert(
                  'Permission Denied',
                  'Please enable location permission in settings.',
                  [
                    {
                      text: 'Open settings',
                      onPress: () => Linking.openSettings(),
                    },
                  ],
                  {cancelable: false},
                );
              } else {
                Alert.alert('Error', error.message);
              }
            },
            {
              maximumAge: 0,
              timeout: 20000,
            },
          )
        }>
        <Text style={{fontSize: 20}}>get location</Text>
      </TouchableOpacity>
      <View style={{paddingVertical: 20}}>
        <Text style={{color: 'white', fontSize: 15}}>
          Longitude : {info.coords.longitude}
        </Text>
        <Text style={{color: 'white', fontSize: 15}}>
          Lattitude : {info.coords.latitude}
        </Text>
      </View>

      <TouchableOpacity
        style={{backgroundColor: 'lightblue', padding: 10, borderRadius: 5}}
        onPress={() =>
          setinfo({
            coords: {
              longitude: 0,
              latitude: 0,
            },
          })
        }>
        <Text style={{fontSize: 20}}>remove location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Location;
