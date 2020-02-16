import * as React from 'react';
import { Text, View, StyleSheet, TextInput} from 'react-native';


// You can import from local files


// or any pure javascript modules available in npm


export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.page}>
        <View style={{borderColor: 'black',borderWidth: .5, height: '75%', width: '85%', backgroundColor: '#24292e2e'}}>
        <View style={{height: 110, width: '100%'}}>
          <Text style={{fontSize: 100, textAlign: 'center'}}>Bill</Text>
        </View>

        <View style={{height: 75, width: '100%'}}>
          <Text>Username</Text>
          <TextInput style={{width: '100%', height: 40, borderColor: 'black',borderWidth: 2, marginTop: 8, backgroundColor: 'white'}}/>
        </View>
        <View style={{height: 75, width: '100%'}}>
          <Text>Password</Text>
          <TextInput secureTextEntry = {true} style={{width: '100%', height: 40, borderColor: 'black',borderWidth: 2, marginTop: 8, backgroundColor: 'white'}}/>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
  },



  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
