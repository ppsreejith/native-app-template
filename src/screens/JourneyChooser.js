import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import JourneyMap from '../components/JourneyMap';
import { JourneyCard } from '../components/JourneyCard';
import { SettingsView } from '../components/SettingsView';
import { JOURNEYS } from '../static/journeys';
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

class JourneyChooserScreen extends React.Component {
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
        <JourneyCard journeys={JOURNEYS}></JourneyCard>
        <View style={styles.filter}>

          <Button
            icon={
              <Icon
                name="cog"
                size={30}
                type='font-awesome'
                color="white"
              />
            }
            onPress={() => {
              this.setState({ isVisible: true });
            }}
            title=""
            buttonStyle={{ borderRadius: 50, padding: 9, paddingRight: 10, paddingLeft: 10, backgroundColor: '#333' }}
          />
        </View>
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <SettingsView></SettingsView>
        </Overlay>
      </View>
    )
  }
}

export default JourneyChooserScreen;