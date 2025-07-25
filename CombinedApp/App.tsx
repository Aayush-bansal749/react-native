import {
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Notes from './Notes';
import Calci from './Calci';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {NotesStore, Persistor} from './redux/store/NotesStore';
import List from './List';
import {PersistGate} from 'redux-persist/integration/react';
import {Image} from 'react-native';
import Camm from './Camera';
import BootSplash from 'react-native-bootsplash';
import Home from './Home';
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import Location from './getLocation';
import DropDown from './DropDown';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const UpperTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

async function onMessageReceived(message) {
  console.log('FCM Message Data:', message.data);
  await notifee.displayNotification({
    title: message.notification?.title,
    body: message.notification?.body,
    android: {
      channelId: 'default',
      pressAction: {
        id: 'default',
      },
    },
  });
}


const Uppercomponents = () => {
  return (
    <UpperTab.Navigator>
      <UpperTab.Screen name={'Calci'} component={Calci} />
      <UpperTab.Screen name={'Notes'} component={Notes} />
    </UpperTab.Navigator>
  );
};
const Bottomcomponents = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#272727',
          margin: 15,
          borderRadius: 30,
          height: 62,
        },
      }}>
      <Tab.Screen
        name={'Drawer'}
        component={Drawercomponent}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('./images/active.jpeg')
                  : require('./images/inactive.png')
              }
              style={{
                width: 28,
                height: 28,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Tools'}
        component={Uppercomponents}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('./images/active.jpeg')
                  : require('./images/inactive.png')
              }
              style={{
                width: 28,
                height: 28,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Drawercomponent = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          borderTopEndRadius: 0,
          borderBottomEndRadius: 0,
        },
      }}>
      <Drawer.Screen
        name={'HomeScreen'}
        component={Home}
        options={{title: 'MENU'}}
      />
      <Drawer.Screen name={'List'} component={List} />
      <Drawer.Screen name={'Location'} component={Location} />
      <Drawer.Screen name={'DropDown'} component={DropDown} />
    </Drawer.Navigator>
  );
};

const App = () => {
  const navigationRef = useNavigationContainerRef();
  useEffect(() => {
    const hideSplashScreen = async () => {
      await BootSplash.hide({fade: true});
    };
    hideSplashScreen();
    const init = async () => {
      await notifee.requestPermission();
    };
    const unsubscribe = messaging().onMessage(onMessageReceived);
   
    init();
    return () => {
      unsubscribe();
    
    };
  }, []);
  return (
    <Provider store={NotesStore}>
      <PersistGate loading={null} persistor={Persistor}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Bottom tab">
            <Stack.Screen
              name={'Bottom tab'}
              component={Bottomcomponents}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={'camera'}
              component={Camm}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
