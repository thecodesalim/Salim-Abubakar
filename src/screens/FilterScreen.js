import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import CarDisplay from '../components/CarDisplay';

export default function FilterScreen({route, navigation}) {
  const [data, setData] = React.useState([]);
  const {startYear, endYear, gender, countries, colours} = route.params;

  React.useEffect(() => {
    loadAllCSV();
  }, []);

  const searchCV = (results) => {
    setData(
      data.concat(
        results.data
          .filter(
            (item) =>
              countries.length === 0 || countries.includes(item.country),
          )
          .filter(
            (item) =>
              (!startYear || item.car_model_year >= startYear) &&
              (!endYear || item.car_model_year <= endYear),
          )
          .filter(
            (item) =>
              !gender || item.gender.toLowerCase() === gender.toLowerCase(),
          )
          .filter(
            (item) => colours.length === 0 || colours.includes(item.car_color),
          ),
      ),
    );
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
        searchCV(results);
      },
      error: () => {
        <Text>Unavailable</Text>;
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cars</Text>
      <CarDisplay filtered={data} />
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
    paddingTop: 80,
    fontWeight: 'bold',
    color: '#FF2F2F',
  },
});
