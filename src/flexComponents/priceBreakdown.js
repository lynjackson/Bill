import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity, TextInput, Picker} from 'react-native';
import {base3, base} from '../components/payPages/paymentPage'

export const PriceBreakdown = (props) => {
  return (
    <View style={styles.priceView}>
    {props.children}
      <View style={styles.inDesc}>
        <Text style={{marginTop: 8, fontSize: 14,}}>Subtotal</Text>
        <Text key={props.screenProps.o_user.customTotal} style={{marginTop: 8, fontSize: 14,}}>${props.subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.inDesc}>
        <Text style={{marginTop: 8, fontSize: 14}}>Tax</Text>
        <Text style={{marginTop: 8, fontSize: 14}}>${props.orderTax.toFixed(2)}</Text>
      </View>
      <View style={styles.inDesc}>
        <Text style={{marginTop: 8, fontSize: 18, fontWeight: 'bold'}}>Your Total</Text>
        <Text style={{marginTop: 8, fontSize: 18, fontWeight: 'bold'}}>${props.subtotal + props.orderTax}</Text>
      </View>
    </View>
  )
}

export const CartBreakdown = (props) => {
  const cartTotal = (props.screenProps.o_cart.reduce((acc, item)=>{return acc+item.price}, 0))
  const tax = (cartTotal * .07)
  return(
    <View style={styles.priceView}>
      <View style={styles.inDesc}>
        <Text style={{marginTop: 8, fontSize: 14}}>Subtotal</Text>
        <Text style={{marginTop: 8, fontSize: 14}}>${cartTotal.toFixed(2)}</Text>
      </View>
      <View style={styles.inDesc}>
        <Text style={{marginTop: 8, fontSize: 14}}>Tax</Text>
        <Text style={{marginTop: 8, fontSize: 14}}>${tax.toFixed(2)}</Text>
      </View>
      <View style={styles.inDesc}>
        <Text style={{marginTop: 8, fontSize: 18, fontWeight: 'bold'}}>Cart Total</Text>
        <Text style={{marginTop: 8, fontSize: 18, fontWeight: 'bold'}}>${(cartTotal + tax).toFixed(2)}</Text>
      </View>
    </View>
  )
}



export const OrderBreakdown = (props) => {
  const subtotal = (props.screenProps.o_order.reduce((acc, item)=>{return acc+item.price}, 0))
  const orderTax = (subtotal * .07)
  return(
    <PriceBreakdown subtotal={subtotal}>
        <Text style={{textAlign: 'center', fontSize: 18}}>Splitting {'Four'} Ways</Text>
    </PriceBreakdown>
  )
}

export const SplitBreakdown = (props) => {
  const subtotal = props.screenProps.o_table.price
  const orderTax = (subtotal * .07)

  const base = Object.values(props.screenProps.o_firebase).map((person)=>{
    if (person.hasOwnProperty('order')){
      if (person.order.length > 1){
        return person.order.reduce((acc, item)=>{
           return item.price + acc;
      }, 0)
    }
       else if (person.order.length === 1){return person.order[0].price}
    }
    else{
      return 0;
    }
  })

  const base3 = base.filter((price)=>{
    return (typeof price === 'number')
  })

  console.log(base3, 'base3-breaky')
  return(
    <View style={{height: 'auto',  paddingHorizontal: '2%', alignSelf:'center', width: '96.5%', paddingTop: 5, paddingBottom: 5,  backgroundColor:'rgb(223,223,223)', justifyContent: 'space-between', marginBottom: 10, borderRadius: 5,}}>

      <Text style={{alignSelf:'center', marginBottom:'2%', fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8}}>Check split {props.base3.length} ways</Text>

      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:'1%'}}>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8}}>Subtotal</Text>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8, color:'green'}}>{props.splitEem.toFixed(2)}</Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:'1%'}}>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8}}>Tax</Text>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8, color:'green'}}>{(props.splitEem * .07).toFixed(2)}</Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:'1%'}}>
        <Text style={{fontFamily:'Avenir-Heavy', fontSize:16, letterSpacing:1.8}}>Total</Text>
        <Text style={{fontFamily:'Avenir-Heavy', fontSize:16, letterSpacing:1.8, color:'green'}}>{(props.splitEem + (props.splitEem * .07)).toFixed(2)}</Text>
      </View>
    </View>








  )
}

// <View style={{width: 'auto', flexWrap: 'nowrap', flexShrink: 1}}>
//   <Text style={{alignSelf: 'center', marginBottom:10, textDecorationLine: 'underline'}}>Subtotal</Text>
//   <Text style={[styles.splitNumbers, {flexWrap: 'nowrap', flexShrink: 1}]}>{subtotal.toFixed(2)}</Text>
// </View>
//
// <View style={{alignSelf: 'flex-end',}}><Text style={{fontSize: 20, fontWeight: 'bold', color: 'red', bottom: 8}}>+</Text></View>
//
// <View style={{width: 'auto', flexWrap: 'nowrap', flexShrink: 1}}>
//   <Text style={{alignSelf: 'center', marginBottom:10, textDecorationLine: 'underline'}}>Tax</Text>
//   <Text style={[styles.splitNumbers, {flexWrap: 'nowrap', flexShrink: 1}]}>{orderTax.toFixed(2)}</Text>
// </View>
//
// <View style={{alignSelf: 'flex-end',}}><Text style={{fontSize: 20, fontWeight: 'bold', color: 'red', bottom: 8}}>/</Text></View>
//
// <View style={{width: 'auto', flexWrap: 'nowrap', flexShrink: 1}}>
//   <Text style={{alignSelf: 'center', marginBottom:10, textDecorationLine: 'underline'}}>Diners</Text>
//   <Text style={[styles.splitNumbers, {flexWrap: 'nowrap', flexShrink: 1}]}>{props.diners}</Text>
// </View>
//
// <View style={{alignSelf: 'flex-end',  right: 5}}><Text style={{fontSize: 20, fontWeight: 'bold', color: 'red', bottom: 8}}>=</Text></View>
//
// <View style={{width: 'auto', flexWrap: 'nowrap', flexShrink: 2}}>
//   <Text style={{alignSelf: 'center', marginBottom:10, textDecorationLine: 'underline'}}>Your Total</Text>
//   <Text style={[styles.splitNumbers, {flexWrap: 'nowrap', flexShrink: 2, textDecorationLine: 'underline', textDecorationStyle: 'double', textDecorationColor: 'green', fontSize: 26, bottom: 5}]}>{((subtotal + orderTax) / props.diners).toFixed(2)}</Text>
// </View>
//
// </View>

export const YourBreakdown = (props) => {
  const subtotal = (props.screenProps.o_order.reduce((acc, item)=>{return acc+item.price}, 0))
  const orderTax = (subtotal * .07)
  return(
    <View style={{height: 'auto',  paddingHorizontal: '2%', alignSelf:'center', width: '96.5%', paddingTop: 5, paddingBottom: 5,  backgroundColor:'rgb(223,223,223)', justifyContent: 'space-between', marginBottom: 10, borderRadius: 5,}}>

      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:'1%'}}>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8}}>Subtotal</Text>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8, color:'green'}}>Money</Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:'1%'}}>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8}}>Tax</Text>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8, color:'green'}}>Money</Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:'1%'}}>
        <Text style={{fontFamily:'Avenir-Heavy', fontSize:16, letterSpacing:1.8}}>Total</Text>
        <Text style={{fontFamily:'Avenir-Heavy', fontSize:16, letterSpacing:1.8, color:'green'}}>Money</Text>
      </View>
    </View>
  )
}

export const CustomBreakdown = (props) => {
  const subtotal = (props.screenProps.o_order.reduce((acc, item)=>{return acc+item.price}, 0))
  const orderTax = (subtotal * .07)
  return(
    <View style={{height: 'auto',  paddingHorizontal: '2%', alignSelf:'center', width: '96.5%', paddingTop: 5, paddingBottom: 5,  backgroundColor:'rgb(223,223,223)', justifyContent: 'space-between', marginBottom: 10, borderRadius: 5,}}>

      <Text style={{alignSelf:'center', marginBottom:'2%', fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8}}>4 items selected</Text>

      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:'1%'}}>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8}}>Subtotal</Text>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8, color:'green'}}>{props.amounts.toFixed(2)}</Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:'1%'}}>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8}}>Tax</Text>
        <Text style={{fontFamily:'Avenir-Light', fontSize:16, letterSpacing:1.8, color:'green'}}>{(props.amounts * .07).toFixed(2)}</Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:'1%'}}>
        <Text style={{fontFamily:'Avenir-Heavy', fontSize:16, letterSpacing:1.8}}>Total</Text>
        <Text style={{fontFamily:'Avenir-Heavy', fontSize:16, letterSpacing:1.8, color:'green'}}>{((props.amounts * .07) + (props.amounts)).toFixed(2)}</Text>
      </View>
    </View>
  )
}

export const TreatBreakdown = (props) => {
  const subtotal = props.screenProps.o_table.price
  const orderTax = (subtotal * .07)
  return(
    <PriceBreakdown subtotal={subtotal} orderTax={orderTax} screenProps={props.screenProps}/>
  )
}

export const RouletteBreakdown = (props) => {
  return(
    <PriceBreakdown subtotal={props.subtotal}/>
  )
}

export class PickBreakdown extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     subtotal: this.props.screenProps.o_user.customTotal,
  //   }
  // }

  render(){

    return(
      <PriceBreakdown subtotal={this.props.screenProps.o_user.customTotal} orderTax={this.props.tax} screenProps={this.props.screenProps}/>
    )
  }
}

const styles = StyleSheet.create({
  priceView:{height: 'auto', paddingVertical: 5, backgroundColor:'white', justifyContent: 'space-between', alignItems:'stretch', margin: 10, borderRadius: 3, width:'100%', alignSelf:'center'},
  inDesc:{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20},
  splitNumbers:{fontSize: 20, fontWeight:'bold', alignSelf: 'center'}
})





// <PriceBreakdown subtotal={subtotal} orderTax={orderTax} screenProps={props.screenProps}/>
