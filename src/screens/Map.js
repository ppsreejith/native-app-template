import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
 container: {
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
  map: {
    height: 400,
    width: 400,
  }
});

class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
        />
        <Text>Maps API Key {Config.GOOGLE_MAPS_API_KEY}</Text>
      </View>
    )
  }
}

export default Map;
