import React from 'react';
import ListItem from '../flexComponents/listItem';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity, TextInput} from 'react-native';

//takes an array containing objects and adds up the price properties of each object
export const addUp = function(array){
  return array.reduce(function(acc, indexType){
    return (acc + indexType.price)
  }, 0)
};

export const listItemCreator = function(itemArray, ListType, editor, screenProps){
//create new array that will hold objects that get rendered
  let newArray = []
//if there's nothing in cart, render a message saying so.
  if (itemArray.length === 0){
    return <Text style={{textAlign: 'center', marginTop: 40, fontFamily: 'Avenir-Light', fontSize:24}}>CART IS EMPTY</Text>
  }
//if there are objects in cart array, iterate over objects
  itemArray.map((item) => {
    //add the first object in cart to newArray
    if (newArray.length === 0){
      newArray.push({...item, quantity: 1})
      return
    }
    //Beginning w/ the second item, iterate over objects in newArray, and compare their name properties to item's name property
    for (let i = 0; i < newArray.length; i++){
      //if item has the same name as the newArray object it's being compared to...
      if (item.name === newArray[i].name){
        //add 1 to the quantity property on that newArray object, and move to the next item.
          newArray[i].quantity += 1
          newArray[i].price += item.price
          return;
        }
      //if not, compare item to the next object in newArray. But if at the end of newArray, add item to newArray
      else{
        if (i === newArray.length - 1){
          newArray.push({...item, quantity: 1})
          return;
        }
        else{
          continue;
        }
      }
    }
  })

    return newArray.map((newItem) => {
        return <ListType cartArray={itemArray} newItem={newItem} key={newItem.name} itemAmount = {newItem.quantity} itemName = {newItem.name} itemPrice={newItem.price} editor={editor} screenProps={screenProps}/>
    })
  }


//need the following styles: styles.foodName, styles.foodPrice. styles.innerTouch.
//Really, you should build these into this, or an independent module
const itemizer = (itemArray, navi) => {
  return itemArray.map(function(index){
    return(
      <TouchableHighlight onPress={() => {navi('ItemPage', { screen: props.foodItem, other: props.category})}} style={styles.innerTouch, {width: '100%', flexDirection: 'row',  justifyContent: 'space-between', alignSelf: 'center', borderColor: '#dad9e2', borderWidth: .5, marginBottom: 2}}>
      <View style={{height: '100%', width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 2, backgroundColor: 'white', shadowOffset:{  width: 4,  height: 8,  }, shadowColor: 'grey', shadowOpacity: .75, borderRadius: 3.5, padding: 5}}>
            <Text style={[styles.foodName, {width: '83%', fontFamily: 'Futura',}]}>{index.name}</Text>
            <Text style={[styles.foodPrice, {width: '17%', alignSelf: 'flex-end'}]}>${Number(index.price).toFixed(0)}</Text>
          </View>
          </TouchableHighlight>
    )
  });
}

 export const menuSetter = (array) => {
   let newMenu = {};
   array.forEach(function(catObject){
      let key = catObject.name
      newMenu[key] = catObject.entries.items.map(function(index){
        console.log(index);
        return {name: index.name, desc: index.description, options: index.options, id: index.entryId, category: catObject.name, price: Number(index.price)}
      });
    })
    return newMenu
}


// export const stateToggler = (stateProp, stateValue, trueValue, falseValue) => {
//   return (this.state[stateProp] === stateValue) ? this.setState({[stateProp]: trueValue}):this.setState({[stateProp]: falseValue});
// }

export const animator = (stateValue, animValue, initValue) => {
    if (stateValue._value === 0){
        return Animated.timing(stateValue, {duration: 200, toValue: animValue})
    }
    else{
        return Animated.timing(this.state.edit, {duration: 200, toValue: initValue})
    }
}

export const rouletteDetector = (prop)=>{
  return (prop) ? console.log('Yeaaa!!!') : console.log('naw')}
