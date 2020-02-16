// Thanks for checking out Bill! Bill is an application that takes you through the dining experience using your mobile phone. The app allows you and your friends to send orders directly to a restaurant's kitchen when dining in. When your party is finished dining, you can then pay through your phone using our convenient payment options. Enjoy!

// Instructions:

// 1 - Select the 'iOS' option at the top of the panel to the right.

// 2 - Select 'Tap to play'.

// 3 - Enter your name and hit 'SIGN IN'. Don't worry about a password.

// 4 - Please accept my apologies if there is a queue. There are currently very few options for sharing development mode React Native projects, short of publishing to the app store.

// Thanks. -Lyn



import React from 'react';
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import {Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image} from 'react-native';
import ReduxPromise from 'redux-promise'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Font, AuthSession } from 'expo';
// import * as AppAuth from 'expo-app-auth';
//import thunk from 'thunk';
import MainNav from './src/navs/mainNav'
import reducers from './src/reducers';



export default class App extends React.Component {


  render(){
    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
    console.disableYellowBox = true;

    

    return(
          <SafeAreaView style={{ flex: 1, backgroundColor: '#212121'}}>
            <Provider store={createStoreWithMiddleware(reducers)}>
              <MainNav />
            </Provider>
          </SafeAreaView>
    )
  }
}

// <Button title='Login' onPress={tokenResponse()}>Login</Button>
