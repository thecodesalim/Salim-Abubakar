import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FilterDisplay from '../components/FilterDisplay';

export default function HomeScreen({navigation}) {
  const [filters, setFilter] = React.useState([]);

  React.useEffect(() => {
    loadData().catch();
  }, []);

  const loadData = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/b4cdeed3-327b-4591-9b06-aaf043e65497',
    );
    const results = await response.json();
    setFilter(filters.concat(results));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filters</Text>
      <FilterDisplay filter={filters} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#5277BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF2F2F',
  },
});
