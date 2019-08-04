import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { ButtonGroup, Icon, Image } from 'react-native-elements';


class StatsComponent extends React.Component {
  render() {
  
   
    const stats_batting = this.props.user.get('stats').get('batting');
    const stats_bowling = this.props.user.get('stats').get('bowling');
    return (
      <View style={styles.container}>
      <View style={styles.heading}>
          <Text style={{color:'#fff'}}>Stats</Text>
        </View>
        <ScrollView>
            <View style={{padding: 10, alignItems:"stretch"}}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <Text>Batting</Text>
            <Image
                source={require('../../assets/bat.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={styles.shead}>Runs</Text>
                    <Text>{stats_batting.get('runs')}</Text>
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={styles.shead}>High Score</Text>
                    <Text>{stats_batting.get('highScore')}</Text>
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={styles.shead}>Average</Text>
                    <Text>{stats_batting.get('average')}</Text>
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={styles.shead}>Strike Rate</Text>
                    <Text>{stats_batting.get('strikeRate')}</Text>
                </View>    
            </View>
            </View>

            <View style={{padding: 10, alignItems:"stretch"}}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <Text>Bowling</Text>
            <Image
                source={require('../../assets/ball.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={styles.shead}>Wickets</Text>
                    <Text>{stats_bowling.get('wickets')}</Text>
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={styles.shead}>Economy</Text>
                    <Text>{stats_bowling.get('economy')}</Text>
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={styles.shead}>Average</Text>
                    <Text>{stats_bowling.get('average')}</Text>
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={styles.shead}>3W Hauls</Text>
                    <Text>{stats_bowling.get('threeW')}</Text>
                </View>    
            </View>
            </View>
                
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    borderRadius: 10,
    // borderColor: '#ccc',
    // borderWidth: 1,
    backgroundColor: '#fff',
    margin: 5,
    // padding: 20
  },
  heading:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems: 'center', 
    backgroundColor:'#2c3e50',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    
  },
  shead:{
    backgroundColor: '#eee',
    padding: 5
  }
  });

export const Stats = connect(({ user }) => ({ user }))(StatsComponent);
