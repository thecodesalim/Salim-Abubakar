import 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {StyleSheet, Text, View, Pressable, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

function Display(props) {
  return (
    <View>
      <Text style={styles.header}>Filters</Text>
      {props.filter.map((filter) => (
        <View style={styles.filterCard} key={filter.id}>
          <View styles={styles.filterText}>
            <Pressable onPress={props.onPress}>
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

function Cars(props) {
  return (
    <View>
      <Text>Cars</Text>
      <Button
        onPress={props.onPress}
        title="More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <ScrollView>
        {props.filtered.map((filter) => (
          <View style={styles.carFilter} key={filter.id}>
            <Text> {`${filter.first_name} ${filter.last_name}`}</Text>
            <Text> {filter.job_title}</Text>
            <Text> {filter.email}</Text>
            <Text> {filter.country}</Text>
            <Text>
              {`${filter.car_model} ${filter.car_model_year} ${filter.car_color}`}
            </Text>
            <Text> {filter.country}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function HomeScreen({navigation}) {
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
  return (
    <View style={styles.container}>
      <Display filter={data} onPress={() => navigation.navigate('Cars')} />
    </View>
  );
}

function FilterScreen() {
  const [data, setData] = React.useState([]);

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
        setData(
          data.concat(
            results.data
              .filter((x) => array.includes(x.country))
              .filter((x) => x.car_model_year > 1991 && x.car_model_year < 2009)
              .filter((x) => x.gender.toLowerCase() === 'male'.toLowerCase())
              .filter((x) =>
                ['Green', 'Violet', 'Yellow', 'Blue'].includes(x.car_color),
              ),
          ),
        );
        console.log(data);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Cars filtered={data} onPress={loadAllCSV} />
    </View>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Filters" component={HomeScreen} />
        <Stack.Screen name="Cars" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    width: 350,
    height: 110,
    backgroundColor: '#ebebeb',
    borderRadius: 10,
  },
  filterText: {
    paddingTop: 100,
  },
  carFilter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 350,
    height: 150,
    backgroundColor: '#ebebeb',
    borderRadius: 10,
  },
});
