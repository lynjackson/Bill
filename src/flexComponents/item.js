import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Item = (props) => {

const setCurrentItem = props.screenProps.f_setCurrentItem
const setCategory = props.screenProps.f_setCategory
// console.log(props)
  return(

        <TouchableHighlight style={[styles.itemContainer]} onPress={() => {setCurrentItem(props.foodItem); setCategory(props.category); props.navi('ItemPage')}} >
        <View style={styles.innerTouch}>
          <View style={{flexDirection:'row', justifyContent:'flex-start', marginVertical: 2.5}}>
              <Text style={styles.foodName}>{props.foodItem.name}</Text>
              <View style={{flexDirection:'row', position:'relative'}}>
                  <Text style={styles.foodRating}>{`${Math.floor((Math.random() * (4 - 3 + 1) + 3))}.${Math.floor((Math.random() * 9.0) + 1.0)}`}</Text>
                  <Ionicons name="ios-star" size={14} style={{position:'relative', top:2}} />
              </View>
          </View>
              <Text style={{marginVertical: 2.5, fontFamily: 'Avenir', letterSpacing:-.7, fontSize:17,}}>{props.foodItem.desc}</Text>
              <Text style={styles.foodPrice}>{(isNaN(props.foodItem.price)) ? '':`$${Number(props.foodItem.price).toFixed(2)}`}</Text>
            </View>
            </TouchableHighlight>

    )
}

// <Text style={styles.foodRating}>{Math.floor((Math.random() * 5.0) + 1.0).toFixed(1)}</Text>

export default Item;

const styles = StyleSheet.create({

  itemContainer:{ width: '100%', height: 'auto', borderBottomColor: '#dad9e2', borderBottomWidth: .8, marginBottom: 0},

  innerTouch:{ paddingHorizontal:8, minHeight: 50, width: '100%', flexDirection: 'column', justifyContent: 'space-between',  backgroundColor: 'white', shadowOffset:{  width: 4,  height: 8,  }, shadowColor: 'grey', shadowOpacity: .75, paddingVertical: 5,  },

  foodName:{color: 'black', width: 'auto', maxWidth:'85%', paddingRight: 20, fontSize: 17, fontFamily:'Avenir-Heavy'},

  foodPrice:{ color: 'green', fontFamily: 'GillSans', width: 'auto', fontFamily: 'Avenir-Roman', marginVertical: .25, fontSize: 18, fontFamily: 'AvenirNext-Bold'},

  foodRating:{color: 'black', fontSize: 14, fontFamily: 'AvenirNext-Regular'},
})
