import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ButtonGroup, Icon, Image } from 'react-native-elements';
import Navigation from '../utils/Navigation';
import Network from '../utils/Network';
import _ from "lodash";

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
        selectedIndex: 0,
        data: {'username' : "vivek", "match_id": "ABC"},
        ball: 0,
        state: "waiting",
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  syncWithMaster(){
      const IP = 'http://10.105.16.47:5000';
      Network({
        method:'GET',
        url: '/sync', 
        headers: '',
        baseURL: IP,
          data: _.extend({}, this.state.data, {ball: this.state.ball}, {state: this.state.})
      }).then((response) => {
        console.log(response);

      }).catch((err) => {
          console.log(err);
      });
  }

  componentDidMount(){
    this.timer = setInterval(() => this.syncWithMaster(), 1000);
  }

  componentWillUnmount() {
      clearInterval(this.timer);
      this.timer = null;
  }

  startCountdownAndtakeImage = () => {
      
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

    const batting = <Image
    source={require('../../assets/bat.png')}
    style={{ width: 30, height: 30 }}
  />

  const bowling = <Image
  source={require('../../assets/ball.png')}
  style={{ width: 30, height: 30 }}
/>
    const game = this.props.currentgame.get('game').toJS();
    const score = this.props.user.get('score');


    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={{flexDirection: 'row', alignItems: "flex-start", justifyContent:'space-between', padding: 10 }}>
            <View>
                <View style={{flexDirection: 'row',alignItems: "center"}}>
                    <Text>You : </Text>
                    {game.you==='batting'?batting:bowling}
                    <Text> Opponent : </Text>
                    {game.you==='batting'?bowling:batting}
                </View>
                <View style={{flexDirection: 'row'}}>
                    
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text>Innings : {game.innings}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>Innings 1 Runs : {game.inningsOneRuns}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>Innings 1 Wickets: {game.inningsOneWickets}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>Innings 1 balls : {game.inningsOneBalls}</Text>
                </View>


                <View style={{flexDirection: 'row'}}>
                    <Text>Innings 2 Runs : {game.inningsTwoRuns}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>Innings 2 Wickets: {game.inningsTwoWickets}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>Innings 2 balls : {game.inningsTwoBalls}</Text>
                </View>

            </View>
            <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: '#333', padding: 5, borderRadius: 20 }}>
              <Text style={{fontSize: 20, color: '#fff', marginRight: 5, marginLeft: 5}}>{score}</Text>
              <Image
                source={require('../../assets/rupee.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </View>
          
        </View>
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

export default connect(({ currentgame,user }) => ({ currentgame,user }))(Game);
