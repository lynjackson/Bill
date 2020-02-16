//this is the content page
import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity} from 'react-native';
import ScrollStuff from './scrollStuff.js';
import Items from './items.js';
//import DrawerNav from './drawerNav.js';
import { StackNavigator } from 'react-navigation';

export default class Order extends Component {
  constructor(props){
    super(props);

    //this.state = {results: 'naw', load: 'naw', current: ''}
  }
  static navigationOptions = {
    title: "Order"
  }



// mapper(items, costs){
//   return this.map(items, costs);
// }


  render() {
    //const { navigate } = this.props.navigation
    console.log(this.props)

    return (
      <View style={styles.orderPage}>
        <ScrollView>
          <View style={styles.breaker}><Text style={styles.breakerText}>Your Order</Text></View>
          <View style={styles.descView}>
          <View style={styles.inDesc}>
            <Text style={styles.descItems}>1X</Text>
            <Text style={styles.descText}>Something</Text>
            <Text style={styles.descPrice}>$3.50</Text>
          </View>

          <View style={styles.breaker}><Text style={styles.breakerText}>Add a Note</Text></View>
          <View style={styles.descView}></View>
          <View style={styles.breaker}><Text style={styles.breakerText}>Item Special Selections</Text></View>
          <View style={styles.descView}>
            <View style={styles.inDesc}>
                <Text>Subtotal</Text>
                <Text>'$3.50'</Text>
            </View>
            <View style={styles.inDesc}>
                <Text>Tax</Text>
                <Text>'$0.00'</Text>
            </View>
            <View style={styles.inDesc}>
                <Text>Total</Text>
                <Text>'$3.50'</Text>
            </View>
          </View>
          </View>
      </ScrollView>
        <TouchableOpacity style={styles.button} onPress={()=>{console.log(this.props.propers)}}>
          <Text style={styles.buttonText}>Submit Order</Text>
          </TouchableOpacity>
    </View>
      );
    }
  }

  const styles = StyleSheet.create({
    orderPage:{
      justifyContent: 'flex-end',
      height: '85%',
    },

    descView:{
      height: 'auto',
      //borderBottomColor: 'black',
      //borderBottomWidth: 1,
      backgroundColor:'white',
      justifyContent: 'space-around',
      flexGrow: 1,

    },
    inDesc:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 20,
      marginBottom: 20,
    },
    descText:{
      marginLeft: 15,
      width: 220,

      //width: 200,
    },
    descItems:{
      marginLeft: 15,
      //flexShrink: 1,
      //width: 200,
    },
    descPrice:{
      marginLeft: 50,
    },
    breaker:{
      height: 25,
      backgroundColor: 'rgb(114, 137, 143)',
      justifyContent: 'center',
    },
    breakerText:{
      color: 'rgb(25, 52, 65)',
      marginLeft: 12,

    },
    button:{
      flexDirection: 'column',
      backgroundColor: 'rgb(25, 52, 65)',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
     buttonText:{
       color: 'white',
       fontWeight:'bold',
     },
     price:{
       alignSelf: 'flex-end',
       color: 'white',
       fontWeight:'bold',
     },

  })
