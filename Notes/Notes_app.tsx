import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Notes = () => {
  const [text, setText] = useState([]);
  const [curr, setCurr] = useState('');
  const [editIndex, setIndex] = useState(-1);

  const ref = useRef<TextInput>(null);

  const selected = useMemo(() => {
    return text.some(element => element.isselected);
  }, [text]);

  const icon = index =>
    text[index].isselected
      ? require('./images/active.jpeg')
      : require('./images/inactive.png');

  const addtext = () => {
    if (curr.trim() !== '') {
      if (editIndex !== -1) {
        setText(_texts => {
          return [
            {..._texts[editIndex], value: curr},
            ..._texts.slice(0, editIndex),
            ..._texts.slice(editIndex + 1),
          ];
        });
        setIndex(-1);
      } else {
        setText(_texts => {
          return [{value: curr, isselected: false}, ..._texts];
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

  const displaytexts = useCallback(
    (element, index) => {
      return (
        <View style={styles.textbox} key={index.toString()}>
          <Text style={styles.text}>{element.value}</Text>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => {
              setIndex(index);
              setCurr(text[index].value);
              ref.current?.focus();
            }}>
            <Text>edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              deleteText(index);
            }}>
            <Text>del</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            hitSlop={{left: 10, right: 10, top: 5, bottom: 5}}
            onPress={() => {
              text[index].isselected = !element.isselected;
              setText([...text]);
            }}>
            <Image style={{height: 22, width: 30}} source={icon(index)} />
          </TouchableOpacity>
        </View>
      );
    },
    [text],
  );

  return (
    <View style={styles.container}>
      {selected && (
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            width: 50,
            alignSelf: 'flex-end',
            marginRight: 15,
          }}
          onPress={() => {
            setText(_text => _text.filter(note => !note.isselected));
          }}>
          <Text>del all</Text>
        </TouchableOpacity>
      )}

      <ScrollView
        style={styles.display}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        {text.map((element, index) => displaytexts(element, index))}
      </ScrollView>

      <View style={styles.inputbox}>
        <TextInput
          ref={ref}
          multiline
          style={styles.input}
          onChangeText={setCurr}
          value={curr}
          autoFocus
        />
        <TouchableOpacity style={styles.add} onPress={addtext}>
          <Text style={{color: 'white'}}>+</Text>
        </TouchableOpacity>
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

export default Notes;
