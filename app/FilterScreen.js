import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function FilterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const menuItems = params.items? JSON.parse(params.items) : [];
  const [currentFilter, setCurrentFilter] = useState('All');
  const [displayItems, setDisplayItems] = useState(menuItems);

  const courseOptions = ['All', 'Starter', 'Main', 'Dessert'];

  useEffect(() => {
    setDisplayItems(menuItems);
  }, [menuItems]);

  const handleFilterChange = (course) => {
    setCurrentFilter(course);

    if (course === 'All') {
      setDisplayItems(menuItems);
      return;
    }

    const filtered = [];
    let index = 0;

    while (index < menuItems.length) {
      const item = menuItems[index];

      if (item.course === course) {
        filtered.push(item);
      }

      index++;
    }

    setDisplayItems(filtered);
  };

  const renderMenuItem = ({ item }) => {
    return (
      <View style={styles.itemCard}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.details}>
          {item.course} - R{Number(item.price).toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      <View style={styles.buttonRow}>
        {courseOptions.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleFilterChange(option)}
            style={[
              styles.filterButton,
              currentFilter === option && styles.activeButton
            ]}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.countText}>
        Showing {displayItems.length} item(s)
      </Text>

      <FlatList
        data={displayItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMenuItem}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>Back to Chef Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    flexWrap: 'wrap'
  },
  btn: {
    padding: 10,
    backgroundColor: '#FF9800',
    borderRadius: 8,
    margin: 5,
    minWidth: 80
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  itemCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  dishName: {
    fontSize: 18,
    fontWeight: '600'
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  }
});