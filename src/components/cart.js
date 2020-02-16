//this is the content page
import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback} from 'react-native';
import Breaker from '../flexComponents/breaker';
import {ListItem, CartListItem} from '../flexComponents/listItem';
import { listItemCreator, addUp } from '../helperFunctions/pureFunctions';
import {PriceBreakdown, CartBreakdown} from '../flexComponents/priceBreakdown';
import NoteBox from '../flexComponents/noteBox';
import firebase from 'firebase';
//import DrawerNav from './drawerNav.js';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import BottomButton, {EditButton, CartButton} from '../flexComponents/bottomButton'
import { Ionicons } from '@expo/vector-icons';
import {appStyle} from '../containers/styles';


class Cart extends Component {
  constructor(props){
    super(props);
    this.state={
      currentItem: 'Not working yet',
      display: 'none',
      quantity: 1
    }
    this.totalAdder=this.totalAdder.bind(this)
    this.sendToFirebase=this.sendToFirebase.bind(this)
    this.editor=this.editor.bind(this)
    this.cartReset=this.cartReset.bind(this)
  }
  static navigationOptions: {
   title: 'Cart',
   headerStyle:{backgroundColor: '#212121', borderBottomWidth: 0},
   headerTintColor: 'white'
};

  sendToFirebase(cart, subtotal) {
    this.props.screenProps.f_submitOrder(cart)
    setTimeout(()=>{
      this.props.screenProps.f_emptyCart()
      this.props.navigation.navigate('Order', {orderz: this.props.order})
      firebase.database().ref(`Restaurant/testTable/${this.props.screenProps.o_user.name}`).child('order').update(this.props.screenProps.o_order)


      // firebase.database().ref(`Restaurant/testTable/${this.props.screenProps.o_user}`).set({})
      //anytime a user adds an item to the order, they are removed from firebase.

    }, 1)

    // clearTable(){
    //   firebase.database().ref(`Restaurant/testTable`).set({})
    // }





    // ref.set(cartInfo).then((data)=>{
    //     //success callback
    //
    // }).catch((error)=>{
    //     //error callback
    //     console.log('error ' , error)
    // })

  }

  totalAdder(acc, itemObj){
    return acc + itemObj.price
  }

  editor(item, array, newItem){
    this.setState({
      currentItem: item,
      display: 'flex',
      cartArray: array,
      newItem: newItem
    })
  }

  cartReset(){
      const newCart = this.props.screenProps.o_cart.filter((item)=>{return item.id !== this.state.newItem.id})
      this.props.screenProps.f_emptyCart()
      newCart.map((item)=>{this.props.screenProps.f_addItem(item)})
      for (let i = 0; i < this.state.quantity; i++){this.props.screenProps.f_addItem(this.state.newItem)}

  }

  render() {

    const { navigate } = this.props.navigation
    const cart = this.props.screenProps.o_cart
    const subtotal = cart.reduce(this.totalAdder, 0)
    const tax = subtotal * .07
    const total = subtotal + tax

    console.log(this.props)
    console.log(cart, 'cart')
    console.log(this.props.screenProps.o_order)

    return (
      <View style={[appStyle.page], {paddingBottom:6}}>
        <View style={appStyle.header}><Text style={{color: 'white', alignSelf:'center', fontFamily: 'Avenir', fontSize: 17, letterSpacing:4, fontWeight:'bold'}}>Your Cart</Text></View>

        <View style={{height: '53.5%', width:'96.5%', alignSelf:'center'}}>
          <ScrollView style={{marginTop: '5%'}}>
            {listItemCreator(cart, CartListItem, this.editor, this.props.screenProps)}
          </ScrollView>
        </View>

          <View style={{justifyContent: 'flex-end', height: '40%', width:'96.5%', alignSelf:'center'}}>
            <CartButton cart={this.props.screenProps.o_cart} buttonText={'PLACE ORDER'} doThis={()=>{this.sendToFirebase(cart, subtotal);}} buttonPrice={subtotal.toFixed(2)}/>
          </View>
        </View>

      );
    }
  }

  // <TouchableHighlight onPress={()=>{this.setState({display: 'none'})}}style={{position:'absolute', width: '100%', height: '100%', display: this.state.display, backgroundColor: 'rgba(0,0,0,.7)',}}><View></View></TouchableHighlight>
  //
  // <View style={{display: this.state.display, position: 'absolute', height: 'auto', width: '80%', alignSelf: 'center', borderColor: '#212121', borderWidth: 3, borderRadius:10, top: 125, backgroundColor: 'white', justifyContent:'space-between', }}>
  //   <View style={{height: 'auto', padding:10, marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between', }}>
  //     <View style={{width: '60%', justifyContent:'flex-start'}}><Text style={{fontSize: 20, fontFamily: 'Futura'}}>{this.state.currentItem}</Text></View>
  //     <View style={{ flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center', width: '40%'}}>
  //       <TouchableHighlight onPress={()=> this.setState({quantity: this.state.quantity - 1})}><Ionicons name="ios-remove-circle-outline" size={32} /></TouchableHighlight>
  //       <TextInput style={{  borderWidth: 2, borderColor: 'black', width: 'auto', height: 'auto', alignSelf: 'center', borderRadius: 5, textAlign: 'center', fontSize: 40, marginLeft: 8, marginRight: 8, }} defaultValue={String(this.state.quantity)} autoFocus={false}/>
  //       <TouchableHighlight onPress={()=> this.setState({quantity: this.state.quantity + 1})}><Ionicons name="ios-add-circle-outline" size={32} /></TouchableHighlight>
  //     </View>
  //   </View>
  //   <View style={{ height: 'auto', width: '100%', justifyContent: 'space-between'}}>
  //
  //     <View style={{height: 'auto', width: '100%'}}>
  //       <NoteBox defaultValue={'Notes for the kitchen...'}/>
  //       <EditButton doThis={this.cartReset}/>
  //     </View>
  //
  //   </View>



function mapStateToProps(state){
  return {
    user: state.user,
    order: state.order
  }
}


export default connect(mapStateToProps)(Cart)


  const styles = StyleSheet.create({
    cartPage:{ justifyContent: 'space-between', height: '100%', },

    descView:{ height: 'auto', justifyContent: 'space-between', flexGrow: 1, marginTop:5, },

    priceView:{ height: 'auto', backgroundColor:'white', justifyContent: 'space-between', flexGrow: 1, width: '100%', marginBottom: 100, },

    inDesc:{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, },

    descText:{ marginLeft: 15, flexGrow: 2, },

    descItems:{ flexShrink: 2, },

    breaker:{ height: 25, backgroundColor: 'rgb(114, 137, 143)', justifyContent: 'center', },

    breakerText:{ color: 'rgb(25, 52, 65)', marginLeft: 12, fontWeight: '600', },

    button:{ flexDirection: 'row', backgroundColor: 'black', height: 45, width: '99%', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', marginBottom: 2, borderRadius: 5, },

     buttonText:{ color: 'white', fontWeight:'bold', marginLeft: '37%', fontSize: 17, },

     price:{ alignSelf: 'flex-end', color: 'white', fontWeight:'bold', },

     textBox:{ height: 55, width: '90%', borderColor: 'grey', borderWidth: 1, margin: 10, color: 'grey', },

  })
