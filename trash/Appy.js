import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import ItemPage from './itemPage.js';
import { createStackNavigator } from 'react-navigation';

//import { Provider } from 'react-redux';
//import { connect } from 'react-redux';
//import store from './store.js';
import Menu from './menu.js';


export default class Appy extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      results: 'nothing',
      load: 'naw'
    };
  }

  render() {
    if (this.state.load === 'naw'){
      return(
        <View style={styles.wait}><Text>'Nigga Wait!'</Text></View>
      )
    }
    else{
    return (
      //<Provider store={store}>
        <View style={styles.container}>
          <Menu menu={this.state.results}/>
        </View>
      //</Provider>
    );
  }
}

render() {
  if (this.state.load === 'nae'){
    return(
      <View style={styles.wait}><Text>'Nigga Wait!'</Text></View>
    )
  }
  else{
  return (
    //<Provider store={store}>
      <View style={styles.container}>
        <ItemPage />
      </View>
    //</Provider>
  );
}
}


  componentDidMount(){
    fetch('#', {
      headers: {
        'user-key': '276bd7f40b392f21cf03e6f4796431cd'
      }
    })
          .then((resp) => resp.json())
          .then((data) => {
            this.setState({results: data});
            this.setState({load: 'yep',});
            console.log(this.state);
          });
    console.log(this.state);
  }
}



const styles = StyleSheet.create({
  container: {
    //flexDirection: 'column',
    backgroundColor: 'grey',
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    height: 'auto',
    //width: 'auto',
  },
  wait:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: 40,
  }
});
