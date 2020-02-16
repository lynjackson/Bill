/**
 * Auth0Sample 00-Login
 * https://github.com/auth0/react-native-auth0
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Auth0 from 'react-native-auth0';
import MainNav from './navs/mainNav';

var credentials = require('./auth0-cred');
const auth0 = new Auth0(credentials);

export default class Auth0Sample extends Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: null };
    this._onLogin = this._onLogin.bind(this);

  }

  _onLogin = () => {
    auth0.webAuth.authorize({
        scope: 'openid profile',
        audience: 'https://' + credentials.domain + '/userinfo'
      })
      .then(credentials => {
        this.setState({ accessToken: credentials.accessToken });
        //console.log(credentials.accessToken);
      })
      .catch(error => console.log(error));
  };

  _onLogout = () => {
    if (Platform.OS === 'android') {
      this.setState({ accessToken: null });
    } else {
      auth0.webAuth
        .clearSession({})
        .then(success => {
          this.setState({ accessToken: null });
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    let loggedIn = this.state.accessToken === null ? false : true;

    return(
      <View>
        {loggedIn ? this.props.navigation.navigate('DrawerNav') : this._onLogin()}
      </View>
      )



//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>Welcome to Bill</Text>
//         <Text>
//           {loggedIn ? '' : 'You are not logged in'}
//         </Text>
//         <Button
//           onPress={loggedIn ? this._onLogout : this._onLogin}
//           title={loggedIn ? 'Log Out' : 'Log In'}
//         />
//       </View>
//     );
//   }
// }
//
//
//   componentDidMount(){
//     setTimeout(function(){
//       return
//       })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent('Auth0Sample', () => Auth0Sample);
