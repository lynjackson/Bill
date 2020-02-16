import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { withNavigation } from 'react-navigation';


export default class FoodItem extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    console.log('finalProduct', this.props.food)
    return (

<TouchableHighlight style={styles.touch} onPress={() => {this.props.navi('ScreenThree', { screen: this.props.food.name })}}>
        <View style={styles.itemz}>
            
        <View style={styles.textBox}>
          <Text style={styles.foodName}>{this.props.food.name}</Text>
          <Text style={styles.foodDescription}>{this.props.food.description}</Text>
          <Text style={styles.foodPrice}>{this.props.food.price}</Text>
        </View>

          <View style={styles.imgBox}>
            <Image style={styles.img} source={require('../img/BreakfastSandwich.jpg')}/>
          </View>
        </View>
      </TouchableHighlight>



    );
  }
}



  const styles = StyleSheet.create({
    // div surrounding all items
    unnecessary:{
      width: 'auto',
      height: 'auto',
    },
    touch:{
      width: 'auto',
      height: 'auto'
    },
    itemz: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      width: 'auto',
      height: 100,
      borderColor: 'rgba(114, 137, 143, 0.29)',
      borderWidth: .25,
    },
    textBox:{
      flexDirection: 'column',
      flexShrink: 2,
      justifyContent: 'space-around',
      height: 'auto'
    },
    foodName:{
      fontSize: 12,
      fontWeight: 'bold',
    },
    foodDescription:{
      fontSize: 12,
    },
    foodPrice:{
      color: 'green',
      fontWeight: 'bold',
      fontSize: 12,
    },
    imgBox:{
      height: 75,
      width: 75,
      marginRight: 5,
      marginTop: 5,
      marginLeft: 5,
    },
    img:{
      height: 75,
      width: 75,
    },
  })
