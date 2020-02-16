import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView} from 'react-native';



export default class ScrollItem extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <View style={styles.scr}>
          <Text style={styles.text} onPress={ () => this.props.change(this.props.id) }>{this.props.food.name}</Text>
        </View>
        
    );
  }
}



const styles = StyleSheet.create({
  scrollContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    //flexGrow: 1,
    alignItems: 'stretch',
    backgroundColor: 'rgba(187, 212, 216, .5)',
    height: 'auto',
    width: 'auto',
  },
  scr: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    //backgroundColor: 'yellow',
    //borderBottomWidth: 1,
    //borderBottomColor: '#0e0a0ab8',
    //flexGrow: 1,
    //textAlign: 'center',
  },
  text:{
    textAlign: 'center',
    marginLeft: 14,
    marginRight: 14,
    fontSize: 11,
    //alignItems: 'center',
  },
  selected:{
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(25, 52, 65)',
  },
});
