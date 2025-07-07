import React, {useState, useEffect, useMemo} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
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
import Config from 'react-native-config';

const RootStack = createStackNavigator();

const HomeScreen = () => {
  const [countries, setcountries] = useState([]);
  const [statelist, setStatelist] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [Country, setCountry] = useState('Select');
  const [State, setState] = useState(['Select']);
  const [City, setCity] = useState(['Select']);
  const navigation: any = useNavigation();

  useEffect(() => {
    console.log(Config.MY_SECRET);
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
        setState(['Select']);
        setCity(['Select']);
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
        let flag = true;
        if (State[0] === 'Select') setState([item]);
        else if (State.includes(item)) {
          State.splice(State.indexOf(item), 1);
          flag = false;
          if (State.length === 0) setState(['Select']);
        } else setState(prev => [...prev, item]);

        setCity(['Select']);
        setCitylist([]);
        if (State[0] !== 'Select') {
          State.map(states => {
            axios
              .post(
                'https://countriesnow.space/api/v0.1/countries/state/cities',
                {
                  country: Country,
                  state: states,
                },
              )
              .then(response => {
                setCitylist(prev => [...prev, ...response.data.data]);
              })
              .catch(console.error);
          });
        }
        if (flag) {
          axios
            .post(
              'https://countriesnow.space/api/v0.1/countries/state/cities',
              {
                country: Country,
                state: item,
              },
            )
            .then(response => {
              setCitylist(prev => [...prev, ...response.data.data]);
            })
            .catch(console.error);
        }
      },
      isdisable: Country === 'Select' ? true : false,
    },
    {
      Label: 'City',
      data: citylist,
      value: City,
      set: item => {
        if (City[0] === 'Select') setCity([item]);
        else if (City.includes(item)) {
          City.splice(City.indexOf(item), 1);
          if (City.length === 0) setCity(['Select']);
        } else setCity(prev => [...prev, item]);
        setState(State);
      },
      isdisable: State[0] === 'Select' ? true : false,
    },
  ];

  const DropDown = (Label, data, value, set, isdisable) => {
    return (
      <View key={Label}>
        <Text style={{fontSize: 20, paddingLeft: 20, paddingTop: 30}}>
          {Label}
        </Text>
        <Pressable
          onPress={() => {
            !isdisable &&
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
              {typeof value === 'string'
                ? value
                : value.map(item => [...item, ' '])}
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
        backgroundColor: 'white',
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
          }}>
          {item}
        </Text>
        {value.includes(item) && (
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

          alignSelf: 'center',
          borderRadius: 30,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 30, padding: 10, paddingTop: 20}}>
            {Label}
          </Text>
          <TouchableOpacity
            style={{padding: 10, paddingTop: 20, paddingRight: 15}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{fontSize: 26, color: '#333333'}}>x</Text>
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

function App() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await BootSplash.hide({fade: true});
    };
    hideSplashScreen();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name="Home" component={HomeScreen} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{presentation: 'transparentModal'}}>
          <RootStack.Screen
            name="MyModal"
            component={ModalScreen}
            options={{headerShown: false}}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
