import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, TouchableHighlight} from 'react-native';
//import { addItem, addPrice } from '../actions/index.js';
import { Ionicons } from '@expo/vector-icons';

const NoteBox = (props) => {
  return(
    <View style={styles.noteBoxView}>
      <TextInput style={styles.noteBox} multiline={true} placeholder={props.defaultValue}></TextInput>
    </View>
  )
}

export default NoteBox;

const styles = StyleSheet.create({
  noteBoxView:{
    width: '98%',
    height: 85,
    alignSelf: 'center',
  },
  noteBox:{
    backgroundColor: '#ececec',
    width: '100%',
    height: '100%',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: .5,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize:15,
    color: 'black',
  }
})
