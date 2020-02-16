import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity, TextInput, Picker} from 'react-native';
import Breaker from '../flexComponents/breaker';

import BottomButton from '../flexComponents/bottomButton';
import PriceBreakdown from '../flexComponents/priceBreakdown';
import { addUp, listItemCreator } from '../helperFunctions/pureFunctions';

export default class YourStuff extends Component{
  constructor(props){
    super(props);
    this.orderItemCreator = this.orderItemCreator.bind(this)
    this.mapster = this.mapster.bind(this)
  }


  totalAdder(){
    let total = 0;
    for (i = 0; i < this.props.screenProps.o_order.length; i++){
      total += this.props.screenProps.o_order[i].price
    }
    return total
  }

  orderItemCreator(foodItemObject){
    if (this.props.screenProps.o_order.length === 0){
      return 'getting order'
    }
    return(
      <View style={styles.inDesc}>
        <Text style={styles.descItems}>'1X'</Text>
        <Text style={styles.descText}>{foodItemObject.name}</Text>
        <Text style={styles.descPrice}>${foodItemObject.price.toFixed(2)}</Text>
      </View>
    )
  }

  mapster(orderArray, funky){
    return orderArray.map(funky)
  }

  render(){

    const order = this.props.screenProps.o_order
    const total = addUp(order).toFixed(2)
    const tax = (addUp(order) * .07).toFixed(2);
    const subtotal = ((addUp(order) * .07) + (addUp(order))).toFixed(2);
    const tip = ((this.props.screenProps.o_tip / 100) * (total)).toFixed(2);

    return(
      <View style={styles.payPage}>
      <View>

      <Breaker value='Your Stuff' />
      <View style={styles.descView}>
        {listItemCreator(order)}
      </View>

      <PriceBreakdown lineOneText={'Group Total'} lineTwoText={'Your Total'} lineThreeText={'Your Tax'} lineFourText={'Your Subtotal'} lineOne={total} lineTwo={total} lineThree={tax} lineFour={subtotal}/>

      <Tipper screenProps={this.props.screenProps} tip={tip}/>

      <BottomButton navigate={this.props.navigation.navigate} buttonText={`Pay $ ${((addUp(this.props.screenProps.o_order) * .07) + (addUp(this.props.screenProps.o_order)) + (this.totalAdder() * (this.props.screenProps.o_tip / 100))).toFixed(2)}`}/>

      </View>

      </View>

    )
  }
  shouldComponentUpdate(){
    return true;
  }
}


const styles = StyleSheet.create({
  payPage:{
    height: '100%',
  },
  priceView:{
    height: 'auto',
    //borderBottomColor: 'black',
    //borderBottomWidth: 1,
    backgroundColor:'white',
    justifyContent: 'space-between',
    flexGrow: 1,
    //width: '100%',
    margin: 10,
  },
  descView:{
    height: 'auto',
    //borderBottomColor: 'black',
    //borderBottomWidth: 1,
    backgroundColor:'white',
    justifyContent: 'space-between',
    flexGrow: 1,
    margin: 10,
  },
  inDesc:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    //marginBottom: 20,
  },
  yourShare: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    fontSize: 100,
  },

  descText:{
    marginLeft: 15,
    //width: 220,
    flexGrow: 2,
    //width: 200,
  },
  descItems:{
    //marginLeft: 15,
    flexShrink: 2,
    //width: 200,
  },
  descPrice:{
    //marginLeft: 50,
  },
  tipPayContainer:{
    flexDirection: 'column',
    justifyContent: 'flex-end',
    //borderColor: 'black',
    //borderWidth: 1,
    flexGrow: 1,
  },
  tipContainer:{
    backgroundColor: 'white',
  },
  tipAmount:{
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tipLine:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    //width: '100%'
  },
  tipButton:{
    width: 'auto',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upDownButtons:{
    fontSize: 40
  },
  tipButtonText:{
    flexWrap: 'wrap',
    padding: 15,
  },
  payButton:{
    height: 50,
    flexDirection: 'row',
    //borderBottomColor: 'black',
    //borderBottomWidth: 1,
    backgroundColor:'green',
    justifyContent: 'space-around',
    margin: 10,
    alignItems: 'center',
  },
  yourShareText: {
    fontSize: 20,
    color: 'white',
  },



})
