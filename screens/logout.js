import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import firebase from 'firebase';

let fonts = {
  'custom-font': require('../assets/fonts/Grandstander-Regular.ttf')
}

const { width: WIDTH } = Dimensions.get('window')

export default class Logout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false
    }
  }

  componentDidMount() {
    this._loadFontsAsync()
  }

  async _loadFontsAsync() {
    await Font.loadAsync(fonts);
    this.setState({ fontsLoaded: true });
  }


  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View>
          <TouchableOpacity style={styles.logoutbtn} onPress={() => {
            firebase.auth().signOut()
          }}>
            <Text style={styles.btnText}> Logout </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'custom-font',
    fontSize: 50,
    color: 'white'
  },
  logoutbtn: {
    backgroundColor: '#c2c1de',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    marginTop: 20,
    marginLeft: 25,
  },
  btnText: {
    color: '#0e0d40',
    fontSize: 23,
    fontFamily: 'custom-font',
    textAlign: 'center'
  },
});
