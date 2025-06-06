import React, {createElement, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [text, setText] = useState<string[]>([]);
  const [curr, setCurr] = useState('');
  const ref = useRef<TextInput>(null);
  const [editIndex, setIndex] = useState(-1);

  const addtext = () => {
    if (curr !== '') {
      if (editIndex !== -1) {
        setIndex(-1);
        setText(_texts => {
          return [
            ..._texts.slice(0, editIndex),
            curr,
            ..._texts.slice(editIndex + 1),
          ];
        });
      } else {
        setText(_texts => {
          return [..._texts, curr];
        });
      }
      setCurr('');
    }
  };

  const deleteText = index => {
    const updationtext = [...text];
    updationtext.splice(index, 1);
    setText(updationtext);
  };

  function displaytexts(element, index) {
    return (
      <View 
      style={styles.textbox} 
      key={index.toString()}>
        <Text 
        style={styles.text}>{element}</Text>
        <Pressable
          style={styles.edit}
          onPress={() => {
            setIndex(index);
            setCurr(text[index]);
            ref.current?.focus();
          }}>
          <Text>edit</Text>
        </Pressable>
        <Pressable style={styles.delete} onPress={() => deleteText(index)}>
          <Text>del</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.display}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        {text.map((element, index) => displaytexts(element, index))}
      </ScrollView>

      <View style={styles.inputbox}>
        <TextInput
          ref={ref}
          style={styles.input}
          onChangeText={setCurr}
          value={curr}
          autoFocus
        />
        <Pressable
        style={styles.add} 
        onPress={addtext}>
          <Text style={{color: 'white'}}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    paddingTop: 35,
  },
  input: {
    flex: 1,
    backgroundColor: '#212121',
    height: 40,
    color: 'white',
  },
  display: {
    margin: 16,
  },
  contentContainerStyle: {
    gap: 10,
  },
  add: {
    width: 40,
    backgroundColor: 'green',
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbox: {
    flexDirection: 'row',
    backgroundColor: '#ADBFB7',
    padding: 5,
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 16,
    width: 250,
  },
  inputbox: {
    flexDirection: 'row',
    padding: 25,
    backgroundColor: 'black',
  },
  delete: {
    width: 30,
    backgroundColor: 'red',
    height: 22,
  },
  edit: {
    width: 30,
    backgroundColor: '#3AA2DD',
    height: 22,
  },
});

export default App;
