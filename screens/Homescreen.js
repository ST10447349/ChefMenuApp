import { useRouter } from 'expo-router';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { getAveragesByCourse } from '../utils/menuHelpers';
export default function HomeScreen ({ menuItems = [] , setMenuItems}) {
  const router = useRouter();
  const averages = getAveragesByCourse(menuItems);
  const courseKeys = Object.keys(averages);
  const removeMenuItem = (id) => { setMenuItems(menuItems.filter(item => item.id !== id)) };

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Chef Menu Manager
      </Text>

      <Text style={styles.totalText}>
        Total Menu Items: {menuItems.length}
      </Text>
      const courseKeys = Object.keys(averages);

<View style={{ marginBottom: 20, padding: 15, backgroundColor: '#e8f4f8', borderRadius: 10 }}>
  <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
    Average Price by Course
  </Text>

  {courseKeys.length === 0 ? (
    <Text>No items yet</Text>
  ) : (
    courseKeys.map(course => (
      <Text key={course} style={{ fontSize: 16, marginBottom: 5 }}>
        {course}: R{averages[course].toFixed(2)}
      </Text>
    ))
  )}
</View>


      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.course}
            </Text>

            <Text style={styles.itemText}>
              {item.dishName}
            </Text>

            <Text style={styles.itemText}>
              {item.description}
            </Text>

            <Text style={styles.itemText}>
              R{item.price}
            </Text>
            <TouchableOpacity onPress={() => removeMenuItem(item.id)}>
              <Text style={{color: 'red', fontWeight: 'bold', marginTop: 5}}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button
        title="Add Menu Item"
        onPress={() => router.push('/modal')}
      />
      <TouchableOpacity
  style={styles.filterBtn}
  onPress={() => {
    const dataToSend = JSON.stringify(menuItems);

    router.push({
      pathname: '/FilterScreen',
      params: { items: dataToSend }
    });
  }}
>
  <Text style={styles.filterText}>
    View as Guest (Filter Menu)
  </Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterBtn: { 
  padding: 15, 
  backgroundColor: '#FF9800', 
  borderRadius: 8, 
  marginTop: 20 
},
filterText: { 
  color: '#fff', 
  textAlign: 'center', 
  fontWeight: 'bold' 
},

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  totalText: {
    fontSize: 18,
    marginBottom: 20
  },

  itemContainer: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  itemText: {
    fontSize: 16,
    marginBottom: 5
  },
});
