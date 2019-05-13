import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import _ from 'lodash';

import EntityMarker from './EntityMarker';
import TimeMarker from './TimeMarker';
import AnimatedMap from './AnimatedMap';
// import console = require('console');

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

const Map = ({entities, routes, times, style}) => {
  const getMaxLat = getComparator(Number.NEGATIVE_INFINITY, _.gt);
  const getMaxLng = getComparator(Number.NEGATIVE_INFINITY, _.gt);
  const getMinLat = getComparator(Number.POSITIVE_INFINITY, _.lt);
  const getMinLng = getComparator(Number.POSITIVE_INFINITY, _.lt);
  const getMinMax = (coordinate) => {
    getMaxLat(coordinate.latitude)
    getMinLat(coordinate.latitude)
    getMaxLng(coordinate.longitude)
    getMinLng(coordinate.longitude)
  }
  
  const entityMarkers = _.map(entities, (entity, key) => {
    getMinMax(entity.coordinate);
    return (
      <EntityMarker key={key} {...entity} />
    );
  });
  
  const endMarker = _.map(routes, (route, key) => {
    if(key==routes.length-1){
      const ent = {
        coordinate : route[0][route[0].length-1],
        type: 'DESTINATION'
      };
    
      return(<EntityMarker key={key} {...ent} />);
    }
  });

  const startMarker = _.map(routes, (route, key) => {
    if(key==0){
      const ent = {
        coordinate : route[0][0],
        type: 'HOME'
      };
    
      return(<EntityMarker key={key} {...ent} />);
    }
  });

  const stopMarkers = _.map(routes, (route, key) => {
    if(key!=0){
      const ent = {
        coordinate : route[0][0],
        type: 'STOP'
      };
    
      return(<EntityMarker key={key} {...ent} />);
    }
  });




  const routeMarkers = _.map(routes, (route, key) => {
    _.each(route[0], getMinMax);
    console.log('route',route);
    let color='';
    let dashpattern = null;
    let strokeWidth = 3;
    if(route[1]=='AUTO'){
      color = '#2980b9';
      dashpattern = null;

    }
    else if(route[1]=='BUS'){
      color = '#8e44ad';
      dashpattern = null;
    }
    else if(route[1]=='PERSON'){
      color = '#d35400';
      strokeWidth=3;
      dashpattern = [5,5];
    }
    return (
      <Polyline
          key={key}
          coordinates={route[0]}
          strokeColor={color}
          strokeWidth	={strokeWidth}
          lineDashPattern={dashpattern}/>
    )
  });
  const timeMarkers = _.map(times, (time, key) => {
    getMinMax(time.coordinate);
    return (
      <TimeMarker key={key} {...time} />
    )
  });

  const coordinateExtremes = {
    maxLat: getMaxLat(),
    minLat: getMinLat(),
    maxLng: getMaxLng(),
    minLng: getMinLng(),
  };
  
  const region = getRegion(coordinateExtremes);
  return (
    <AnimatedMap
        style={[styles.map, style]}
        region={region} >
      {entityMarkers}
      {routeMarkers}
      {/* {timeMarkers} */}
      {stopMarkers}
      {endMarker}
      {startMarker}

    </AnimatedMap>
  )
}

export default Map;
