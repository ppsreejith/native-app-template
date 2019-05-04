import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import _ from 'lodash';

import Marker from './marker';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

const Map = ({journey}) => {
  const region = {
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
    latitude: 12.931093,
    longitude: 77.628987,
  }
  const markers = _.map(journey, ({entity}) => {
    const coordinate = entity.coordinate
    return (
      <Marker key={`${entity.latitude}-${entity.longitude}`} {...entity} />
    );
  })
  return (
    <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region} >
      {markers}
    </MapView>
  )
}

export default Map;
