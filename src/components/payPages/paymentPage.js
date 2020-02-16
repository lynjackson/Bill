import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native';
import Breaker from '../../flexComponents/breaker';
import {PriceBreakdown, SplitBreakdown, YourBreakdown, RouletteBreakdown, PickBreakdown, TreatBreakdown, CustomBreakdown} from '../../flexComponents/priceBreakdown';
import { addUp, listItemCreator } from '../../helperFunctions/pureFunctions';
import {Tipper} from '../tipper';
import BottomButton, {PayButton, CheckoutButton} from '../../flexComponents/bottomButton'
import {gStyle, appStyle} from '../../containers/styles';
import CustomListItem, {OrderListItem} from '../../flexComponents/listItem'
import OrderDropdown from '../../flexComponents/orderDropdown'
import CustomDropdown from '../../flexComponents/customDropdown'
import BreakTest from '../../flexComponents/breakTest'
import PayOptionsScreen from '../payOptions'
import { Ionicons } from '@expo/vector-icons';
import {tableTotal} from '../menu'
import firebase from 'firebase'


export default class PaymentPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      customTip: {opacity: 0, zIndex: -1},
      payOps: ()=>{return null}
    }
    this.orderState=this.orderState.bind(this)
    this.customTipper=this.customTipper.bind(this)
    this.rouletteTest=this.rouletteTest.bind(this)
  }

  orderState(){
    this.setState({payOps: ()=> null})
  }

  customTipper(){
    this.setState({customTip:{opacity: 1, zIndex: 2}})
  }

rouletteTest(user){
  document.getElementById(`droppy-${user}`).style.backgroundColor = 'red';
}

  render(){
    const order = this.props.screenProps.o_order
    const subtotal = tableTotal(this.props.screenProps.o_firebase).reduce((acc, price)=>{return acc + price}, 0)
    const tax = (addUp(order) * .07);
    const total = ((addUp(order) * .07) + (addUp(order)));
    const splitTotal = total / 4;
    const tip = this.props.screenProps.o_tip;
    const finalTotal = total + tip
    const orderLength = listItemCreator(order, OrderListItem).length*50

    // console.log(listItemCreator(order, OrderListItem))



    return(
      <View style={[appStyle.page, {justifyContent: 'space-between', height: '100%', opacity: 1, paddingBottom:6}]} blurRadius={1}>
        <View style={[appStyle.header, {flexDirection:'row', justifyContent:'flex-start', paddingLeft:'2.5%'}]}>
          <TouchableWithoutFeedback onPress={()=>{this.props.navigation.goBack()}}><Ionicons name="ios-arrow-back" size={40} style={{color:'white'}}/></TouchableWithoutFeedback>
          <Text style={{color: 'white', alignSelf:'center', fontFamily: 'Avenir', fontSize: 17, letterSpacing:4, fontWeight:'bold', position:'relative', marginLeft:'30%'}}>{this.props.type}</Text>
        </View>

        {this.state.payOps()}

        {this.props.directions}

        <ScrollView style={{width:'96.5%', alignSelf:'center'}}>
          <View>
            {this.props.options}
          </View>
        </ScrollView>

        {this.props.children}

        <View style={[{height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,.5)', position:'absolute', justifyContent:'center'}, this.state.customTip]}>
          <View style={{backgroundColor: 'white', height: '25%', width: '60%', alignSelf: 'center', alignItems: 'center', justifyContent:'space-around'}}>
            <Text>Enter Your Tip Amount:</Text>
            <TextInput  value={'$'} style={{width: '60%', height: '30%', fontSize:20, borderColor: 'black', borderWidth: 1, paddingLeft:5, paddingRight:5, }}></TextInput>
            <TouchableHighlight><Text>Ok!</Text></TouchableHighlight>
          </View>
        </View>

    </View>
  )
  }


}

// <TouchableHighlight onPress={()=>{return this.setState({payOps: ()=>{return <PayOptionsScreen orderState={this.orderState} navigate={this.props.navigation.navigate}/>}})}} style={{borderColor: '#212121', borderWidth: 3, height: 'auto', width: 'auto', padding:2, borderRadius: '5%', }}><Text>Payment{"\n"}Methods</Text></TouchableHighlight>
export const SplitPay = (props) =>{
  const order = props.screenProps.o_order
  const subtotal = addUp(order)
  const tax = (addUp(order) * .07);
  const total = ((addUp(order) * .07) + (addUp(order)));
  const splitTotal = total / Object.keys(props.screenProps.o_firebase).length;
  const tip = props.screenProps.o_tip;
  const finalTotal = splitTotal + tip

  const base = Object.values(props.screenProps.o_firebase).map((person)=>{
    if (person.hasOwnProperty('order')){
      if (person.order.length > 1){
        return person.order.reduce((acc, item)=>{
           return item.price + acc;
      }, 0)
    }
       else if (person.order.length === 1){return person.order[0].price}
    }
    else{
      return 0
    }
  })

  const base3 = base.filter((price)=>{
    return (typeof price === 'number')
  })

  const splitEem = ((base3.length > 0)?base3.reduce((acc, price)=>{return price + acc}) / base3.length : '0')

  console.log(base3, 'base3')


  return (
    <PaymentPage screenProps={props.screenProps} navigation={props.navigation} type={'Even Split'} dropType={OrderDropdown} options={Object.keys(props.screenProps.o_firebase).map((user)=>{
            return <OrderDropdown key={props.screenProps.o_firebase[user]} id={`droppy-${user}`} orders={(props.screenProps.o_firebase[user].order) ? props.screenProps.o_firebase[user].order : []} screenProps={props.screenProps} startVal={0} name={user}/>
    })}>
      <View style={{width:'96.5%', flexDirection:'row', justifyContent:'space-between', alignSelf:'center', paddingHorizontal:'2%'}}><Text style={{fontFamily:'Avenir-Heavy', fontSize:16, letterSpacing:1.8}}>Order Total</Text><Text style={{fontFamily:'Avenir-Heavy', fontSize:16, letterSpacing:1.8, color:'green'}}>{base3.reduce((acc, index)=>{return index+acc}).toFixed(2)}</Text></View>
      <SplitBreakdown screenProps={props.screenProps} base3={base3} splitEem={splitEem} diners={Object.keys(props.screenProps.o_firebase).length}/>
      <Tipper screenProps={props.screenProps} payTotal={splitTotal}  />
      <PayButton buttonPrice={`$${(splitEem + (splitEem*.07)).toFixed(2) }`} navigate={()=>props.navigation.navigate('Four')}/>
    </PaymentPage>
  )
}


export const YourStuffPay = (props) =>{
  const order = props.screenProps.o_order
  const subtotal = addUp(order)
  const tax = (addUp(order) * .07);
  const total = ((addUp(order) * .07) + (addUp(order)));
  const tip = props.screenProps.o_tip / 4;
  const finalTotal = total + tip
  console.log(props)
  return (
    <PaymentPage key={props.screenProps} screenProps={props.screenProps} navigation={props.navigation} type={'Your Items'} dropType={OrderDropdown} options={Object.keys(props.screenProps.o_firebase).map((user)=>{
        if(user === props.screenProps.o_user.name){
            return <OrderDropdown key={props.screenProps.o_firebase[user]} id={`droppy-${user}`} orders={(props.screenProps.o_firebase[user].order) ? props.screenProps.o_firebase[user].order : []} screenProps={props.screenProps} startVal={0} name={user}/>
        }
    })}>
      <YourBreakdown screenProps={props.screenProps}/>
      <Tipper screenProps={props.screenProps} payTotal={total}/>
      <PayButton buttonPrice={`$${finalTotal.toFixed(2)}`} navigate={()=>props.navigation.navigate('Four')}/>
    </PaymentPage>
  )
}



export const PickPay = (props) =>{
  const order = props.screenProps.o_order
  // const subtotal = addUp(order)
  const subtotal = props.screenProps.o_user.customTotal;
  const tax = (subtotal * .07);
  // const total = (tax + (addUp(order)));
  const tip = props.screenProps.o_tip / 4;
  const finalTotal = subtotal + tax + tip

  return (
    <PaymentPage screenProps={props.screenProps} navigation={props.navigation} type={'Custom Selection'} dropType={OrderDropdown} options={Object.keys(props.screenProps.o_firebase).map((user)=>{
            return <CustomDropdown key={props.screenProps.o_firebase[user]} id={`droppy-${user}`} orders={(props.screenProps.o_firebase[user].order) ? props.screenProps.o_firebase[user].order : []} screenProps={props.screenProps} startVal={0} name={user}/>
    })} directions={<View style={{borderBottomWidth:.5, borderBottomColor:'#212121', width:'100%', height: '10%', justifyContent:'center', alignItems:'center', }}><Text style={{textTransform:'uppercase', fontFamily:'Avenir-Medium', fontSize:17}}>Select Items you wish to pay for</Text></View>}>
        <CustomBreakdown key={props.screenProps.o_user.customTotal} subtotal ={props.screenProps.o_user.customTotal} tax={tax} screenProps={props.screenProps} amounts={subtotal}/>
      <Tipper screenProps={props.screenProps} payTotal={subtotal}/>
      <PayButton buttonPrice={`$${finalTotal.toFixed(2)}`} navigate={()=>props.navigation.navigate('Confirmation')}/>
    </PaymentPage>
  )
}



// <View><Text>Subtotal</Text><Text>{props.screenProps.o_user.customTotal}</Text></View>
// <View></View>
// <View></View>


export class RoulettePay extends React.Component{
constructor(props){
  super(props);
  this.state={
    total: 0,
    payer: null,
    display: 'none',
    spinButton: 'flex',
    spinOrPay: ()=>{return <TouchableOpacity title='Spin' style={{height: 50, display: this.state.spinButton, alignItems:'center', justifyContent: 'center', width:'15%', alignSelf:'center', borderWidth: 1, borderColor: 'black', borderRadius:5, backgroundColor:'black'}} onPress={()=>{setTimeout(()=>{this.roulette()}, 0)}}><Text style={{color: 'white', fontSize:40}}>Spin</Text></TouchableOpacity>}
  }
  this.roulette = this.roulette.bind(this)

}

 roulette(){
  const objLength = Object.keys(this.props.screenProps.o_firebase).length
  const index = Math.floor(Math.random() * (objLength - 0)+0)
  const rando = Object.keys(this.props.screenProps.o_firebase)[index];
  // console.log(rando)
  const subtotal = tableTotal(this.props.screenProps.o_firebase).reduce((acc, price)=>{return acc + price}, 0)
  // console.log(this.props.screenProps.o_user)

  firebase.database().ref('Restaurant/testTable').update({roulette: rando})
  // this.props.navigation.navigate('Two')
  // console.log(this.props.screenProps.o_firebase)
  // (rando !== this.props.screenProps.o_user.name) ? this.setState({total:0, payer: rando, display: 'flex', spinButton:'none', spinOrPay : ()=>{return <PickBreakdown subtotal={this.state.total} tax={this.state.total * .07} screenProps={this.props.screenProps}/>}}):this.setState({total: subtotal, payer: 'You', display: 'flex', spinButton:'none', spinOrPay:()=>{return <PickBreakdown subtotal={this.state.total} tax={this.state.total * .07} screenProps={this.props.screenProps}/>}})
  // this.setState({payer: Object.keys(this.props.screenProps.o_firebase)[index]})
}

  render(){
    const order = this.props.screenProps.o_order
    const tax = (addUp(order) * .07);
    const total = ((addUp(order) * .07) + (addUp(order)));
    const tip = this.props.screenProps.o_tip / 4;
    const finalTotal = total + tip
    const trueTableTotal = tableTotal(this.props.screenProps.o_firebase).reduce((acc, price)=>{return acc + price}, 0)

    // console.log(trueTableTotal)
    //
    // console.log(this.props)

  return (
    <PaymentPage screenProps={this.props.screenProps} navigation={this.props.navigation} type={'Roulette'} dropType={OrderDropdown}>
      <View><Text>{this.state.total}</Text></View>
      <View style={{display: this.state.display, backgroundColor:'white', position: 'absolute', height: '20%', width: '50%', zIndex:5, borderWidth:5, borderColor:'black', alignItems:'center', justifyContent:'center', fontSize:'2em', alignSelf:'center', top:'35%'}}>
        <Text style={{fontSize:20}}>And the lucky winner is...</Text>
        <Text style={{fontSize:100}}>{this.state.payer}!!!!</Text>
      </View>
      {this.state.spinOrPay()}
      <Tipper screenProps={this.props.screenProps} payTotal={total}/>
      <PayButton buttonPrice={`$${finalTotal.toFixed(2)}`} navigate={()=>this.props.navigation.navigate('Confirmation')}/>
    </PaymentPage>
  )
}

componentDidMount(){
  // firebase.database().ref('Restaurant/testTable').child('roulette').on('value', (snapshot)=>{this.props.navigation.navigate('Two'); console.log(this.state)})
  // this.props.screenProps.f_updateTable(trueTableTotal)
}
}

export const TreatPay = (props) =>{
  const order = props.screenProps.o_order
  const subtotal = addUp(order)
  const tax = (addUp(order) * .07);
  const total = ((addUp(order) * .07) + (addUp(order)));
  const tip = props.screenProps.o_tip / 4;
  const finalTotal = total + tip
  return (
    <PaymentPage key={props.screenProps} screenProps={props.screenProps} navigation={props.navigation} type={'Your Items'} dropType={OrderDropdown}>
    <TreatBreakdown screenProps={props.screenProps}/>
    <Tipper screenProps={props.screenProps} payTotal={total}/>
    <PayButton buttonPrice={`$${finalTotal.toFixed(2)}`} navigate={()=>props.navigation.navigate('Four')}/>
    </PaymentPage>
  )
}
// <TouchableOpacity title='Spin' style={{height: 50, display: this.state.spinButton, alignItems:'center', justifyContent: 'center', width:'15%', alignSelf:'center', borderWidth: 1, borderColor: 'black', borderRadius:5, backgroundColor:'black'}} onPress={()=>{setTimeout(()=>{this.roulette()}, 2000)}}><Text style={{color: 'white', fontSize:40}}>Spin</Text></TouchableOpacity>
// <PickBreakdown subtotal ={this.state.total} tax={this.state.total * .07}/>

// <PaymentPage screenProps={this.props.screenProps} navigation={this.props.navigation} type={'Roulette'}>
// <Button title='Spin' onPress={()=>{this.roulette()}}>Spin</Button>
// <View>{this.state.total}</View>
// <PickBreakdown subtotal ={this.state.total} tax={tax}/>
// <Tipper screenProps={this.props.screenProps} payTotal={total}/>
// <PayButton buttonPrice={`$${finalTotal.toFixed(2)}`} navigate={()=>this.props.navigation.navigate('Confirmation')}/>
// </PaymentPage>
