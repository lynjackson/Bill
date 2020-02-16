import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, TouchableOpacity, TextInput} from 'react-native';

export const Confirmation = () => {
  return(
    <View style={{borderColor: 'red', borderWidth: 1, height: '100%', width: '100%'}}>
      <Text style={{fontSize: 80, fontWeight: 'bold', textAlign: 'center'}}>Thanks</Text>
      <Text>Thanks for your order. Your receipt has been sent to {'[email address]'}</Text>
    </View>
  )
}
