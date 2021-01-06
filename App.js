import 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UUIDGenerator from 'react-native-uuid-generator';

import {StyleSheet, Text, View, Pressable, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

function Display(props) {
  return (
    <View>
      {props.filter.map((filter) => (
        <View style={styles.filterCard} key={filter.id}>
          <View styles={styles.filterText}>
            <Pressable
              onPress={() =>
                props.navigation.navigate('Cars', {
                  startYear: filter.start_year,
                  endYear: filter.end_year,
                  gender: filter.gender,
                  countries: filter.countries,
                  colours: filter.colors,
                })
              }>
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
      <ScrollView>
        {props.filtered.map((filter) => (
          <View style={styles.carFilter} key={filter.id}>
            <Text> {`${filter.first_name} ${filter.last_name}`}</Text>
            <Text> {filter.gender}</Text>
            <Text> {filter.job_title}</Text>
            <Text> {filter.email}</Text>
            <Text>
              {`${filter.car_model} ${filter.car_model_year} ${filter.car_color}`}
            </Text>
            <Text> {filter.country}</Text>
            <Text> {filter.country}</Text>
            <Text> {filter.bio}</Text>
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
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filters</Text>
      <Display filter={data} navigation={navigation} />
    </View>
  );
}

function FilterScreen({route, navigation}) {
  const [data, setData] = React.useState([]);
  const [filteredData, setfilteredData] = React.useState([]);
  const {startYear, endYear, gender, countries, colours} = route.params;

  React.useEffect(() => {
    loadAllCSV();
  }, []);

  const logger = () => {
    console.log(data);
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
        setData(
          data.concat(
            results.data
              .filter(
                (x) => countries.length === 0 || countries.includes(x.country),
              )
              .filter(
                (x) =>
                  (!startYear || x.car_model_year >= startYear) &&
                  (!endYear || x.car_model_year <= endYear),
              )
              .filter(
                (x) =>
                  !gender || x.gender.toLowerCase() === gender.toLowerCase(),
              )
              .filter(
                (x) => colours.length === 0 || colours.includes(x.car_color),
              ),
          ),
        );
        console.log(data);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cars</Text>
      <Button
        onPress={logger}
        title="More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Cars filtered={data} />
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
    height: 10,
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
    height: 400,
    backgroundColor: '#ebebeb',
    borderRadius: 10,
  },
});
