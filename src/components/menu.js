import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity, StatusBar, Switch} from 'react-native';
import { Hamburger } from '../flexComponents/hamburger'
import { StackNavigator } from 'react-navigation';
import { Font } from 'expo';
import {styles_catScroller} from '../containers/container_catScroller'
import {styles_menuCategories, categoryBuilder} from '../containers/container_menuCategories'
import {styles_menu} from '../containers/container_menu'
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { fetchAPIData, addItem, submitOrder, emptyCart, setTip, setCategory, setMenu, setCurrentItem, removeItem, yPos, updateName, toFirebase, clearFirebase, updateTable, addCustomPrice, subtractCustomPrice, removeCat, fullMenu, addCat, theOrder} from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const MenuCategories = (props) => {
    return(
      <View style={styles_menuCategories.unnecessary}>
        {categoryBuilder(props.screenProps.o_menu, props.navigate, props.screenProps.f_setCurrentItem, props.screenProps.f_setCategory, props.screenProps)}
      </View>
    )
}

// const TopCatScroller = (props) => {
//   return(
//     <View style={styles_catScroller.scroller}>
//       <ScrollView horizontal = {true}>
//         <View style={styles_catScroller.scrollContainer}>
//           {Object.keys(props.categories).map((index) => {return <TouchableHighlight key={index} onPress={()=>{props.refy.scrollTo({x: 0, y: props.screenProps.o_yPosition[index], animated: true})}} style={styles_catScroller.scr}><Text style = {styles_catScroller.text}>{index}</Text></TouchableHighlight>})}
//         </View>
//     </ScrollView>
//   </View>
//   )
// }

class TopCatScroller extends React.Component {
  constructor(props){
    super(props);
    this.state={opDisplay: 'none', switch: true, backgroundColor: '#212121', color: 'white'}
    this.opDisplay = this.opDisplay.bind(this);
  }

  opDisplay(){(this.state.opDisplay === 'none') ? this.setState({opDisplay:'flex', backgroundColor: 'white', color: '#212121'}): this.setState({opDisplay:'none', backgroundColor: '#212121', color: 'white'})}



  render(){
    const menuBoy = this.props.screenProps.o_fullMenu;
    return(
      <View id='category-view' style={{position: 'absolute', top:0, alignItems:'flex-end', zIndex:200, backgroundColor: '#212121', width:'auto', flexDirection:'column', justifyContent:'center', alignItems:'center',  alignSelf:'flex-end', }}>

          <TouchableOpacity id='category-touch' style={{borderColor:'white', backgroundColor:this.state.backgroundColor,  padding:7, alignSelf:'flex-end', justifyContent:'center', flexDirection:'row'}} onPress={this.opDisplay}>
            <Text id='category-text' style={{color:this.state.color,  fontSize:14, textAlign:'center', alignSelf:'center', fontFamily: 'Avenir', letterSpacing: 1.8, textTransform:'uppercase', position:'relative', top:1}}>{'Categories'}</Text>
          </TouchableOpacity>

          <View id='category-menu' style={{height: 'auto', width: 'auto', maxWidth:250, flexDirection:'column', position:'fixed', top:50, zIndex:20, backgroundColor: 'rgba(31,31,31,.9)', alignSelf:'center', display:this.state.opDisplay, justifyContent: 'center'}}>

            {Object.keys(menuBoy).map((index)=>{return(
              <View key={index} id='category-menu-option' style={{flexDirection:'row', justifyContent: 'flex-end', borderBottomColor: 'black', position:'relative', borderBottomWidth: .5, paddingVertical:10,}}>
                <View style={{width:'75%', paddingHorizontal: 10, marginRight: 10, borderRightColor: 'white', borderRightWidth:1}}><Text style={{fontFamily:'AvenirNext-Regular',fontSize:16, position:'relative', textAlign:'center', color:'white'}}>{index}</Text></View>
                <View style={{width:'25%', marginRight:3, flexDirection: 'column', justifyContent: 'center', }}><Switch style={{alignSelf:'center'}} value={(this.props.screenProps.o_menu[index]) ? true : false} key={this.props.screenProps.o_order} onValueChange={()=>{(this.props.screenProps.o_menu[index]) ? this.props.screenProps.removeCat(index, this.props.screenProps.o_menu):this.props.screenProps.addCat(index, this.props.screenProps.o_fullMenu, this.props.screenProps.o_menu); console.log(this.props.screenProps.o_menu); console.log(this.props.screenProps.o_fullMenu, 'full')}}/></View>
              </View>
            )})}

          </View>
    </View>
    )
  }
}

// <Ionicons name="ios-arrow-down" size={24} style={{color: 'white', alignSelf:'center', position:'relative', top: 2, left: 5}} />

export const tableTotal = (firebase)=>{
  return Object.values(firebase).map((index)=>{
    if(index.hasOwnProperty('order')){
      return index.order.reduce((acc, orderNumber)=>{
         return orderNumber.price + acc;
      }, 0)
    }
    else{
      return 0
    }
  })
}


class Menu extends Component {
  constructor(props){
    super(props);
    this.state={
      category: 'Appetizers'
    };
    this.menuSetter = this.menuSetter.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  menuSetter(array){
    let newMenu = {};
   array.forEach(function(catObject){
     let key = catObject.name
     newMenu[key] = catObject.entries.items.map(function(index){
       return {name: index.name, desc: index.description, category: catObject.name, price: Number(index.price), id: index.entryId, options: index.options}
     });
   })
     return newMenu;
  }

  handleScroll(event: Object){
    // console.log(event.nativeEvent.contentOffset.y);
    let y = event.nativeEvent.contentOffset.y;
    // console.log(this.props)
    const scrollPos = Object.values(this.props.screenProps.o_yPosition)
    // console.log(this.props.screenProps.o_yPosition)

    // const catty = //the property whose value is less than scroll position, but who's following property is more than scroll position

    if (y > this.props.screenProps.o_yPosition.Appetizers && y < this.props.screenProps.o_yPosition.Soups){
        this.setState({category: 'Appetizers'})
    }
    if (y > this.props.screenProps.o_yPosition.Soups && y < this.props.screenProps.o_yPosition.Salads){
        this.setState({category: 'Soups'})
    }
    if (y > this.props.screenProps.o_yPosition.Salads && y < this.props.screenProps.o_yPosition.Entrees){
        this.setState({category: 'Salads'})
    }
    if (y > this.props.screenProps.o_yPosition.Entrees && y < this.props.screenProps.o_yPosition.Sandwiches){
        this.setState({category: 'Entrees'})
    }
  }

  render() {
    const { navigate } = this.props.navigation.navigate
    // console.log(this.props)

    if (this.props.screenProps.o_menu === {}){
      return <Text>Waiting for menu...</Text>
    }
    // console.log(this.props.screenProps)
      return (
        <View id='menu-view' style={[styles.menuPage , {zIndex:-1}]}>
          <View id='header' style={[styles.header, {zIndex:100, justifyContent:'center'}]}>
            <TopCatScroller id='catgeory-menu' key={this.props.screenProps.o_order} category={this.state.category} screenProps={this.props.screenProps} refy={this.list} />
          </View>

        <StatusBar id='status-bar' barStyle="light-content" />

          <ScrollView id='menu-scrolly-part' ref={(ref) => this.list = ref} scrollEventThrottle={16} style={{position:'relative', zIndex: 10}}>
            <View style={styles_menu.items, {borderWidth: 1}}>
              <MenuCategories screenProps={this.props.screenProps} navigate={this.props.navigation.navigate}/>
            </View>
          </ScrollView>
        </View>
      )
  }
  // <ScrollView ref={(ref) => this.list = ref} onScroll={this.handleScroll} scrollEventThrottle={16}>

  componentDidMount(){
    const categoriesArray = this.props.screenProps.o_APIData.response.menu.menus.items[0].entries.items
    this.props.screenProps.f_setMenu(this.menuSetter(categoriesArray));
    this.props.screenProps.f_fullMenu(this.menuSetter(categoriesArray));
    console.log('menu reset')
    console.log(this.props.screenProps)
    // this.props.screenProps.f_updateTable(tableTotal(this.props.screenProps.o_firebase));
    this.props.screenProps.f_updateTable(tableTotal(this.props.screenProps.o_firebase).reduce((acc, price)=>{return price+acc}))

    console.log(this.props.screenProps.o_firebase, 'ya')

    Object.values(this.props.screenProps.o_firebase).map((index)=>{})

    console.log(this.props.screenProps.o_order, 'order')


    console.log(this.props.fireObject, 'yi')

    // firebase.database().ref('Restaurant/testTable').child('roulette').on('value', (snapshot)=>{this.props.navigation.navigate('Two'); console.log(this.props)})
    firebase.database().ref('Restaurant/testTable').child('roulette').once('value', (snapshot)=>{this.props.navigation.navigate('One'); console.log(this.state)})




    // console.log(tableTotal(this.props.screenProps.o_firebase))
    // console.log(Object.values(this.props.screenProps.o_firebase).map((index)=>{return index}))
    // tableTotal(){
    //   return Object.values(this.props.screenProps.o_firebase).map((index)=>{
    //     return index.order.reduce((acc, orderNumber)=>{
    //        return orderNumber.price + acc;
    //     }, 0)
    //   })
    // }



    // this.props.screenProps.f_updateTable((()=>{
    //   return Object.values(this.props.screenProps.o_firebase).map((index)=>{
    //     if (!index.order) {
    //       return 5000;
    //     }
    //     return index.order.reduce((acc, orderNumber)=>{
    //        return orderNumber.price + acc;
    //     }, 0)
    //   })
    // })())







    //transforms API menu object to more manageable menu object. Sets it to props.screenProps.o_menu.
  }
}
function mapStateToProps(state){
  return { o_APIData: state.APIData, o_cart: state.cart, o_order: state.order, o_tip: state.tip, o_category: state.category, o_menu: state.menu, o_fullMenu: state.fullMenu, o_currentItem: state.currentItem, o_user: state.user, o_yPosition: state.yPosition, o_firebase: state.firebase, o_table: state.table, }
}
//Maps the action creators to component functions so they can be called on components

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    { f_fetchAPIData: fetchAPIData, f_addItem: addItem, f_removeItem: removeItem, f_submitOrder: submitOrder, f_emptyCart: emptyCart, f_setCategory: setCategory, f_setMenu: setMenu, f_fullMenu: fullMenu, f_setCurrentItem: setCurrentItem, f_updateName: updateName, f_yPos: yPos, f_setTip: setTip, f_toFirebase: toFirebase, f_clearFirebase: clearFirebase, f_updateTable: updateTable, f_addCustomPrice: addCustomPrice, f_subtractCustomPrice: subtractCustomPrice, removeCat: removeCat, addCat: addCat,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)

const styles = StyleSheet.create({
  menuPage: { backgroundColor: '#212121', justifyContent: 'flex-start', alignItems: 'stretch', height: 'auto', width: '100%',  },
  header:{ height:'6.5%', width:'100%', marginBottom:0, },
})
