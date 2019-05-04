import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import _ from 'lodash';

import Marker from './marker';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

const getComparator = (initValue, comparator) => {
  let currentValue = initValue;
  return (value) => {
    if (comparator(value, currentValue)) {
      currentValue = value;
    }
    return currentValue;
  }
};

const getRegion = ({maxLat, minLat, maxLng, minLng}) => {
  return {
    latitude: _.mean([minLat, maxLat]),
    longitude: _.mean([minLng, maxLng]),
    latitudeDelta: _.max([(maxLat - minLat) * 1.1, 0.015]),
    longitudeDelta: _.max([(maxLng - minLng) * 1.1, 0.0121]),
  }
}

const Map = ({journey}) => {
  const getMaxLat = getComparator(Number.NEGATIVE_INFINITY, _.gt);
  const getMaxLng = getComparator(Number.NEGATIVE_INFINITY, _.gt);
  const getMinLat = getComparator(Number.POSITIVE_INFINITY, _.lt);
  const getMinLng = getComparator(Number.POSITIVE_INFINITY, _.lt);
  
  const markers = _.map(journey, ({entity, key}) => {
    return (
      <Marker key={key} {...entity} />
    );
  })
  const routes = _.map(journey, ({route, key}) => (
    <Polyline
        key={key}
        coordinates={route}/>
  ))
  _.each(journey, ({entity, route}) => {
    const getMinMax = (coordinate) => {
      getMaxLat(coordinate.latitude)
      getMinLat(coordinate.latitude)
      getMaxLng(coordinate.longitude)
      getMinLng(coordinate.longitude)
    }
    _.each(route, getMinMax);
    getMinMax(entity.coordinate);
  });

  const coordinateExtremes = {
    maxLat: getMaxLat(),
    minLat: getMinLat(),
    maxLng: getMaxLng(),
    minLng: getMinLng(),
  }
  const region = getRegion(coordinateExtremes);
  return (
    <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region} >
      {markers}
      {routes}
    </MapView>
  )
}

export default Map;
