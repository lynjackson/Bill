import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

//library imports
import { Icon, Button, Container, Header, Content, Left } from 'native-base'

export default class HomeScreen extends Component {
  render() {
    return (

      <Container >
        <Header>
          <Left>
          <Icon name='ios-menu' onPress={()=> this.props.navigation.navigate('DrawerToggle')}/>

          </Left>
           <Image
        source={require('../img/Bill.png')}
        style={{ width: 60, height: 30, justifyContent: 'center',
    alignItems: 'center', marginRight: 140}}
      />
        </Header>


        <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text >Home Screen</Text>
        </Content>

      </Container>

    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});