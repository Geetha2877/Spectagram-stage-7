import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

let customFonts = {
    'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
  };

  export default class Profile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fontsLoaded: false,
        isEnabled: false,
        light_theme: true,
        profile_image: '',
        name: '',
      };
    }
    toggleSwitch() {
        const previous_state = this.state.isEnabled;
        const theme = !this.state.isEnabled ? 'dark' : 'light';
        var updates = {};
        updates['/users/' + firebase.auth().currentUser.uid + '/current_theme'];
        firebase.database().ref().update(updates);
        this.setState({
          isEnabled: !previous_state,
          light_theme: previous_state,
        });
      }
      async fetchUser() {
        let theme, name, image;
        await firebase
          .database()
          .ref('/users/' + firebase.auth().currentUser.uid)
          .on('value', function (snapShot) {
            theme = snapShot.val().current_theme;
            name = `${snapShot.val().first_name} ${snapShot.val().last_name}`;
            image = snapShot.val().profile_picture;
          });
        this.setState({
          light_theme: theme === 'light' ? true : false,
          isEnabled: theme === 'light' ? false : true,
          name: name,
          profile_image: image,
        });
      }
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
      }
    render() {
        if (!this.state.fontsLoaded) {
          return <AppLoading />;
        }
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
<Button 
title="sign in with google"
onPress={()=>
this.signInWithGoogleAsync()}></Button>
<Switch
              style={{
                transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
              }}
              trackColor={{ false: '#76577', true: 'white' }}
              thumbColor={this.state.isEnabled ? '#eea249' : '#f4f3f4'}
              ios_backrgroundColor="#3e3e"
              onValueChange={() => this.toggleSwitch()}
              value={this.state.isEnabled}
            />
            </View>
        )
}
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#15193c' },
    droidSafeArea: {
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    appTitle: { flex: 0.07, flexDirection: 'row' },
    appIcon: { flex: 0.3, justifyContent: 'center', alignItems: 'center' },
    iconImage: { width: '100%', height: '100%', resizeMode: 'contain' },
    appTitleTextContainer: { flex: 0.7, justifyContent: 'center' },
    appTitleText: {
      color: 'white',
      fontSize: RFValue(28),
      fontFamily: 'Bubblegum-Sans',
    },
    screenContainer: { flex: 0.85 },
    profileImageContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImage: {
      width: RFValue(140),
      height: RFValue(140),
      borderRadius: RFValue(70),
    },
    nameText: {
      color: 'white',
      fontSize: RFValue(40),
      fontFamily: 'Bubblegum-Sans',
      marginTop: RFValue(10),
    },
    themeContainer: {
      flex: 0.2,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: RFValue(20),
    },
    themeText: {
      color: 'white',
      fontSize: RFValue(30),
      fontFamily: 'Bubblegum-Sans',
      marginRight: RFValue(15),
    },
  });
  