import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity, TextInput, Picker} from 'react-native';


const BottomButton = (props) => {

  return (
    <View >
    <TouchableOpacity style={styles.button} onPress={()=>{props.doThis()}}>
      <Text style={styles.buttonText}>{props.buttonText}</Text>
      <Text style={styles.buttonPrice}>${props.buttonPrice}</Text>
    </TouchableOpacity>
    </View>
  )
}
export default BottomButton

export const CartButton = (props)=>{
  return(
    <View>
      <TouchableOpacity style={(props.cart.length > 0) ? styles.button : [styles.button, {backgroundColor: 'grey'}]} onPress={()=>{(props.cart.length > 0 ) ? props.doThis(): null}}>
        <Text style={styles.buttonText}>{(props.cart.length > 0) ? 'Submit Order' : '---'}</Text>
        <Text style={styles.buttonPrice}>{props.buttonPrice}</Text>
      </TouchableOpacity>
    </View>
  )
}




export const CheckoutButton = (props)=>{
  return(
    <View>
    <TouchableOpacity style={styles.button} onPress={()=>{props.payOptionToggle()}}>
      <Text style={styles.buttonText}>Checkout</Text>
      <Text style={styles.buttonPrice}>{props.buttonPrice}</Text>
    </TouchableOpacity>
    </View>
  )
}

export const PayButton = (props)=>{
  return (
    <View style={{width:'96.5%', alignSelf:'center', }}>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#212121', borderColor:'green', borderWidth:3, borderRadius:5}]} onPress={()=>{props.navigate()}}>
        <Text style={[styles.buttonText, {color: 'white',}]}>Pay</Text>
        <Text style={[styles.buttonPrice, {color:'green'}]}>{props.buttonPrice}</Text>
      </TouchableOpacity>
    </View>
  )
}

export const EditButton = (props)=>{
  return (


    <TouchableOpacity style={[styles.button, {backgroundColor: 'black', justifyContent:'center', marginTop: 5}]} onPress={()=>{props.doThis()}}>
      <Text style={[styles.buttonText, {color: 'white', marginLeft:0}]}>Confirm Changes</Text>
    </TouchableOpacity>

  )
}



const styles = StyleSheet.create({
  button:{ flexDirection:'column', backgroundColor: '#212121', justifyContent:'center', height: 50, width: '100%', alignSelf: 'center', borderRadius:5},
   buttonText:{ color: 'white', fontSize: 17, alignSelf:'center', position:'relative', top:'25%', fontFamily: 'Avenir-Black', letterSpacing:1.8 ,color: 'rgb(134,134,134)', color:'white', textTransform: 'uppercase' },
   buttonPrice:{ color: '#8bc34a', fontFamily: 'Avenir-Black', fontSize: 17, alignSelf: 'flex-end', right:'2.5%', position:'relative', letterSpacing:1.8, bottom:'21.5%'},
})
