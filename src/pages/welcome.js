import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, TouchableOpacity, TextInput, Animated, Alert} from 'react-native';
import firebase from 'firebase';
// import Cart from '../components/cart'
// import BottomButton from '../flexComponents/bottomButton'
// import {config} from '../../Firebase/firebaseConfig'
import { fetchAPIData, addItem, submitOrder, emptyCart, setTip, setCategory, setMenu, setCurrentItem, removeItem, yPos, updateName, toFirebase, clearFirebase, updateTable, addCustomPrice, subtractCustomPrice, removeCat, fullMenu, addCat, theOrder} from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Welcome extends React.Component {
  constructor(){
    super();
    this.state={
      zoom: new Animated.Value(0),
      timer: null,
      signIn: ()=>{return null},
      value: '',
      opacity: 0,
    }
    // this.animator=this.animator.bind(this)
    // this.signIn=this.signIn.bind(this)
  }

  // animator(){
  //     return Animated.timing(this.state.zoom, {duration: 300, toValue: 100})
  // }

  // signIn(){
  //   return(
  //     <View style={{height: 200, width: 200, alignSelf:'center', marginTop: 50, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <Text>Please Enter Your Name:</Text>
  //       <TextInput style={{borderColor: 'black', borderWidth: 1, height: '20%', width: '90%'}}></TextInput>
  //       <Button title='Ok' onPress={()=>{this.props.navigation.navigate('One')}}></Button>
  //     </View>
  //   )
  // }

  render(){
    return(
      
      <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
          
          <Text style ={{ fontSize: 100, fontFamily: 'Roboto', letterSpacing: 25, marginHorizontal: 'auto', marginTop: 100, position:'relative', left: 10, }}>BILL</Text>
          <Text style={{fontFamily: 'Roboto', letterSpacing: 7, padding: 10,  borderColor: '#212121', borderWidth: 2, marginVertical: 0, position:'relative', top:-15 }}>The Restaurant App</Text>
          
          <View style={{borderRadius:15, opacity: this.state.opacity, width: '80%', alignSelf:'center', marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
              <TextInput placeholder={'Your Name'} onSubmitEditing={ ()=>{this.props.f_updateName(this.state.value); this.props.navigation.navigate('One'); firebase.database().ref('Restaurant').child('testTable').update({[this.state.value]:{'name': this.state.value}})} } style={{fontFamily: 'Roboto',  backgroundColor: 'rgb(205,205,205)', borderBottomWidth: 1, borderBottomColor:'#212121', borderRadius:3, height: 'auto', width: '120%',  textAlign: 'left', paddingVertical:20, paddingHorizontal:10,}} onChangeText={(text) => {this.setState({value: text})}} value={this.state.value}></TextInput>
              {/* <TextInput placeholder={'Password'} style={{fontFamily: 'Avenir', backgroundColor: 'rgb(205,205,205)', height: 'auto', width: '120%',  textAlign: 'left', borderRadius:3, paddingVertical:20, paddingHorizontal:10,}}></TextInput> */}
          </View>

          <TouchableOpacity style={{position:'relative',  alignItems:'center', top: 30, width: '96.5%', backgroundColor: '#212121', paddingVertical: 20, height:'8%', borderRadius:3}} onPress={()=>{this.props.navigation.navigate('One'); firebase.database().ref('Restaurant').child('testTable').update({[this.state.value]:{'name': this.state.value}})}}>
              <Text style={{color: 'white', fontFamily: 'Roboto',  fontSize:19, fontWeight:'bold', letterSpacing:1.8, height:200, position:'relative', top:-7}}>SIGN IN</Text>
          </TouchableOpacity>
      </View>
    )
  }

  // <Text style={{fontFamily: 'Futura', fontSize: 17}}>Please Enter Your Name:</Text>

  // {setTimeout(()=>{this.props.navigation.navigate('One')}, 1000)}

  componentDidMount(){
    // firebase.initializeApp(config);
    // this.animator().start();
    
    // Alert.alert('Hey User!', 'Welcome to this test version of the app codenamed Bill. To accomodate most mobile screen dimensions, Bill is dislayed as it would look on an iPhone 5. The app is also displayed through an iFrame on a webpage, hence the compromised visual quality. \n \n That being said, enjoy.', [{text:"Let's Do It!", onPress: () => console.log('Ask me later pressed')}])
    
    
    setTimeout(()=>{this.setState({opacity: 1})}, 1500)

    // console.log(this.props.screenProps.o_firebase, 'ye')
    
    console.log(this.props)

  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    { f_fetchAPIData: fetchAPIData, f_addItem: addItem, f_removeItem: removeItem, f_submitOrder: submitOrder, f_emptyCart: emptyCart, f_setCategory: setCategory, f_setMenu: setMenu, f_fullMenu: fullMenu, f_setCurrentItem: setCurrentItem, f_updateName: updateName, f_yPos: yPos, f_setTip: setTip, f_toFirebase: toFirebase, f_clearFirebase: clearFirebase, f_updateTable: updateTable, f_addCustomPrice: addCustomPrice, f_subtractCustomPrice: subtractCustomPrice, removeCat: removeCat, addCat: addCat,
    }, dispatch)
}
function mapStateToProps(state){
  return { o_APIData: state.APIData, o_cart: state.cart, o_order: state.order, o_tip: state.tip, o_category: state.category, o_menu: state.menu, o_fullMenu: state.fullMenu, o_currentItem: state.currentItem, o_user: state.user, o_yPosition: state.yPosition, o_firebase: state.firebase, o_table: state.table, }
}

export default connect(mapDispatchToProps, mapStateToProps)(Welcome)
