import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {StyleSheet, Text, View, Pressable, Button} from 'react-native';

function Display(props) {
  const pressed = () => {
    console.log('pressed');
  };
  return (
    <View>
      <Text style={styles.header}>Filters</Text>
      {props.filter.map((filter) => (
        <View style={styles.filterCard} key={filter.id}>
          <View styles={styles.filterText}>
            <Pressable onPress={pressed}>
              <Text> Start year: {filter.start_year}</Text>
              <Text> End year: {filter.end_year}</Text>
              <Text> Gender:{filter.gender}</Text>
              <Text> Countries:{filter.countries}</Text>
              <Text> Colors:{filter.colors}</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}
function Data(props) {
  const [data, setData] = React.useState([]);

  return (
    <View>
      <Button
        onPress={props.onPress}
        title="More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

export default function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/b4cdeed3-327b-4591-9b06-aaf043e65497',
    );
    const filters = await response.json();
    setData(data.concat(filters));
    //console.log(filters[0].countries)
  };

  const loadAllCSV = () => {
    var mainBundlePath = RNFS.MainBundlePath;
    console.log('Loading CSV');
    var path = '/csv.bundle/cardata.csv';
    //const fileContents = RNFS.read(path);
    Papa.parse(mainBundlePath + path, {
      download: true,
      header: true,
      complete: (results) => {
        const array = [
          'Brazil',
          'Ireland',
          'Egypt',
          'Poland',
          'Niger',
          'Greece',
          'Peru',
        ];
        console.log(
          results.data
            .filter((x) => array.includes(x.country))
            .filter((x) => x.car_model_year > 1991 && x.car_model_year < 2009)
            .filter((x) => x.gender.toLowerCase() === 'male'.toLowerCase())
            .filter((x) =>
              ['Green', 'Violet', 'Yellow', 'Blue'].includes(x.car_color),
            ),
        );
      },
    });
  };

  return (
    <View style={styles.container}>
      <Data onPress={loadAllCSV} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'orangered',
  },
  filterCard: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    width: 380,
    height: 110,
    backgroundColor: '#d9d5d4',
    borderRadius: 10,
  },
  filterText: {
    paddingTop: 100,
  },
});
