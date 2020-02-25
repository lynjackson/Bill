import React from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity, StatusBar, Switch} from 'react-native';

import firebase from 'firebase';
import { fetchAPIData, addItem, submitOrder, emptyCart, setTip, setCategory, setMenu, setCurrentItem, removeItem, yPos, updateName, toFirebase, clearFirebase, updateTable, addCustomPrice, subtractCustomPrice, removeCat, fullMenu, addCat, theOrder} from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Meny extends React.Component {
    render(){
        return(
            <Text>Yea</Text>
        )
    }
}

export default Meny;