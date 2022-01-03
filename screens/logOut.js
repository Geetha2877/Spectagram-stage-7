import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import firebase from 'firebase';

export default class LogOut extends Component {
  componentDidMount() {
    firebase.auth().signOut;
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>LOGOUT</Text>
      </View>
    );
  }
}
