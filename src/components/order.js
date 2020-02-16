//this is the content page
import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView,
  TouchableHighlight, Image, TouchableOpacity, TextInput, Animated} from 'react-native';
import Breaker from '../flexComponents/breaker';
import {listItemCreator} from '../helperFunctions/pureFunctions';
import BottomButton, {PayButton, CheckoutButton} from '../flexComponents/bottomButton'
import { StackNavigator } from 'react-navigation';
import {gStyle, appStyle} from '../containers/styles';
import {Tipper} from './tipper';
import PayOptionsScreen from './payOptions';
import {SplitBreakdown, PriceBreakdown} from '../flexComponents/priceBreakdown';
import {OrderListItem} from '../flexComponents/listItem';
import OrderDropdown from '../flexComponents/orderDropdown'
import firebase from 'firebase';
import { connect } from 'react-redux'
import { fetchAPIData, addItem, submitOrder, emptyCart, setTip, setCategory, setMenu, setCurrentItem, removeItem, yPos, updateName, toFirebase, clearFirebase, updateTable, addCustomPrice, subtractCustomPrice, removeCat, fullMenu, addCat, updatePrice} from '../actions/index.js';
import { bindActionCreators } from 'redux';

class Order extends Component {
  constructor(props){
    super(props);
    this.state ={
      tip: ()=>{return null},
      payUp: ()=>{return null},
      breakdown: (subTotal, tax)=>{return <PriceBreakdown lineOneValue={subTotal}lineTwoValue={tax.toFixed(2)} subtotal={tax.toFixed(2)}/>},
      button: () => {return <CheckoutButton buttonPrice={this.props.screenProps.o_order.reduce((item)=>{return acc + item.price}, 0)} doThis={()=>{return this.payOptionState()}} /> },
      dropdown: new Animated.Value(0),
      style:{display:'none'},
      counter: 0
    }

    this.totalAdder = this.totalAdder.bind(this);
    // this.payOptionState = this.payOptionState.bind(this);
    // this.splitState = this.splitState.bind(this);
    this.animator = this.animator.bind(this);
    this.getFromFirebase = this.getFromFirebase.bind(this);
    this.payOptionToggle = this.payOptionToggle.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.orderReader = this.orderReader.bind(this);
    this.tableTotal = this.tableTotal.bind(this);

  }

  payOptionToggle(){
    return (this.state.style.display === 'none') ? this.setState({style:{display:'flex'}}) : this.setState({style:{display:'none'}})
  }

  clearTable(){
    firebase.database().ref(`Restaurant/testTable`).set({})
  }

// Get a database reference to our posts
getFromFirebase(){
  firebase.database().ref('Restaurants/Larrys/Tables/Table1/26/0').on("value", function(snapshot) {

  }, function (errorObject) {

  });
}

  animator(itemCount){
      if (this.state.dropdown._value === 0){
          return Animated.timing(this.state.dropdown, {duration: 300, toValue: (itemCount*50)})
      }
      else{
          return Animated.timing(this.state.dropdown, {duration: 300, toValue: 0})
          //return Animated.timing(this.state.dropdown, {duration: 200, toValue: 0})
      }
  }

totalAdder(acc, itemObj){
  return acc + itemObj.price
}

orderReader(){
  if(this.props.screenProps.o_firebase === null){
    return <View><Text>No orders</Text></View>
  }
  else{
    return(
      Object.keys(this.props.screenProps.o_firebase).map((user)=>{return <OrderDropdown key={user} orders={(this.props.screenProps.o_firebase[user].order) ? this.props.screenProps.o_firebase[user].order : []} screenProps={this.props.screenProps} startVal={0} name={user}/>})
    )
  }
}

tableTotal(){
  return Object.values(this.props.screenProps.o_firebase).map((index)=>{
    return index.order.reduce((acc, orderNumber)=>{
       return orderNumber.price + acc;
    }, 0)
  })
}

  render() {
    const { navigate } = this.props.navigation
    const order = this.props.screenProps.o_order
    const subTotal = order.reduce(this.totalAdder, 0)
    const tax = subTotal * .07
    const total = subTotal + tax
    const orderLength = listItemCreator(this.props.order, OrderListItem).length

    // setTimeout(()=>{console.log(this.tableTotal())}, 2000)

    console.log(order, 'order')
    console.log(this.props.screenProps.o_firebase, 'firebase')


      const base = Object.values(this.props.screenProps.o_firebase).map((person)=>{
        if (person.hasOwnProperty('order')){
          if (person.order.length > 1){
            return person.order.reduce((acc, item)=>{
               return item.price + acc;
          }, 0)
        }
           else if (person.order.length === 1){return person.order[0].price}
        }
        else{
          return 0
        }
      })

      const base3 = base.filter((price)=>{
        return (typeof price === 'number')
      })

      console.log(base3, 'base3')

      const basey = base.reduce((acc, index)=>{
        if (Array.isArray(index)){
          if(index.length ===1){
            return index[0] + acc
          }
        }
      })

      // this.props.f_updateTable({price:base3})
      console.log(this.props.screenProps.o_table, 'table')





      console.log(basey, 'basey')



      console.log(base, 'base')



    return (
     <View id='page' key={this.props.screenProps.o_firebase} style={[appStyle.page, {width:'100%', alignSelf:'center', paddingBottom:14,}]} blurRadius={1}>
        <View style={appStyle.header}><Text style={{color: 'white', alignSelf:'center', fontFamily: 'Avenir', fontSize: 17, letterSpacing:4, fontWeight:'bold'}}>The Table</Text></View>
         <View id='orders-list' style={{height:'78.5%', width:'96.5%', alignSelf:'center'}}>
           <ScrollView>{this.orderReader()}</ScrollView>
         </View>
         <TouchableOpacity title='Clear' onPress={()=>{this.clearTable()}} style={{position:'relative', borderColor: 'black', borderWidth:1, borderRadius: 5, alignItems: 'center', paddingVertical:5, paddingHorizontal:5, alignSelf:'center', justifyContent: 'center', marginBottom:10}}><Text style={{fontSize: 17, fontFamily: 'Avenir'}}>Clear</Text></TouchableOpacity>
         <View style={{width:'96.5%', alignSelf:'center', marginBottom:6, }}><CheckoutButton buttonPrice={`$${(base3.length > 0)?base3.reduce((acc, price)=>{return price + acc}):'0'}`} payOptionToggle={()=>{this.payOptionToggle()}}/></View>
         <PayOptionsScreen payOptionToggle={this.payOptionToggle} navigate={this.props.navigation.navigate} style={this.state.style}/>
     </View>
      );
    }
    componentDidMount(){
      firebase.database().ref('Restaurant/testTable').on('value', ()=>{this.setState({counter: this.state.counter +1})})
      // console.log(firebase.database().ref(`Restaurant/testTable/${this.props.screenProps.o_user}`).snapshot)

    }
  }

  // <OrderDropdown key={this.props.order} orders={this.props.order} screenProps={this.props.screenProps} startVal={(isNaN(orderLength)) ? 0 : orderLength*50} name={'You'}/>
  // <OrderDropdown orders={this.props.order} screenProps={this.props.screenProps} startVal={0} name={'Lyn'}/>
  // <OrderDropdown orders={this.props.order} screenProps={this.props.screenProps} startVal={0} name={'Scoe'}/>
  // <OrderDropdown orders={this.props.order} screenProps={this.props.screenProps} startVal={0} name={'Lee'}/>
  // <OrderDropdown orders={this.props.order} screenProps={this.props.screenProps} startVal={0} name={'Luc'}/>

  function mapStateToProps(state){
    return {
      order: state.order,
      totalPrice: state.totalPrice,

    }
  }

  function mapDispatchToProps(dispatch){
    return bindActionCreators(
      {
        f_fetchAPIData: fetchAPIData,
        f_addItem: addItem,
        f_removeItem: removeItem,
        f_submitOrder: submitOrder,
        f_emptyCart: emptyCart,
        f_setCategory: setCategory,
        f_setMenu: setMenu,
        f_fullMenu: fullMenu,
        f_setCurrentItem: setCurrentItem,
        f_updateName: updateName,
        f_yPos: yPos,
        f_setTip: setTip,
        f_toFirebase: toFirebase,
        f_clearFirebase: clearFirebase,
        f_updateTable: updateTable,
        f_addCustomPrice: addCustomPrice,
        f_subtractCustomPrice: subtractCustomPrice,
        removeCat: removeCat,
        addCat: addCat,
        f_updatePrice: updatePrice,

      }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Order)

  const styles = StyleSheet.create({
    hidden:{position: 'absolute', height:'auto', borderColor: 'black', width: '95%',  left: 10, right: 'auto', top: 500, marginBottom: 0, flexDirection: 'row', justifyContent: 'space-between', },

    payOption:{height: 80, width: '25%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRightWidth: .5, borderRightColor: 'black',},

    cartPage:{justifyContent: 'space-between', paddingHorizontal: 3, height: '100%', opacity: 1},

    itemHeader:{fontSize: 20, fontWeight: 'bold', color: 'white'},

    payText: {textAlign:'center', fontSize: 20, fontFamily: gStyle.appFont}

  })
