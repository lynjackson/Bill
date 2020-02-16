import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity, TextInput} from 'react-native';
import { MenuStackNav } from './stackNavs';
import { createDrawerNavigator } from 'react-navigation'

 export default class DrawerTest extends Component  {
   constructor(props){
     super(props);
   }
  render(){
    return (
      <TouchableOpacity style={styles.touchy} onPress={() => this.props.navigation.toggleDrawer()}><Text>'Pretend Im a Hamburger'</Text></TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  touchy:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: 'green',

  }
})
