import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function CarDisplay(props) {
  return (
    <View>
      <ScrollView>
        {props.filtered.map((filter) => (
          <View style={styles.carFilter} key={filter.id}>
            <View style={styles.position}>
              <Text style={styles.text}>
                {`${filter.first_name} ${filter.last_name}`}
              </Text>
              <Text style={{color: '#B90917'}}>{filter.job_title}</Text>
            </View>
            <Text>Gender: {filter.gender}</Text>
            <Text>Email: {filter.email}</Text>
            <Text>
              Vehicle:{' '}
              {`${filter.car_model} ${filter.car_model_year} ${filter.car_color}`}
            </Text>
            <Text>Country: {filter.country}</Text>
            <Text>Bio: {filter.bio}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  carFilter: {
    padding: 10,
    margin: 10,
    width: 350,
    height: 270,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text: {
    fontWeight: 'bold',
  },
  position: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
