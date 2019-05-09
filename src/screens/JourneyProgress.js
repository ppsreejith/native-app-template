import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import JourneyMap from '../components/JourneyMap';
import { JourneyProgressCardTop } from '../components/JourneyProgressCardTop';
import { JourneyProgressCardBottom } from '../components/JourneyProgressCardBottom';
import { SettingsView } from '../components/SettingsView';
import { CURRRENT_JOURNEY, CURRRENT_LEG } from '../static/journeys';
import { Icon, Overlay, Button } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    // height:700
  },
  filter: {
    position: 'absolute',
    top: 20,
    right: 20
  }
});

class JourneyProgressScreen extends React.Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      journey: [
        {
          entity: {
            coordinate: {
              latitude: 12.931093,
              longitude: 77.628987,
            },
            type: "PERSON",
          },
          route: [{
            latitude: 12.931093,
            longitude: 77.628987,
          }, {
            latitude: 12.991093,
            longitude: 77.828987,
          }],
          time: {
            coordinate: {
              latitude: 12.991093,
              longitude: 77.828987,
            },
            time: new Date()
          }
        }
      ]
    };
  }

  render() {

    return (
      <View style={styles.container}>
        <JourneyMap journey={this.state.journey} />
        <JourneyProgressCardTop journey={CURRRENT_JOURNEY} currentLeg = {CURRRENT_LEG}/>
        <JourneyProgressCardBottom currentLeg = {CURRRENT_LEG}/>
      </View>
    )
  }
}

export default JourneyProgressScreen;
