import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

//Libraries 
import { Container, Content, Icon, Header, Body } from 'native-base'
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'

//Menu Slider Components 
import Reservations from './Reservations.js'
import HomeScreen from "./HomeScreen.js";
import Login from "./Login.js";
import Help from "./Help.js";
import Payment from "./Payment.js";
import History from "./History.js";
import CurrentMenu from "./App1.js";

export default class App extends Component {
  render() {
    return (
      <MyApp />
    )
  }
}

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={require('../img/caramel.jpg')} />
        <Text style={styles.userName}> Roscoe Coney </Text>
      </Body>
    </Header>

    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const MyApp = DrawerNavigator({

  // For each screen that you can navigate to, create a new entry like this:
  Home: {
    screen: HomeScreen,
  },
  Reservations: {
    screen: Reservations
  },
  'Current Menu': {
    screen: CurrentMenu
  },
  History: {
    screen: History
  },
  Payment: {
    screen: Payment
  },
  Help: {
    screen: Help
  },
  Login: {
    screen: Login
  }
},
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
});


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  userName: {
    color: '#252326',
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20
  }

})
