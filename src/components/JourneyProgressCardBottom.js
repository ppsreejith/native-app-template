import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import _ from 'lodash';
import Carousel from 'react-native-snap-carousel';
// import { JOURNEYS } from '../static/journeys';
import { Icon, Button } from 'react-native-elements';
import {connect} from 'react-redux';

const styles = {
  container: {
    // flex: 1,
    backgroundColor: 'transparent',
    bottom: 5,
    position: 'absolute',
    flexGrow: 0
  },
  slides: {
    // flex: 1,
    backgroundColor: 'transparent',
  },
  slide: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    // height: 200,
    borderRadius: 10,
    padding: 0,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rowDiv: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  colDiv: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  modeImgs: {
    width: 50,
    height: 50
  },
  modeImgsView: {
    padding: 20,
    paddingRight: 10,
    paddingLeft: 10,
    margin: 0,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-between',
    height: '100%'
  },
  outerCircle: {
    padding: 5,
    // margin: 5,
    borderRadius: 35
  },
  title: {
    padding: 10,
    color: '#000',
    fontWeight: '800'
  },
  subtitle: {
    color: '#000',
    fontSize: 10
  },
  chip: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 5,
    paddingLeft: 7,
    paddingRight: 7,
  },
  qText: {
    fontWeight: '800'
  }

}
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class JourneyProgressCardBottomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journey: [this.props.journey.get('journeys').toJS()[this.props.journey.get('currentJourney')]],
      currentJourney: this.props.journey.get('currentJourney'),
      currentLeg : this.props.journey.get('currentLeg')

    }

    this._renderItem = this._renderItem.bind(this);

  }
  _renderItem({ item, index }) {
    // console.log(item.title, );

    var img = '';
    // const legId = item.journeyLegCurrentId;
    const legId = 1;

    console.log(legId);

    if (item.journey[legId].entity.type === 'PERSON') {
      img = (<View style={[styles.modeImgsView]}>
        <Image source={require('../assets/PERSON.png')} style={[styles.modeImgs]} />
      </View>);
      var actionButtons = (<View style={[{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', width: '100%', paddingTop: 10 }]}>
      </View>)
      var finalActionButtons = (<View style={[styles.rowDiv, { padding: 10, paddingTop: 0 }]}>
        <Button title='Navigate' buttonStyle={{ backgroundColor: '#333' }} containerStyle={{ flex: 1 }} />
        <Button title='Finished Leg' buttonStyle={{ backgroundColor: '#333' }} containerStyle={{ flex: 1 }} />
      </View>)
    }



    else if (item.journey[legId].entity.type === 'BUS') {
      img = (<View style={[styles.modeImgsView]}>
        <Text style={{ fontWeight: '800', fontSize: 20 }}>{item.journey[legId].entity.busNo}</Text>
        <Image source={require('../assets/BUS.png')} style={[styles.modeImgs]} />
        <Text style={{ fontSize: 10 }}>{item.journey[legId].entity.vehicleNo}</Text>
      </View>);
      var actionButtons = (<View style={[{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', width: '100%', paddingTop: 10 }]}>
        <Button title='Pay' buttonStyle={{ backgroundColor: '#333' }} containerStyle={{ flex: 1 }} />
      </View>)
      var finalActionButtons = (<View style={[styles.rowDiv, { padding: 10, paddingTop: 0 }]}>
        <Button title='Navigate' buttonStyle={{ backgroundColor: '#333' }} containerStyle={{ flex: 1 }} />
        <Button title='Finished Leg' buttonStyle={{ backgroundColor: '#333' }} containerStyle={{ flex: 1 }} />
      </View>)
    }


    else if (item.journey[legId].entity.type === 'AUTO') {
      img = (<View style={[styles.modeImgsView]}>
        <Text style={{ fontWeight: '800', fontSize: 20, backgroundColor:'#f1c40f', paddingLeft: 5, paddingRight: 5, borderRadius: 5, textAlign:'center'}}><Text style={{fontSize:10}}>OTP{`\n`}</Text>{item.journey[legId].entity.OTP}</Text>
        <Image source={require('../assets/AUTO.png')} style={[styles.modeImgs]} />
        <Text style={{ fontSize: 10 }}>{item.journey[legId].entity.driverName}</Text>
        <Text style={{ fontSize: 10 }}>{item.journey[legId].entity.vehicleNo}</Text>
      </View>);
      var actionButtons = (<View style={[{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', width: '100%', paddingTop: 10 }]}>
        <Button title='Pay' buttonStyle={{ backgroundColor: '#333' }} containerStyle={{ flex: 1 }} />
        <Button title='Call Driver' buttonStyle={{ backgroundColor: '#333' }} containerStyle={{ flex: 1 }} />
      </View>)
      var finalActionButtons = (<View style={[styles.rowDiv, { padding: 10, paddingTop: 0 }]}>
        <Button title='Navigate' buttonStyle={{ backgroundColor: '#333' }} containerStyle={{ flex: 1 }} />
        <Button title='Finished Leg' buttonStyle={{ backgroundColor: '#333' }} containerStyle={{ flex: 1 }} />
      </View>)
    }



    return (
      <View style={styles.slide}>
        <View style={[styles.rowDiv, { margin: 10, backgroundColor: '#eee', borderRadius: 5 }]}>
          {img}
          <View style={[styles.colDiv, { borderLeftColor: '#ddd', borderLeftWidth: 1, padding: 10 }]}>
            <View style={[styles.colDiv, { justifyContent: 'center', alignItems: 'flex-start', width: '100%' }]}>
              <Text ellipsizeMode={'tail'} numberOfLines={1}><Text style={styles.qText}>From : </Text>{item.journey[legId].entity.from}</Text>
              <Text ellipsizeMode={'tail'} numberOfLines={1}><Text style={styles.qText}>To : </Text>{item.journey[legId].entity.to}</Text>
            </View>
            <View style={[styles.rowDiv, { justifyContent: 'space-between', width: '100%', paddingTop: 10 }]}>
              <View style={[styles.rowDiv, styles.chip]}>
                <Icon name='clock-outline' type='material-community' color='#000' />
                <Text style={styles.subtitle}> {item.journey[legId].entity.time} Mins</Text>
              </View>
              <View style={[styles.rowDiv, styles.chip]}>
                <Icon name='map-marker-path' type='material-community' color='#000' />
                <Text style={styles.subtitle}> {item.journey[legId].entity.distance} KMs</Text>
              </View>
              <View style={[styles.rowDiv, styles.chip]}>
                <Icon name='currency-inr' type='material-community' color='#000' />
                <Text style={styles.subtitle}>{item.journey[legId].entity.fare} Rs</Text>
              </View>
            </View>
            {actionButtons}
          </View>
        </View>
        {finalActionButtons}

      </View>
    );
  }

  render() {
    return (
      <Carousel
        containerCustomStyle={styles.container}
        contentContainerCustomStyle={styles.slides}
        ref={(c) => { this._carousel = c; }}
        data={this.state.journey}
        renderItem={this._renderItem}
        sliderWidth={viewportWidth}
        //   sliderHeight={400}

        itemWidth={viewportWidth - 25}
      //   itemHeight={200}
      />
    );
  }
}

export const JourneyProgressCardBottom = connect(({ journey }) => ({ journey }))(JourneyProgressCardBottomComponent);
