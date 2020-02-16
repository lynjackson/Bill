import React from 'react';
import { createDrawerNavigator, createStackNavigator, DrawerItems, SafeAreaView, NavigationActions } from 'react-navigation';
import { Button, StyleSheet, Text, View, ScrollView, TouchableHighlight, Image } from 'react-native';
import { Container, Content, Icon, Header, Body } from 'native-base';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import { connect } from 'react-redux';


export const drawerContent = (props) => {
  let userInfo = props.screenProps.o_user;
  return(
    <View style={styles.contain}>
    <View style={styles.drawerHeader}>
      <View>
        <Image style={styles.drawerImage} source={require('../img/team.jpg')} />
        <Text style={styles.userName}> {userInfo.name || 'Robot'} </Text>
      </View>
    </View>

    <View>
      <DrawerItems {...props} style={styles.drawerItems}/>
    </View>
  </View>
  )
};


function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(drawerContent)


const styles = StyleSheet.create({

  contain: {
    //justifyContent: 'center',
    width: '100%',
    marginTop: 20

  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: 'center',
  },
  userName: {
    color: '#252326',
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    alignSelf: 'center',
  },
  drawerItems:{

  }

})
