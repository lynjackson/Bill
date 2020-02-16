import React, { Component } from 'react'
import { createStackNavigator, createDrawerNavigator} from 'react-navigation';
import { connect } from 'react-redux'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export const RouletteResult = (props)=>{

  const roulette = props.screenProps.o_firebase

  function rouletteReady(){
    if (props.screenProps.o_firebase.hasOwnProperty('roulette')){
      if(props.screenProps.o_firebase.roulette === props.screenProps.o_user.name){
        return{
          roulette: 'You',
          button: ()=>{return <TouchableOpacity onPress={()=>{props.navigation.navigate('Three')}}><Text>Pay Up</Text></TouchableOpacity>}
        }
      }
      else{
          return {
            roulette: props.screenProps.o_firebase.roulette,
            button: <TouchableOpacity onPress={()=>{props.navigation.navigate('Four')}}><Text>Next</Text></TouchableOpacity>
          }
      }
       return props.screenProps.o_firebase.roulette
    }
    else{
      return 'heh'
    }
  }


    return(
      <View style={{width:'100%', height:'100%', backgroundColor: 'grey', justifyContent: 'space-around', alignItems:'center'}}>
        <Text style={styles.rouletteText}>Could it be you?</Text>
        <Text style={styles.rouletteText}>It could...</Text>
        <Text style={styles.rouletteText}>But don't worry</Text>
        <Text style={styles.rouletteText}>Your bank account is safe</Text>
        <Text style={styles.rouletteText}>this time...</Text>
        <Text style={styles.rouletteText}>Our lucky payer is...</Text>
        <Text style={styles.rouletteText}>{rouletteReady().roulette}</Text>
        {rouletteReady().button}
      </View>
    )
  }

  const styles = StyleSheet.create({

    rouletteText:{fontSize: 40, color:'white'},

  })
