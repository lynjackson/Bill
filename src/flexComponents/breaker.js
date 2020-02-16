import React from 'react';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight} from 'react-native';


export default class Breaker extends React.Component{

  render(){
    return(
    <View style={styles.breaker} onPress={()=>{props.doThis()}}><Text style={styles.breakerText}>{this.props.value}</Text></View>

  )
  }
}

const styles = StyleSheet.create({

  breaker:{
    height: 25,
    backgroundColor: '#212121',
    justifyContent: 'center',
  },

  breakerText:{
    color: 'white',
    marginRight: 12,
    fontWeight: '600',
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 16,
    fontFamily:'AvenirNext-Regular'
  },


})
