import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { ButtonGroup, Icon, Image, ListItem } from 'react-native-elements';


class MatchesComponent extends React.Component {
  render() {
    const won = () => <Icon
        name='thumbs-up'
        type='font-awesome'
        color='#16a085' />
    const lost = () => <Icon
        name='thumbs-down'
        type='font-awesome'
        color='#c0392b' />
   
    const matchData = this.props.user.get('matchData');
    return (
      <View style={styles.container}>
      <View style={styles.heading}>
          <Text style={{color:'#fff'}}>Matches</Text>
          <View style={{flexDirection:'row'}}>
              <Text style={{backgroundColor:'#16a085', color:'#fff', borderRadius: 100, margin: 3,padding: 4, width: 30, height: 30, textAlign: "center"}}>{matchData.get('wins')}W</Text>
              <Text style={{backgroundColor:'#c0392b', color:'#fff', borderRadius: 100, margin: 3, padding: 4, width: 30, height: 30, textAlign: "center"}}>{matchData.get('losses')}L</Text>
          </View>
          
        </View>
        {/* <Text>{matchData.get('matches')}</Text> */}
        <ScrollView>
  {
    matchData.get('matches').toJS().map((item, i) => (
      <ListItem
        key={i}
        title={item.opponent}
        rightSubtitle={item.margin}
        rightTitle={item.result=='win'?won:lost}
        // leftIcon={{ name: 'user-circle',type:'font-awesome' }}
        leftAvatar={{ source: { uri: item.url } }}
        containerStyle={{borderBottomColor:'#eee', borderBottomWidth: 1}}
      />
    ))
  }
</ScrollView>
        {/* {
    matchData.get('matches').map((l, i) => (
      <ListItem
        key={i}
        title={l.opponent}
        // subtitle={l.subtitle}
      />
    ))
  } */}
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderRadius: 10,
    // borderColor: '#ccc',
    // borderWidth: 1,
    backgroundColor: '#fff',
    margin: 5,
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingTop: 10,
    paddingBottom: 10
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
    paddingTop: 2,
    paddingBottom: 2,
    
  }
  });

export const Matches = connect(({ user }) => ({ user }))(MatchesComponent);
