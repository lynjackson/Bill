import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native';
import {gStyle, appStyle} from '../containers/styles'
import Breaker from '../flexComponents/breaker'
import { Ionicons } from '@expo/vector-icons';
import Item from '../flexComponents/item';
import BottomButton from '../flexComponents/bottomButton';
import NoteBox from '../flexComponents/noteBox'

class ItemPage extends Component {

  constructor(props){
    super(props)
    this.state = {quantity: 1}
    this.repeater = this.repeater.bind(this)
    this.options = this.options.bind(this)
    // this.randomImage = this.randomImage.bind(this)
  }

  repeater(array, navigate, screenProps){
    return array.map((item)=>{
      return (
      <TouchableHighlight onPress={()=>{this.props.screenProps.f_setCurrentItem(item); this.props.screenProps.f_setCategory(item.category); this.props.navigation.navigate('ItemPage')}} key={item.name} style={{borderColor: '#212121', borderWidth:1, borderRadius: 10, height: 170, width: 170, margin: 5, justifyContent:'flex-start',  paddingTop: 5, paddingBottom:20, overflow:'hidden'}}>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft:5, paddingRight:5, }}>
          <Text style={{fontWeight: 'bold', width: '80%', fontSize:18, flexWrap: 'wrap'}}>{item.name}</Text>
          <Text style={{color: 'green', width: '30%', fontWeight: 'bold', fontSize:18}}>${item.price}</Text>
        </View>
        <View style={{margin: 5, overflow: 'hidden', height:'auto'}}><Text style={{color: 'black', paddingLeft: 5}}>{item.desc}</Text></View>
        </View>
      </TouchableHighlight>
    )
    })
  }

// <Item key={item.name} foodItem={item} category={array} navi={navigate} screenProps={screenProps}/>
  options(){
    if (this.props.screenProps.o_currentItem.options.length !== 0){
      return(
        <View><Breaker value={'Item Options'}/><View style={{height: 'auto'}}></View></View>
      )
    }
  }

  // randomImage(array){
  //   return require(array(4))
  // }


  render(){
    const {navigate} = this.props.navigation;
    //category is an object with the category's name under the name property, and the category's items under .entries.items
    const currentItem = this.props.screenProps.o_currentItem;
    const itemName = this.props.screenProps.o_currentItem.name;
    const itemDesc = this.props.screenProps.o_currentItem.desc;
    const itemPrice = this.props.screenProps.o_currentItem.price;

    const imageArray= [ '../images/1.jpg', '../images/2.jpg', '../images/3.jpg', '../images/4.jpg', '../images/5.jpg', '../images/6.jpg', '../images/7.jpeg', '../images/8.jpg', '../images/9.jpg', ]

    return(
      <View style={[appStyle.page], {paddingBottom: 6}}>

          <View id='header' style={[appStyle.header, {alignItems:'flex-start', paddingHorizontal:'2.5%'}]}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Menu')}} style={{width: '30%', position:'relative', }}>
              <View style={{flexDirection:'row'}}><Ionicons name="ios-arrow-back" size={40} style={{color:'white'}}/>
              <Text style={{fontSize: 17, alignSelf: 'center', position:'relative', left: 10, color:'white', fontFamily:'Avenir', letterSpacing:1.8,}}>MENU</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View id='page' style={{justifyContent: 'space-between', flexDirection:'column',  position:'relative', height: '93.5%', width: '96.5%', marginHorizontal: '.5%', alignSelf:'center'}}>


              <View id='item-text' style={{width: '90%', height: 'auto', justifyContent: 'flex-start', position:'relative', top: '4%', alignSelf:'center'}}>
                <Text style={{fontSize: 20,  fontFamily: 'Avenir-Heavy', marginBottom:25, textTransform:'uppercase', textAlign:'center'}}>{itemName}</Text>
                <Text style={{fontSize: 16,  fontFamily: 'Avenir', textAlign:'center'}}>{itemDesc}</Text>
              </View>


            <View id='images' style={{justifyContent: 'space-between', flexDirection: 'row', height:'20%', width: '100%', position:'relative', marginTop:'3%' }}>
              <Image style={{width: '33%', height: '100%', borderColor:'#212121', borderWidth:1, borderRadius:3}} source={require(`../images/crab1.jpg`)}/>
              <Image style={{width: '33%', height: '100%', borderColor:'#212121', borderWidth:1, borderRadius:3}} source={require(`../images/crab2.jpg`)}/>
              <Image style={{width: '33%', height: '100%', borderColor:'#212121', borderWidth:1, borderRadius:3}} source={require(`../images/crab3.jpg`)}/>
            </View>

            <View id='review-line' style={{width: '90%', position:'relative', alignItems:'center', alignSelf:'center', height: 30, flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{flexDirection:'row', width: 'auto', justifyContent: 'flex-start',}}>
                  <Text style={{fontSize: 18, color: 'blue', marginHorizontal:10, fontFamily:'Avenir'}}>Reviews</Text>
                </View>
                <View style={{flexDirection:'row',  width: 'auto', justifyContent: 'flex-start', paddingRight: 10}}>
                  <Text style={{fontSize: 28}}>4.3</Text><Ionicons name="ios-star" size={24} style={{position:'relative', top:2}} />
                </View>
                <View style={{flexDirection: 'row', width: 'auto', justifyContent: 'center'}}>
                  <Image style={{width: 60, height: 30, marginHorizontal:10}} source={require(`../images/yelp.png`)}/>
                </View>
            </View>

            <View id='required-selections' style={{marginBottom: 0, borderColor:'#212121', borderWidth:1, borderRadius:3,  height: '30%', width: '100%', backgroundColor:'rgb(223,223,223)', justifyContent:'flex-start'}}>
              <Text style={{alignSelf: 'center', fontSize: 16, color:'grey', position:'relative', top:20, fontFamily: 'Avenir-Light'}}>Required Selection Area</Text>
            </View>


            <BottomButton buttonText={'+CART'} buttonPrice={(itemPrice * this.state.quantity).toFixed(2)} doThis={() => {navigate('Menu'); for(let i = 0; i < this.state.quantity; i++){this.props.screenProps.f_addItem((this.props.screenProps.o_currentItem))}}}/>
          </View>


      </View>
    )
  }

}

// <View style={{alignItems: 'center', justifyContent:'space-between', width: 'auto', height:'30%', flexDirection: 'column', position:'relative', top:20,}}>
//   <TouchableHighlight onPress={()=>{this.setState({quantity: String(Number(this.state.quantity) + 1)})}}><Ionicons name="ios-add-circle" size={40} /></TouchableHighlight>
//   <TextInput style={styles.textBox} defaultValue={String(this.state.quantity)} autoFocus={false}/>
//   <TouchableHighlight onPress={()=>{this.setState({quantity: String(Number(this.state.quantity) - 1)})}}><Ionicons name="ios-remove-circle" size={40} /></TouchableHighlight>
// </View>

// <View style={{ alignItems: 'center', justifyContent:'space-between', width: '40%', flexDirection: 'row',alignSelf:'center' }}>
//   <TouchableHighlight onPress={()=>{this.setState({quantity: String(Number(this.state.quantity) - 1)})}}><Ionicons name="ios-remove-circle" size={40} /></TouchableHighlight>
//   <TextInput style={styles.textBox} defaultValue={String(this.state.quantity)} autoFocus={false}/>
//   <TouchableHighlight onPress={()=>{this.setState({quantity: String(Number(this.state.quantity) + 1)})}}><Ionicons name="ios-add-circle" size={40} /></TouchableHighlight>
// </View>





export default ItemPage;

const styles = StyleSheet.create({

topDiv:{},

itemAndCounterRow:{ height: 'auto', marginTop: 0, },

itemDiv:{ width: '80%', justifyContent: 'center', paddingLeft: 10, },

itemName:{ fontSize: 35,  fontFamily: 'AvenirNext-Regular'},

itemDescription:{ fontSize: 18, width: '100%', paddingRight: 8, marginBottom: 20, marginTop: 5, fontFamily: 'Avenir'},

counterDiv: { alignItems: 'center', justifyContent:'space-between', width: 'auto', height:'40%', flexDirection: 'column', position:'relative', top:20, },

similarDiv:{ height: 'auto',   flexDirection: 'row', alignItems: 'center',  marginTop: 20},

button:{ flexDirection: 'row', backgroundColor: 'black', height: 45, width: '99%', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', marginBottom: 2, borderRadius: 5, },

buttonText:{ color: 'white', fontWeight:'bold', marginLeft: '37%', fontSize: 17, },

textBox:{ width: 40, height: 40, alignSelf: 'center', borderRadius: 5, textAlign: 'center', fontSize: 30, marginLeft: 8, marginRight: 8, },
})
