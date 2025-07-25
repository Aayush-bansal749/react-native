import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';

const Home = () => {
  const navigation: any = useNavigation();
  return (
    <View
      style={{flex: 1, backgroundColor: '#212121', justifyContent: 'center'}}>
      <Button
        title="go to Camera"
        onPress={() => {
          navigation.navigate('camera');
        }}
      />
    </View>
  );
};

export default Home;
