import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

class Map extends React.Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none',
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 12.931093,
              longitude: 77.628987,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
        />
      </View>
    )
  }
}

export default Map;
