import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import JourneyMap from '../components/JourneyMap';
import { JourneyCard } from '../components/JourneyCard';
import { JourneyProgressCardTop } from '../components/JourneyProgressCardTop';
import { JourneyProgressCardBottom } from '../components/JourneyProgressCardBottom';
import { JourneyCompleteCard } from '../components/JourneyCompleteCard';
import { SettingsView } from '../components/SettingsView';
import { JOURNEYS, CURRRENT_JOURNEY } from '../static/journeys';
import { Icon, Overlay, Button } from 'react-native-elements'
// import console = require('console');
// import console = require('console');

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

class JourneyMaster extends React.Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    /* this.props.dispatch({
     *   type: JOURNEY_UPDATE_LEG,
     *   payload: {
     *     leg: 3
     *   }
     * })*/
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const currentJourney = this.props.appState.get('currentJourney');
    const currentJourneyBrowse = this.props.appState.get('currentJourneyBrowse');
    const currentLeg = this.props.appState.get('currentLeg');
    const activeScreen = this.props.appState.get('activeScreen');
  
    const journeys = this.props.journey.get('journeys').toJS();
    var componentToRender = '';
    // if (journeys) {
    //   // console.log('This is being rendered');
    //   if (currentJourney!=null) {
    //     if (currentLeg!=null) {
    //       componentToRender = (<View style={styles.container}>
    //         <JourneyProgressCardTop/>
    //         <JourneyProgressCardBottom/>
    //       </View>);
    //     }
    //     else{
    //       componentToRender = (<View style={styles.container}>
    //         <JourneyCompleteCard/>
    //       </View>);
    //     }
    //   }
    //   else {
    //     componentToRender = (<View style={styles.container}>
    //       <JourneyCard></JourneyCard>
    //       <View style={styles.filter}>

    //         <Button
    //           icon={
    //             <Icon
    //               name="cog"
    //               size={30}
    //               type='font-awesome'
    //               color="white"
    //             />
    //           }
    //           onPress={() => {
    //             this.setState({ isVisible: true });
    //           }}
    //           title=""
    //           buttonStyle={{ borderRadius: 50, padding: 9, paddingRight: 10, paddingLeft: 10, backgroundColor: '#333' }}
    //         />
    //       </View>
    //       <Overlay
    //         isVisible={this.state.isVisible}
    //         onBackdropPress={() => this.setState({ isVisible: false })}
    //       >
    //         <SettingsView></SettingsView>
    //       </Overlay>
    //     </View>);
    //   }
    // }

    if (activeScreen=='JOURNEY_CHOOSE') {
      componentToRender = (<View style={styles.container}>
        <JourneyCard></JourneyCard>
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
      </View>);
    }
    else if (activeScreen=='JOURNEY_PROGRESS') {
      componentToRender = (<View style={styles.container}>
          <JourneyProgressCardTop/>
          <JourneyProgressCardBottom/>
        </View>);
    }
    else if (activeScreen=='JOURNEY_END') {
      componentToRender = (<View style={styles.container}>
        <JourneyCompleteCard/>
      </View>);
    }

    return (
      <View style={styles.container}>
        {/* <JourneyMap journey={this.state.journey} /> */}
        <JourneyMap journey={journeys[currentJourneyBrowse].journey} />
        {componentToRender}
      </View>
    )
  }
}

export default connect(({ journey, appState }) => ({ journey, appState }))(JourneyMaster);
