import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from '../components/map';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none',
  };
  
  render() {
    const entity = {
      coordinate: {
        latitude: 12.931093,
        longitude: 77.628987,
      },
      type: "PERSON",
    }
    const route = [{
      latitude: 12.931093,
      longitude: 77.628987,
    }, {
      latitude: 12.991093,
      longitude: 77.828987,
    }]
    const key = 'lol';
    const journey = [{entity, route, key}]
    return (
      <View style={styles.container}>
        <Map journey={journey}/>
      </View>
    )
  }
}

export default MapScreen;
