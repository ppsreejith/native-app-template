import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import _ from 'lodash'
import moment from 'moment'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
  },
  time: {
    color: 'white'
  }
});

const TimeMarker = ({ coordinate, time }) => (
  <Marker coordinate={coordinate}>
    <View style={styles.container}>
      <Text style={styles.time}>{moment(time).format("hh:mm A")}</Text>
    </View>
  </Marker>
)

export default TimeMarker;
