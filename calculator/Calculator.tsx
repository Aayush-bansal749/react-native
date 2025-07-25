import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Calci = () => {
  const [curr, setcurr] = useState('');
  const [prev, setPrev] = useState([]);
  const [eq, seteq] = useState([]);

  const Preevalualte = expression => {
    for (let i = 0; i < expression.length; i += 1) {
      if (expression[i] == 'π') {
        expression[i] = Number(Math.PI.toFixed(5));
      }
      if (expression[i] == 'e') {
        expression[i] = Number(Math.E.toFixed(5));
      }
      if (expression[i] == '.') {
        expression = [
          ...expression.slice(0, i - 1),
          Number(String(expression[i - 1]) + '.' + String(expression[i + 1])),
          ...expression.slice(i + 2),
        ];
        i -= 1;
      }
      if (expression[i] == '%') {
        expression = [
          ...expression.slice(0, i),
          '/',
          100,
          ...expression.slice(i + 1),
        ];
      }
      // case '%':
      //     total /= 100;
      //     break;
    }
    for (let i = 0; i < expression.length; i += 1) {
      const operator = expression[i];
      const nextNumber = expression[i + 1];
      const prevNumber = expression[i - 1];

      switch (operator) {
        case '^':
          expression = [
            ...expression.slice(0, i - 1),
            Number(Math.pow(prevNumber, nextNumber).toFixed(5)),
            ...expression.slice(i + 2),
          ];
          i -= 1;
          break;

        case '√':
          let result;
          let counter = 1;
          if (nextNumber === '√') {
            while (expression[i + counter] == '√') {
              counter += 1;
            }
            result = expression[i + counter];
            for (let j = 0; j < counter; j += 1) {
              result = Math.sqrt(result);
            }
          } else {
            result = Math.sqrt(nextNumber);
          }
          expression = [
            ...expression.slice(0, i),
            result,
            ...expression.slice(i + counter + 1),
          ];
          i -= 1;
          break;
        default:
          break;
      }
    }

    return expression;
  };

  const evaluate1 = () => {
    seteq([...prev, curr]);
    let expression = [...prev, curr];
    expression = Preevalualte(expression);

    let total = expression[0];
    let temp = [];

    for (let i = 1; i < expression.length; i += 2) {
      const operator = expression[i];
      const nextNumber = expression[i + 1];

      switch (operator) {
        case '+':
          temp.push(total, '+');
          total = nextNumber;
          break;
        case '-':
          temp.push(total, '-');
          total = nextNumber;
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
    if (prev.length > 0) {
      temp.push(total);
      total = evaluate2(temp);
    }
    setPrev([]);
    if (total % 1 == 0) {
      setcurr(total);
    } else {
      setcurr(Number(total).toFixed(5));
    }
  };

  const evaluate2 = expression => {
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
        default:
          break;
      }
    }
    return total;
  };

  const data = [
    {
      title: 'AC',
      onpress: function () {
        setPrev([]);
        setcurr('');
        seteq([]);
      },
    },
    {
      title: '⌫',
      onpress: function () {
        if (curr !== '') {
          const sliced = String(curr).slice(0, -1);
          setcurr(sliced === '' ? '' : Number(sliced));
        } else if (prev.length !== 0) {
          const last = prev[prev.length - 1];
          if (
            last === '√' ||
            last === '+' ||
            last === '-' ||
            last === '*' ||
            last === '/' ||
            last === '^' ||
            last === '%' ||
            last === '.' ||
            last === 'e' ||
            last === 'π' ||
            last === '(' ||
            last === ')'
          ) {
            if (prev.length >= 2 && typeof prev[prev.length - 2] === 'number') {
              setcurr(prev[prev.length - 2]);
              setPrev(prev.slice(0, -2));
            } else {
              setPrev(prev.slice(0, -1));
            }
          } else {
            setcurr(last);
            setPrev(prev.slice(0, -1));
          }
        } else {
          setcurr('');
        }

        seteq([]);
      },
    },

    {
      title: '(',
      onpress: function () {
        if (curr !== '') {
          setPrev([...prev, curr, '*', '(']);
        } else {
          setPrev([...prev, '(']);
        }
        setcurr('');
      },
    },
    {
      title: ')',
      onpress: function () {
        setPrev([...prev, curr, ')']);
        setcurr('');
      },
    },
    {
      title: '+',
      onpress: function () {
        if (curr !== '') {
          setPrev([...prev, curr, '+']);
          setcurr('');
          seteq([]);
        }
      },
    },

    {
      title: '7',
      onpress: function () {
        setcurr(curr * 10 + 7);
        seteq([]);
      },
    },
    {
      title: '8',
      onpress: function () {
        setcurr(curr * 10 + 8);
        seteq([]);
      },
    },
    {
      title: '9',
      onpress: function () {
        setcurr(curr * 10 + 9);
        seteq([]);
      },
    },
    {
      title: 'π',
      onpress: function () {
        if (curr !== '') {
          setPrev([...prev, curr, '*']);
        }
        setcurr('π');

        seteq([]);
      },
    },
    {
      title: '-',
      onpress: function () {
        if (curr !== '') {
          setPrev([...prev, curr, '-']);
          setcurr('');
          seteq([]);
        }
      },
    },
    {
      title: '4',
      onpress: function () {
        setcurr(curr * 10 + 4);
        seteq([]);
      },
    },
    {
      title: '5',
      onpress: function () {
        setcurr(curr * 10 + 5);
        seteq([]);
      },
    },
    {
      title: '6',
      onpress: function () {
        setcurr(curr * 10 + 6);
        seteq([]);
      },
    },
    {
      title: 'e',
      onpress: function () {
        if (curr !== '') {
          setPrev([...prev, curr, '*']);
        }
        setcurr('e');

        seteq([]);
      },
    },
    {
      title: '*',
      onpress: function () {
        if (curr !== '') {
          setPrev([...prev, curr, '*']);
          setcurr('');
          seteq([]);
        }
      },
    },
    {
      title: '1',
      onpress: function () {
        setcurr(curr * 10 + 1);
        seteq([]);
      },
    },
    {
      title: '2',
      onpress: function () {
        setcurr(curr * 10 + 2);
        seteq([]);
      },
    },
    {
      title: '3',
      onpress: function () {
        setcurr(curr * 10 + 3);
        seteq([]);
      },
    },
    {
      title: '√',
      onpress: function () {
        setPrev([...prev, '√']);
        setcurr('');
        seteq([]);
      },
    },
    {
      title: '/',
      onpress: function () {
        if (curr !== '') {
          setPrev([...prev, curr, '/']);
          setcurr('');
          seteq([]);
        }
      },
    },
    {
      title: '%',
      onpress: function () {
        setPrev([...prev, curr, '%', '*']);
        setcurr('');
        seteq([]);
      },
    },

    {
      title: '0',
      onpress: function () {
        setcurr(curr * 10 + 0);
        seteq([]);
      },
    },
    {
      title: '.',
      onpress: function () {
        if (prev[prev.length - 1] !== '.') {
          setPrev([...prev, curr, '.']);
          setcurr('');
          seteq([]);
        }
      },
    },
    {
      title: '^',
      onpress: function () {
        if (curr !== '') {
          setPrev([...prev, curr, '^']);
          setcurr('');
          seteq([]);
        }
      },
    },
    {
      title: '=',
      onpress: function () {
        if (curr !== '') {
          evaluate1();
        }
      },
    },
  ];

  const renderButtons = useCallback(
    (item, index) => {
      return (
        <TouchableOpacity
          onPress={item.onpress}
          style={styles.Buttons}
          key={index.toString()}>
          <View>
            <Text style={{color: '#AACACB', fontSize: 21}}> {item.title} </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [data],
  );

  const equation = useCallback(
    (element, index) => {
      return (
        <Text style={{color: '#AACACB', fontSize: 40}} key={index.toString()}>
          {element}
        </Text>
      );
    },
    [prev],
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        {
          <View style={{flexDirection: 'row'}}>
            {eq.map((element, index) => equation(element, index))}
          </View>
        }

        {
          <Text style={styles.texti}>
            {prev.map((element, index) => equation(element, index))}
            {curr}
          </Text>
        }
      </View>

      <View style={styles.press}>
        {data.map((item, index) => renderButtons(item, index))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Buttons: {
    height: 81,
    width: 81,
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
    fontSize: 40,
    textAlign: 'right',
  },
  display: {
    justifyContent: 'space-between',
    flex: 1,
    margin: 50,
  },
});

export default Calci;
