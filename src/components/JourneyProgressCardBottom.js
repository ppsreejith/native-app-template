import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, Button, Dimensions } from 'react-native';
import _ from 'lodash';
import Carousel from 'react-native-snap-carousel';
// import { JOURNEYS } from '../static/journeys';
// import console = require('console');
import { Icon } from 'react-native-elements'
// import console = require('console');

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
    margin: 10,
    justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eee'
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
  qText:{
    fontWeight: '800'
  }

}
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export class JourneyProgressCardBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLeg: this.props.currentLeg
    }

    this._renderItem = this._renderItem.bind(this);

  }
  _renderItem({ item, index }) {
    // console.log(item.title, );

    var img = '';

    if (item.journeyLegCurrent.entity.type === 'PERSON') {
      img = <View style={[styles.modeImgsView]}><Image source={require('../assets/PERSON.png')} style={[styles.modeImgs]} /></View>;
    } else if (item.journeyLegCurrent.entity.type === 'BUS') {
      img = <View style={[styles.modeImgsView]}><Image source={require('../assets/BUS.png')} style={[styles.modeImgs]} /></View>;
    } else if (item.journeyLegCurrent.entity.type === 'AUTO') {
      img = <View style={[styles.modeImgsView]}><Image source={require('../assets/AUTO.png')} style={[styles.modeImgs]} /></View>;
    }

  return (
    <View style={styles.slide}>
      <View style={[styles.rowDiv, { margin: 10, backgroundColor: '#eee', borderRadius: 5 }]}>
        {img}
        <View style={[styles.colDiv,{borderLeftColor:'#ddd',borderLeftWidth:1, padding: 10}]}>
          <View style={[styles.colDiv,{justifyContent:'center',alignItems:'flex-start',width:'100%'}]}>
          <Text><Text style={styles.qText}>From : </Text>{item.journeyLegCurrent.entity.from}</Text>
          <Text><Text style={styles.qText}>To : </Text>{item.journeyLegCurrent.entity.to}</Text>
          </View>
          <View style={[styles.rowDiv,{justifyContent:'space-between',width:'100%'}]}>
          <View style={[styles.rowDiv, styles.chip]}>
            <Icon name='clock-outline' type='material-community' color='#000' />
            <Text style={styles.subtitle}> {item.journeyLegCurrent.entity.time} Mins</Text>
          </View>
          <View style={[styles.rowDiv,styles.chip]}>
            <Icon name='map-marker-path' type='material-community' color='#000' />
            <Text style={styles.subtitle}> {item.journeyLegCurrent.entity.distance} KMs</Text>
          </View>
          <View style={[styles.rowDiv,styles.chip]}>
            <Icon name='currency-inr' type='material-community' color='#000' />
            <Text style={styles.subtitle}>{item.journeyLegCurrent.entity.fare} Rs</Text>
          </View>
          </View>
          
        </View>
      </View>

      <View style={{ padding: 10, paddingTop: 0}}>
        <Button color='#333' title='Finished Leg'/>
      </View>
    </View>
  );
  }

  render() {
    return (
      <Carousel
        containerCustomStyle={styles.container}
        contentContainerCustomStyle={styles.slides}
        ref={(c) => { this._carousel = c; }}
        data={this.state.currentLeg}
        renderItem={this._renderItem}
        sliderWidth={viewportWidth}
        //   sliderHeight={400}

        itemWidth={viewportWidth - 25}
      //   itemHeight={200}
      />
    );
  }
}