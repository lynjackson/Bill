import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, TouchableOpacity, TextInput, Animated} from 'react-native';
import firebase from 'firebase';

export const Done = ()=>{
  return(
    <View style={{height: '100%', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{height: '40%', alignItems:'center', justifyContent:'space-around'}}>
        <Text style={{fontSize: 70, position:'relative', top: 10}}>Done.</Text>
        <Text style={{fontSize: 20}}>A receipt will be sent to your email.</Text>
        <Text style={{borderColor: 'black', borderWidth: 1, padding: 20, borderRadius: 5}}>View Receipt</Text>
      </View>
      <Text style={{fontSize: 30, fontWeight:'bold'}}>What'd ya think?</Text>
      <View style={{flexDirection:'row', width: '80%', justifyContent:'space-between'}}>
        <View style={styles.ratingCircle}></View><View style={styles.ratingCircle}></View><View style={styles.ratingCircle}></View><View style={styles.ratingCircle}></View><View style={styles.ratingCircle}></View>
      </View>
      <TouchableOpacity style={{backgroundColor: '#212121', width: '90%', justifyContent: 'center', alignItems: 'center', paddingVertical:20, position:'relative', bottom: 10}}><Text style={{color:'white'}}>Submit</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({


  ratingCircle:{borderColor:'black', borderWidth:3,borderRadius: 50, width:50, height:50}


})
