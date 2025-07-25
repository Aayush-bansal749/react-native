import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BootSplash from 'react-native-bootsplash';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import axios from 'axios';

const RootStack = createStackNavigator();

const HomeScreen = () => {
  const [countries, setcountries] = useState([]);
  const [statelist, setStatelist] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [Country, setCountry] = useState('Select');
  const [State, setState] = useState('Select');
  const [City, setCity] = useState('Select');
  const navigation: any = useNavigation();

  useEffect(() => {
    axios
      .get('https://countriesnow.space/api/v0.1/countries/')
      .then(response => {
        setcountries(response.data.data.map(c => c.country));
      })

      .catch(console.error);
  }, []);

  const types = [
    {
      Label: 'Country',
      data: countries,
      value: Country,

      set: item => {
        setCountry(item);
        setState('Select');
        setCity('Select');
        setStatelist([]);
        setCitylist([]);
        axios
          .post('https://countriesnow.space/api/v0.1/countries/states', {
            country: item,
          })
          .then(response => {
            response.data.data.states.map(state => {
              setStatelist(prev => [...prev, state.name]);
            });
          })
          .catch(console.error);
      },

      isdisable: false,
    },
    {
      Label: 'State',
      data: statelist,
      value: State,
      set: item => {
        setState(item);
        setCity('Select');
        setCitylist([]);

        axios
          .post('https://countriesnow.space/api/v0.1/countries/state/cities', {
            country: Country,
            state: item,
          })
          .then(response => {
            setCitylist(response.data.data);
          })
          .catch(console.error);
      },
      isdisable: Country === 'Select' ? true : false,
    },
    {
      Label: 'City',
      data: citylist,
      value: City,
      set: setCity,
      isdisable: State === 'Select' ? true : false,
    },
  ];

  const DropDown = (Label, data, value, set, isdisable) => {
    return (
      <View key={Label}>
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 20,
            paddingTop: 30,
            color: 'white',
          }}>
          {Label}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('MyModal', {
              Label: Label,
              array: data,
              set: set,
              value: value,
            });
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              width: '90%',
              marginTop: 10,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 5,
                color: isdisable ? 'lightgrey' : 'black',
              }}>
              {value}
            </Text>
            <Text
              style={{
                fontSize: 12,
                bottom: 2,
                color: 'grey',
                marginLeft: 8,
                paddingRight: 10,
              }}>
              ⌄
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#212121',
      }}>
      {types.map(item =>
        DropDown(item.Label, item.data, item.value, item.set, item.isdisable),
      )}
    </View>
  );
};

const ModalScreen = ({route}) => {
  const {Label, array, set, value} = route.params;
  const navigation: any = useNavigation();
  const [text, setText] = useState('');

  const renderModal = item => {
    return (
      <TouchableOpacity
        key={item}
        onPress={() => {
          set(item);
          navigation.goBack();
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: 'lightgrey',
        }}>
        <Text
          style={{
            padding: 10,
            fontSize: 23,
            color: 'white',
          }}>
          {item}
        </Text>
        {item === value && (
          <Text
            style={{
              padding: 10,
              fontSize: 23,
            }}>
            ✔️
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  let Newarray = array;
  Newarray = Newarray.filter(place =>
    place.toLowerCase().includes(text.toLowerCase()),
  );

  return (
    <View>
      <Pressable
        style={{height: '48%', backgroundColor: '#00000043'}}
        onPress={() => navigation.goBack()}
      />

      <View
        style={{
          height: '52%',
          width: '97%',
          backgroundColor: '#212121',
          alignSelf: 'center',
          borderRadius: 30,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{fontSize: 30, padding: 10, paddingTop: 20, color: 'white'}}>
            {Label}
          </Text>
          <TouchableOpacity
            style={{padding: 10, paddingTop: 20, paddingRight: 15}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{fontSize: 26, color: 'white'}}>x</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            style={{
              borderWidth: 1,
              margin: 10,
              padding: 10,
              borderRadius: 10,
              borderColor: 'lightgrey',
              backgroundColor: 'white',
            }}
            placeholder={`Search ${Label}`}
            onChangeText={t => {
              setText(t);
            }}
            value={text}
          />
          {text !== '' && (
            <TouchableOpacity
              style={{bottom: 40, left: 370, marginBottom: -20}}
              onPress={() => {
                setText('');
              }}>
              <Text style={{color: 'grey'}}>x</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView>
          {Newarray.length > 0 ? (
            Newarray.map(item => renderModal(item))
          ) : (
            <Text
              style={{
                paddingTop: 150,
                fontSize: 20,
                color: 'grey',
                textAlign: 'center',
              }}>
              No {Label} Available
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

function DropDown() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await BootSplash.hide({fade: true});
    };
    hideSplashScreen();
  }, []);

  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{presentation: 'transparentModal'}}>
        <RootStack.Screen
          name="MyModal"
          component={ModalScreen}
          options={{headerShown: false}}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default DropDown;
