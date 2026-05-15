import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const router = useRouter();
export default function AddMenuScreen ({
  menuItems = [],
  setMenuItems }) {


  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');

  const addMenuItem = () => {

    if (
      dishName === '' ||
      description === '' ||
      price === ''
    ) {
      Alert.alert('Please complete all fields');
      return;
    }

    const newItem = {
      dishName,
      description,
      course,
      price
    };

    setMenuItems([...menuItems, newItem]);

    setDishName('');
    setDescription('');
    setPrice('');

    Alert.alert('Menu item added successfully');

    router.back();
  };

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Add Menu Item
      </Text>

      <TextInput
        placeholder="Dish Name"
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="Course (Starter/Main/Dessert)"
        style={styles.input}
        value={course}
        onChangeText={setCourse}
      />

      <TextInput
        placeholder="Price"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Button
        title="Add Item"
        onPress={addMenuItem}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16
  }
});
