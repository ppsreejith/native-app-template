import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedMarker from './AnimatedMarker';
import _ from 'lodash'

const markerSize = 13;

const styles = StyleSheet.create({
  myLocation: {
    width: markerSize,
    height: markerSize,
    backgroundColor: '#66ccff',
    borderRadius: markerSize,
    borderWidth: 1,
    borderColor: 'black',
  }
});

const MARKER_TYPES = {
  PERSON: () =>  <View style={styles.myLocation}></View>
}

const CustomMarker = ({ coordinate, type }) => {
  if (!_.has(MARKER_TYPES, type)) {
    return null;
  }
  const TypedMarker = MARKER_TYPES[type];
  return (
    <AnimatedMarker coordinate={coordinate}>
      <TypedMarker />
    </AnimatedMarker>
  )
}

export default CustomMarker;
