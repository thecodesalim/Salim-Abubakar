import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Button} from 'react-native';

export default function FilterDisplay(props) {
  return (
    <View>
      {props.filter.map((filter) => (
        <TouchableHighlight
          key={filter.id}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() =>
            props.navigation.navigate('Cars', {
              startYear: filter.start_year,
              endYear: filter.end_year,
              gender: filter.gender,
              countries: filter.countries,
              colours: filter.colors,
            })
          }>
          <View style={styles.filterCard} key={filter.id}>
            <Text> Start year: {filter.start_year}</Text>
            <Text> End year: {filter.end_year}</Text>
            <Text> Gender: {filter.gender}</Text>
            <Text> Countries: {filter.countries.join(', ')}</Text>
            <Text> Colors: {filter.colors.join(', ')}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filterCard: {
    margin: 10,
    width: 350,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
