 import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView,
  TouchableHighlight, Image, TouchableOpacity, TextInput, Animated, TouchableWithoutFeedback} from 'react-native';
import Breaker from '../flexComponents/breaker';
import {listItemCreator} from '../helperFunctions/pureFunctions';
import PriceBreakdown from '../flexComponents/priceBreakdown'
import BottomButton from '../flexComponents/bottomButton'
import { StackNavigator } from 'react-navigation';
import {gStyle, appStyle} from '../containers/styles';
import Tipper from './tipper'
import { Ionicons } from '@expo/vector-icons';

const PayOption = (props)=>{
return(
<TouchableHighlight style={[styles.payOption, { backgroundColor: 'white'}]} onPress={()=>{props.navigate()}}>
  <View style={{height: '100%', width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft:'1%', paddingTop:'1%'}}>
     <View style={{height: '100%',  width: '70%', alignItems: 'flex-start'}}>
       <Text style={{fontSize: 20, fontFamily:'Avenir-Black', textTransform:'uppercase', letterSpacing:1.8}}>{props.title}</Text>
       <Text style={{color: 'black', marginTop: 10, fontFamily:'Avenir-Light', fontSize:16}}>{props.description}</Text>
     </View>

     <View style={{height: '100%',  width: '30%', justifyContent: 'center', alignItems: 'center',}}><Image source={props.img} style={{width:70, height: 70}}/></View>
    </View>
 </TouchableHighlight>
)
}

const PayOptionsScreen = (props) =>{
  return(
    <View style={[appStyle.page, {position: 'absolute', zIndex: 3, display:props.style.display,height:'100%', width:'100%', alignSelf: 'center', backgroundColor:'rgba(21,21,21, .99)', paddingBottom:0}]} >
      <View style={appStyle.header}><Text style={{color: 'white', alignSelf:'center', fontFamily: 'Avenir', fontSize: 17, letterSpacing:4, fontWeight:'bold', textTransform:'uppercase'}}>Select a payment option</Text></View>
      <View style={styles.optionsContainer}>
        <PayOption style={{opacity: 1}}title={"Even Split"} description={"Split the check with all of your friends, or whomever you choose."} img={require('../img/split.png')} navigate={()=>{props.navigate('SplitPay')}}/>
        <PayOption title={"Your Items"} description={"Split the check with all of your friends, or whomever you choose."} img={require('../img/yourStuff.jpeg')} navigate={()=>{props.navigate('YourStuffPay')}}/>
        <PayOption title={"Select Items"} description={"Split the check with all of your friends, or whomever you choose."} img={require('../img/custom.png')} navigate={()=>{props.navigate('PickPay')}}/>
        <PayOption title={"Roulette"} description={"Split the check with all of your friends, or whomever you choose."} img={require('../img/roulette.png')} navigate={()=>{props.navigate('RoulettePay')}}/>
        <TouchableOpacity style={{width:'96.5%', height:'10%', borderColor: 'white', borderWidth: 1, borderRadius:5, justifyContent:'center', alignItems:'center', paddingBottom:6}} onPress={()=>{props.payOptionToggle()}}><Text style={{textTransform:'uppercase', fontFamily: 'Avenir-Black', color:'white', fontSize:17}}>cancel</Text></TouchableOpacity>
      </View>
    </View>
  )
}

// <View style={{backgroundColor: '#212121', borderBottomColor: 'white', borderBottomWidth: .5, marginBottom: 9, height: 'auto', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
//   <TouchableWithoutFeedback onPress={()=>{props.payOptionToggle()}}><View style={{flexDirection: 'row', alignItems: 'center'}}><Ionicons name="ios-arrow-back" size={40} style={{color:'white'}}/></View></TouchableWithoutFeedback>
//   <Text style={{fontFamily: 'Avenir-Medium', fontSize: 20, color: 'white'}}>Select a Payment Option</Text>
// </View>

// <TouchableHighlight style={{position:'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.8)'}} onPress={()=>{props.payOptionToggle()}}>
//   <View></View>
// </TouchableHighlight>

// <PayOption title={"I'm Treatin'!"} description={"Split the check with all of your friends, or whomever you choose."} img={require('../img/treatin.png')} navigate={null}/>

export default PayOptionsScreen;

const styles = StyleSheet.create({
  optionsContainer:{height: 'auto', width: '96.5%',  justifyContent: 'space-between', alignItems: 'center', alignSelf:'center'},

  payOption:{height: '17%', width: '100%', flexDirection: 'row', alignItems: 'flex-start', alignSelf:'center', justifyContent: 'flex-start', backgroundColor: 'white', borderColor: '#212121', borderWidth: 2, borderRadius: 5, marginBottom: 20,},

  cartPage:{justifyContent: 'space-between', height: '100%', opacity: 1},

  itemHeader:{textAlign: 'center', fontSize: 14, fontWeight: 'bold', letterSpacing: 5, marginTop: 14},

  payText: {textAlign:'center', fontSize: 20, fontFamily:'Avenir-Medium', }
})
