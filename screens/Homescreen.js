import { useRouter } from 'expo-router';

import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
export default function HomeScreen ({ menuItems = []}) {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Chef Menu Manager
      </Text>

      <Text style={styles.totalText}>
        Total Menu Items: {menuItems.length}
      </Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
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
          </View>
        )}
      />

      <Button
        title="Add Menu Item"
        onPress={() => router.push('/modal')}
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
  }
});
