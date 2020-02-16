import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import Breaker from '../flexComponents/breaker';
import Item from '../flexComponents/item';



export const categoryBuilder = (obj, navigate, setItem, setCat, screenProps) => {

let yPosObj = {};

const yPosFunc = (catName, catYValue) => {
  return yPosObj[catName] = catYValue;
}

//I want to get the Y positions of the elements when they are rendered, and scroll to those positions when the corresponding top scroll category is touched.

  return Object.values(obj).map(category => {
    // console.log(category)
    //create a new object with the category name as keys, and Y positions as values.
    return(
    <View onLayout={(event)=>{yPosFunc(category, event.nativeEvent.layout.y); screenProps.f_yPos(category[0].category, event.nativeEvent.layout.y) ; }} key={category}style={{backgroundColor: '#212121'}}>
      <View style={{width: '100%', height: 'auto', flexDirection:'row', backgroundColor: '#212121', justifyContent: 'flex-start', alignItems:'center', paddingRight: 10, overflow: 'hidden', paddingVertical: 9}}><Text style={{color: 'white',  marginLeft: 7, fontFamily: 'Avenir-Medium', letterSpacing: 1.8, fontSize: 14, textTransform:'uppercase'}}>{category[0].category}</Text></View>
      <View style={{justifyContent:'flex-start', alignItems: 'center', backgroundColor: '#edeef0',  height: 'auto',}}>
      {category
        //displays items with a valid price
        .filter(item => item.price)
        .map( it => <Item key={it.name} foodItem={it} category={category} navi={navigate} screenProps={screenProps}/>)}
      </View>
    </View>
    )
  })
}

export const styles_menuCategories = {
  unnecessary:{ width: 'auto', height: 'auto', },

  touch:{ width: '48%', backgroundColor: '#e8e4e4', marginBottom: 8, },

  itemz: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', width: 'auto', height: 'auto', borderColor: 'rgba(114, 137, 143, 0.29)', },

  textBox:{ flexDirection: 'column', flexShrink: 2, justifyContent: 'space-around', height: 'auto' },

  foodName:{ fontSize: 15, fontFamily: 'Avenir', color: 'black', },

  foodDescription:{ fontSize: 17, color: 'black', },

  foodPrice:{ color: 'green', fontSize: 13, textAlign: 'right', fontFamily: 'Futura', },

  imgBox:{ height: 75, width: 75, marginRight: 5, marginTop: 5, marginLeft: 5, },

  img:{ height: 75, width: 75, },

  breaker:{ height: 25, backgroundColor: 'rgb(114, 137, 143)', justifyContent: 'center', },

  breakerText:{ color: 'rgb(25, 52, 65)', marginLeft: 12, },
}
