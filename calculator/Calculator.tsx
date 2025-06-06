import React, {createElement, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const [curr, setcurr] = useState(0);
  const [prev, setPrev] = useState([]);

  const evaluate = () => {
    let expression = [...prev, curr];
    let total = expression[0];

    for (let i = 1; i < expression.length; i += 2) {
      const operator = expression[i];
      const nextNumber = expression[i + 1];

      switch (operator) {
        case '+':
          total += nextNumber;
          break;
        case '-':
          total -= nextNumber;
          break;
        case '*':
          total *= nextNumber;
          break;
        case '/':
          total /= nextNumber;
          break;
        default:
          break;
      }
    }

    setPrev([]);
    setcurr(total);
  };

  const data = [
    {
      title: '7',
      onpress: function () {
        setcurr(curr * 10 + 7);
      },
    },
    {
      title: '8',
      onpress: function () {
        setcurr(curr * 10 + 8);
      },
    },
    {
      title: '9',
      onpress: function () {
        setcurr(curr * 10 + 9);
      },
    },
    {
      title: '+',
      onpress: function () {
        setPrev([...prev, curr, '+']);
        setcurr(0);
      },
    },
    {
      title: '4',
      onpress: function () {
        setcurr(curr * 10 + 4);
      },
    },
    {
      title: '5',
      onpress: function () {
        setcurr(curr * 10 + 5);
      },
    },
    {
      title: '6',
      onpress: function () {
        setcurr(curr * 10 + 6);
      },
    },
    {
      title: '-',
      onpress: function () {
        setPrev([...prev, curr, '-']);
        setcurr(0);
      },
    },
    {
      title: '1',
      onpress: function () {
        setcurr(curr * 10 + 1);
      },
    },
    {
      title: '2',
      onpress: function () {
        setcurr(curr * 10 + 2);
      },
    },
    {
      title: '3',
      onpress: function () {
        setcurr(curr * 10 + 3);
      },
    },
    {
      title: '*',
      onpress: function () {
        setPrev([...prev, curr, '*']);
        setcurr(0);
      },
    },
    {
      title: 'C',
      onpress: function () {
        setPrev([]);
        setcurr(0);
      },
    },
    {
      title: '0',
      onpress: function () {
        setcurr(curr * 10 + 0);
      },
    },
    {
      title: '=',
      onpress: function () {
        evaluate();
      },
    },
    {
      title: '/',
      onpress: function () {
        setPrev([...prev, curr, '/']);
        setcurr(0);
      },
    },
  ];

  function renderButtons(item, index) {
    return (
      <Pressable
        onPress={item.onpress}
        style={styles.Buttons}
        key={index.toString()}>
        <View>
          <Text style={{color: '#AACACB'}}> {item.title} </Text>
        </View>
      </Pressable>
    );
  }

  function equation(element, index) {
    return (
      <Text style={{color: '#AACACB', fontSize: 30}} key={index.toString()}>
        {element}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <View style={{flexDirection: 'row'}}>
          {prev.map((element, index) => equation(element, index))}
        </View>

        {<Text style={styles.texti}>{curr}</Text>}
      </View>

      <View style={styles.press}>
        {data.map((item, index) => renderButtons(item, index))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Buttons: {
    height: 100,
    width: 100,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
    
  },
  press: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#333333',
    justifyContent: 'space-between',
  },
  texti: {
    color: '#AACACB',
     fontSize: 60,
     textAlign: 'right',
  },
  display: {
    justifyContent: 'space-between',
    flex: 1,
    margin: 50,
  },
});

export default App;
