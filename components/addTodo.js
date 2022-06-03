import { StyleSheet, TextInput, View, Button } from 'react-native';
import { useState } from 'react';
import TodoItem from './todoItem';

export default function AddTodo({ submitHandler }) {
  const [text, setText] = useState('');
  const changeHandler = (value) => {
    setText(value);
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder='new Todo...'
        onChangeText={changeHandler}
        placeholderTextColor="#FFF"
      />
      <Button
        onPress={() => submitHandler(text)}
        title='add todo'
        color='blue'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: 'white',
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
