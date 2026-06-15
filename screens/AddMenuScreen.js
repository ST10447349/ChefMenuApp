import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddMenuScreen({ navigation }) {
  const [dishName, setDishName] = useState('');
  const [courseType, setCourseType] = useState('');
  const [dishPrice, setDishPrice] = useState('');

  const handleSave = async () => {
    if (!dishName || !courseType || !dishPrice) {
      Alert.alert('Missing Info', 'Please fill in all fields before saving');
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem('menu');
      const menuList = existingData ? JSON.parse(existingData) : [];

      const newMenuItem = {
        id: Date.now().toString(),
        name: dishName,
        course: courseType,
        price: Number(dishPrice)
      };

      menuList.push(newMenuItem);

      await AsyncStorage.setItem('menu', JSON.stringify(menuList));

      Alert.alert('Success', 'Menu item saved successfully');
      setDishName('');
      setCourseType('');
      setDishPrice('');

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while saving');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Menu Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />

      <TextInput
        style={styles.input}
        placeholder="Course (Starter, Main, Dessert)"
        value={courseType}
        onChangeText={setCourseType}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={dishPrice}
        keyboardType="numeric"
        onChangeText={setDishPrice}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Item</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
