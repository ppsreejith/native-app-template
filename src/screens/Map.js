import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
 container: {
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
});

class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>lol</Text>
      </View>
    )
  }
}

export default Map;
