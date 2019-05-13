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
import { fetchJourneys } from '../actions/Journey';
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
    /* fetchJourneys({
     *   fromLat: 23.011295,
     *   fromLng: 72.506192,
     *   toLat: 23.027547,
     *   toLng: 72.598136
     * });*/
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
    console.log("Journey is", journeys[currentJourneyBrowse].journey)
    var toShowOnMap = '';
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
      toShowOnMap = journeys[currentJourneyBrowse].journey;
    }
    else if (activeScreen=='JOURNEY_PROGRESS') {
      componentToRender = (<View style={styles.container}>
          <JourneyProgressCardTop/>
          <JourneyProgressCardBottom/>
        </View>);
        toShowOnMap = [journeys[currentJourney].journey[currentLeg]];
        // toShowOnMap = journeys[currentJourneyBrowse].journey;
        // console.log('PROGRESS',[{journey:[journeys[currentJourney].journey[currentLeg]]}]);
    }
    else if (activeScreen=='JOURNEY_END') {
      componentToRender = (<View style={styles.container}>
        <JourneyCompleteCard/>
      </View>);
      // toShowOnMap = journeys[currentJourneyBrowse].journey;
      toShowOnMap = journeys[currentJourney].journey;
    } 
    return (
      <View style={styles.container}>
        {/* <JourneyMap journey={this.state.journey} /> */}
        <JourneyMap journey={toShowOnMap} />
        {componentToRender}
      </View>
    )
  }
}

export default connect(({ journey, appState }) => ({ journey, appState }))(JourneyMaster);