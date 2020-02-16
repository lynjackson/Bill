import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity, TextInput, Picker} from 'react-native';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchAPIData, addItem, submitOrder, emptyCart, setTip, setCategory, setMenu, setCurrentItem, removeItem, yPos, updateName, toFirebase, clearFirebase, updateTable, addCustomPrice} from '../actions/index.js';


const BreakTest = (props)=>{

  return(
    <TouchableOpacity onPress={()=>{console.log(props.o_user.customTotal)}} key={props.o_user.customTotal}><Text key={props.o_user.customTotal}>{props.o_user.customTotal}</Text></TouchableOpacity>
  )
}

function mapStateToProps(state){
  return {
    o_APIData: state.APIData,
    o_cart: state.cart,
    // price: state.price,
    o_order: state.order,
    o_tip: state.tip,
    o_category: state.category,
    o_menu: state.menu,
    o_currentItem: state.currentItem,
    o_user: state.user,
    o_yPosition: state.yPosition,
    o_firebase: state.firebase,
    o_table: state.table,

  }
}
//Maps the action creators to component functions so they can be called on components

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
      f_setCurrentItem: setCurrentItem,
      f_updateName: updateName,
      f_yPos: yPos,
      f_setTip: setTip,
      f_toFirebase: toFirebase,
      f_clearFirebase: clearFirebase,
      f_updateTable: updateTable,
      f_addCustomPrice: addCustomPrice,

    }, dispatch)
}
//connects the mapped state object properties and action creators to props on this component
export default connect(mapStateToProps, mapDispatchToProps)(BreakTest)
