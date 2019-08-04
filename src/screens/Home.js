import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ButtonGroup, Icon, Image } from 'react-native-elements';
import Navigation from '../utils/Navigation';
import {Matches} from '../components/matches'
import {Stats} from '../components/stats'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }



  render() {
    const component1 = () => <View>
      <Icon
        name='home'
        type='font-awesome'
        color='#000' />
      <Text>Hello</Text>
    </View>
    const component2 = () => <View>
      <Icon
        name='trophy'
        type='font-awesome'
        color='#000' />
      <Text>Hello</Text>
    </View>

    const buttons = [{ element: component1 }, { element: component2 }]
    const { selectedIndex } = this.state


    const name = this.props.user.get('name');
    const score = this.props.user.get('score');
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={{flexDirection: 'row', alignItems: "center", justifyContent:'space-between', padding: 10 }}>
            <Text>Hello {name}</Text>
            <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: '#333', padding: 5, borderRadius: 20 }}>
              <Text style={{fontSize: 20, color: '#fff', marginRight: 5, marginLeft: 5}}>{score}</Text>
              <Image
                source={require('../../assets/rupee.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </View>
          <View style={{flex:1}}>
          <Matches></Matches>
          <Stats></Stats>
          </View>
          
          <View style={{paddingTop: 10, paddingBottom: 10}}>
            <Button
              title="Play 6R!"
              onPress={() => Navigation.navigate('About')}
            />
          </View>
        </View>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={styles.buttongroup}
          innerBorderStyle={{ width: 0 }}
          containerBorderRadius={0}
          selectedButtonStyle={{ backgroundColor: '#0f0' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  buttongroup: {
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderWidth: 0,
    borderTopWidth: 1,
    height: 60,
    bottom: 0
  },
  mainContainer:{
    flex: 1, 
    alignItems: "stretch", 
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: '#eee'

  }
});

export default connect(({ user }) => ({ user }))(Home);
