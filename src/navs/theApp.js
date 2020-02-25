import React, { Component } from 'react'
import { createStackNavigator, createDrawerNavigator} from 'react-navigation';
import { connect } from 'react-redux'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { bindActionCreators } from 'redux';
import { fetchAPIData, addItem, submitOrder, emptyCart, setTip, setCategory, setMenu, setCurrentItem, removeItem, yPos, updateName, toFirebase, clearFirebase, updateTable, addCustomPrice, subtractCustomPrice, removeCat, fullMenu, addCat} from '../actions/index.js';
// import { drawerContent } from './drawerContent';
import {inAppStackNav, TabNav} from './allNavs'
// import Scanny from '../flexComponents/qrScans';
import firebase from 'firebase'
// import signUp from '../components/signUp'
// import signIn from '../components/signIn'
// import TableRequest from '../components/TableRequest'
import {config} from '../../Firebase/firebaseConfig'
// import {styles_menu, menuSetter} from '../containers/container_menu'
import Welcome from '../pages/welcome';
// import {tableTotal} from '../components/menu'
// import {rouletteDetector} from '../helperFunctions/pureFunctions'
// import {RouletteResult} from '../components/rouletteResult';
// import {Done} from '../components/done'

// import PaymentPage, {YourStuffPay, SplitPay, PickPay, RoulettePay, TreatPay} from '../components/payPages/paymentPage';

class TheApp extends Component {
  constructor(props){ super(props); this.state={ test:null, fireObject: null} }

  render(){ return( <View style={{borderWidth: 1, borderColor:'red', height: '100%', width: '100%'}}><FullAppNav /></View> ) }
  
componentDidMount(){
    if (!firebase.apps.length){
    firebase.initializeApp(config);
    firebase.database().ref('Users').update({hey: 'hey'});
  }
  
    const fetcher = async () => this.props.f_fetchAPIData();

    // firebase.database().ref('Restaurant/testTable').child('roulette').set(null)
    // firebase.database().ref('Restaurant/testTable').on('value', (snapshot)=>{this.props.f_updateTable(tableTotal(this.props.o_firebase).reduce((acc, price)=>{return price+acc}))})
    fetcher().then(result => {
      // firebase.database().ref('Restaurant/testTable').child('roulette').on('value', (snapshot)=>{this.setState({test:'test'}); console.log(this.state)})
      // firebase.database().ref('Restaurant/testTable').child('roulette').once('value', (snapshot)=>{this.setState({test:null}); console.log(this.state)})
        firebase.database().ref('Restaurant/testTable').on('value', (snapshot)=>{
          this.props.f_toFirebase(snapshot.val());
          console.log(this.props.o_firebase, 'yo')
        })
    })

    // firebase.database().ref('Restaurant/testTable').child('roulette').on('value', (snapshot)=>{this.setState({test:'test'}); console.log(this.state)})
    // rouletteDetector(this.props.o_firebase.roulette);
    // this.props.f_clearFirebase();
    // firebase.database().ref('Restaurant').on('value', (snapshot)=>{
    //   console.log(snapshot.val())
    //   this.props.f_toFirebase(snapshot.val())
    // })

    // this.props.setMenu(menuSetter(this.props.menu.response.menu.menus.items[0].entries.items));
  }
}



   export const FullAppNav = createStackNavigator({
     Zero: {
       screen: Welcome,
       navigationOptions: {
         headerStyle:{backgroundColor: '#212121', height: 0, display: 'none'},
         gesturesEnabled: false,
       },
     },
     One: {
       screen: TabNav,
       navigationOptions: {
         headerStyle:{backgroundColor: 'red', height: 0, display: 'none'},
         headerLeft: null,
         gesturesEnabled: false,
       },
     },
    //  Two: {
    //    screen: RouletteResult,
    //    navigationOptions: {
    //      headerStyle:{backgroundColor: 'red', height: 0, display: 'none'},
    //      headerLeft: null,
    //      gesturesEnabled: false,
    //    },
    //  },
    // Three: {
    //    screen: TreatPay,
    //    navigationOptions: {
    //      headerStyle:{backgroundColor: 'red', height: 0, display: 'none'},
    //      headerLeft: null,
    //      gesturesEnabled: false,
    //    },
    //  },
    //  Four: {
    //    screen: Done,
    //    navigationOptions: {
    //      headerStyle:{backgroundColor: '#212121', height: 10},
    //      headerLeft: null,
    //      gesturesEnabled: false,
    //    },
    //  },
    //  Five: {
    //     screen: Scanny,
    //     navigationOptions: {
    //       headerStyle:{backgroundColor: 'red', height: 0, display: 'none'},
    //       headerLeft: null,
    //       gesturesEnabled: false,
    //     },
    //   },
   })

//Maps the state object properties to React props so the data can be passed down components
function mapStateToProps(state){
  return {
    o_APIData: state.APIData,
    o_cart: state.cart,
    // price: state.price,
    o_order: state.order,
    o_tip: state.tip,
    o_category: state.category,
    o_menu: state.menu,
    o_fullMenu: state.fullMenu,
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
      f_fullMenu: fullMenu,
      f_setCurrentItem: setCurrentItem,
      f_updateName: updateName,
      f_yPos: yPos,
      f_setTip: setTip,
      f_toFirebase: toFirebase,
      f_clearFirebase: clearFirebase,
      f_updateTable: updateTable,
      f_addCustomPrice: addCustomPrice,
      f_subtractCustomPrice: subtractCustomPrice,
      removeCat: removeCat,
      addCat: addCat,

    }, dispatch)
}
//connects the mapped state object properties and action creators to props on this component
export default connect(mapStateToProps, mapDispatchToProps)(TheApp)

const styles = StyleSheet.create({

  rouletteText:{fontSize: 40, color:'white'},
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  drawerHeader: { height: 200, backgroundColor: 'white' },
  drawerImage: { height: 150, width: 150, borderRadius: 75 },
  userName: { color: '#252326', fontWeight: '800', marginTop: 10, marginBottom: 10, fontSize: 20 },
  loading:{ textAlign: 'center', marginTop: '50%', color: 'white' },
  contain: { flex: 1, justifyContent: 'center', alignItems: 'center', width: 100, },
  icon: { width: 24, height: 24, },
})
