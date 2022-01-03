import * as React from 'react';
import {
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('PostScreen');
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  };
  render() {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator size="large"/>
      </View>
    );
  }
}
