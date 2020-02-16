//this is the content page
import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView,
  TouchableHighlight, Image, TouchableOpacity, TextInput, Animated} from 'react-native';
import Breaker from '../flexComponents/breaker';
import {listItemCreator} from '../helperFunctions/pureFunctions';
import PriceBreakdown from '../flexComponents/priceBreakdown'
import BottomButton from '../flexComponents/bottomButton'
import { StackNavigator } from 'react-navigation';
import {gStyle} from '../containers/styles'

export class TipOption extends Component {
  constructor(props){
    super(props);
    this.state={
      style:{
        backgroundColor: 'white',
        color: 'black'
      },
      tipper:{
      fifteen: {
        selected: false,
        button: {backgroundColor:'white'},
        text: {color: 'black'}
      },
      eighteen: {
        selected: false,
        button: {backgroundColor:'white'},
        text: {color: 'black'}
      },
      twenty: {
        selected: false,
        button: {backgroundColor:'white'},
        text: {color: 'black'}
      },
      cash: {
        selected: false,
        button: {backgroundColor:'white'},
        text: {color: 'black'}
      },
    }
    }
  }
  render(){
    return(
      <TouchableOpacity onPress={()=>{this.setState({style: {backgroundColor: 'black', color: 'white'}})}}style={[styles.tipButton, this.state.style]}><Text style={[this.state.style, {fontSize: 10}]}>15%</Text><Text style={[this.state.style, {fontSize: 18}]}>$3.25</Text></TouchableOpacity>
    )
  }
}

export class Tipper extends Component {
constructor(props){
  super(props);
  this.state = {
    tipper:{
      selected:{backgroundColor: 'black', color:'white'},
      unselected:{backgroundColor: 'white', color:'black'},

      fifteen: {
        selected: false,
        button: {backgroundColor:'white'},
        text: {color: 'black'}
      },
      eighteen: {
        selected: false,
        button: {backgroundColor:'white'},
        text: {color: 'black'}
      },
      twenty: {
        selected: false,
        button: {backgroundColor:'white'},
        text: {color: 'black'}
      },
      cash: {
        selected: false,
        button: {backgroundColor:'white'},
        text: {color: 'black'}
      },
    },
    animValue: new Animated.Value(0)
  }

  this.tippy = this.tippy.bind(this)
  // this.tipSelect = this.tipSelect.bind(this)
}


tippy(percent){
  const initialState ={
    fifteen: {
      selected: false,
      button: {backgroundColor:'white'},
      text: {color: 'black'}
    },
    eighteen: {
      selected: false,
      button: {backgroundColor:'white'},
      text: {color: 'black'}
    },
    twenty: {
      selected: false,
      button: {backgroundColor:'white'},
      text: {color: 'black'}
    },
    cash: {
      selected: false,
      button: {backgroundColor:'white'},
      text: {color: 'black'}
    }
  }
return this.setState((prevState)=>{
  return {
    tipper:{
      ...initialState,
      [percent]: {
        button: {backgroundColor: 'black'},
        text: {color: 'white'}
      }
    }

      }
})
}

render(){

  const orderTotal = this.props.payTotal
  const orderTax = orderTotal * .07
  const fifteenPercent = ((orderTotal + orderTax) * .15)
  const eighteenPercent = ((orderTotal + orderTax) * .18)
  const twentyPercent = ((orderTotal + orderTax) * .20)

  return (
    <Animated.View style={{alignSelf:'center', width: '99%', height: 45,  bottom: 8, flexDirection: 'row',  borderRadius: 8, backgroundColor: 'white'}}>

     <TouchableOpacity onPress={()=>{this.tippy('fifteen'); this.props.screenProps.f_setTip(fifteenPercent)}}style={[styles.tipButton, this.state.tipper.fifteen.button]}><Text style={[this.state.tipper.fifteen.text, {fontSize: 10}]}>15%</Text><Text style={[this.state.tipper.fifteen.text, {fontSize: 18}]}>{`$${fifteenPercent.toFixed(2)}`}</Text></TouchableOpacity>

     <TouchableOpacity onPress={()=>{this.tippy('eighteen'); this.props.screenProps.f_setTip(eighteenPercent)}}style={[styles.tipButton, this.state.tipper.eighteen.button]}><Text style={[styles.tipText, this.state.tipper.eighteen.text, {fontSize: 10}]}>18%</Text><Text style={[this.state.tipper.eighteen.text, {fontSize: 18}]}>{`$${eighteenPercent.toFixed(2)}`}</Text></TouchableOpacity>

     <TouchableOpacity onPress={()=>{this.tippy('twenty'); this.props.screenProps.f_setTip(twentyPercent)}}style={[styles.tipButton, this.state.tipper.twenty.button]}><Text style={[styles.tipText, this.state.tipper.twenty.text, {fontSize: 10}]}>20%</Text><Text style={[this.state.tipper.twenty.text, {fontSize: 18}]}>{`$${twentyPercent.toFixed(2)}`}</Text></TouchableOpacity>

     <TouchableOpacity onPress={()=>{this.tippy('cash'); this.props.screenProps.f_setTip(0)}}style={[styles.tipButton, this.state.tipper.cash.button]}><Text style={[styles.tipText, this.state.tipper.cash.text, {fontSize: 10}]}>Cash</Text><Text style={[this.state.tipper.cash.text, {fontSize: 18}]}>Tip</Text></TouchableOpacity>

     <TouchableOpacity style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', }}><Text style={{fontSize: 14, color: 'black'}}>Custom Amount</Text></TouchableOpacity>
    </Animated.View>
  )
}

}

const styles = StyleSheet.create({
  tipButton: {width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', borderColor: 'grey', borderRightWidth: .5},
  tipText: {color: 'black'}
})
