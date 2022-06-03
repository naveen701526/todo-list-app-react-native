import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import uuid from 'react-native-uuid';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      setIds(keys);
      values = await AsyncStorage.multiGet(keys);
      console.log(values);
      let result = [];
      result = values.map((value) => JSON.parse(value[1]));
      console.log(result);
      setTodos(result);
    } catch (e) {
      // read key error
      console.log(e);
    }
  };

  const pressHandler = async (key) => {
    try{
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.key != key);
      });
      await AsyncStorage.removeItem(key)
      
    }
    catch(error) {
      console.log(error)
    }
    
  };

  const submitHandler = async (text) => {
    if (text.length > 3) {
      try {
        const value = { key: `${uuid.v1()}`, text };
        setTodos([...todos, value]);
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(value.key, jsonValue);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('OOPS!', 'Todos Must BE Over 3 chars long', [
        { text: 'Understood', onPress: () => console.log('alert closed') },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        {/* header */}
        <Header />
        <View style={styles.content}>
          {/* to form */}
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#333',
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
