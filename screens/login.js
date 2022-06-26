import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import Home from './home'
import Ionicons from 'react-native-vector-icons/Ionicons';
import bgImg from '../assets/bg3.jpg';

let fonts = {
  'custom-font': require('../assets/fonts/Grandstander-Regular.ttf')
}

const { width: WIDTH } = Dimensions.get('window')

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      showPass: true,
      press: false,
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this._loadFontsAsync()
  }

  async _loadFontsAsync() {
    await Font.loadAsync(fonts);
    this.setState({ fontsLoaded: true });
  }

  /*  handleLogin = (email, password) => {
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate("Home")
        })
        .catch(e => { alert(e.message) })
    }*/

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                })
                .then(function (snapshot) { });
            }
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: 'web',
        androidClientId:
          '702103752084-g4g3tik3k203uoaed09ip3in9q91601u.apps.googleusercontent.com',
        iosClientId:
          '702103752084-nmdke9pl1di6rtuqj5km1bp8qrhbp8in.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    } else {
      this.setState({ showPass: true, press: false })
    }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <ImageBackground source={bgImg} style={styles.bgContainer} >

          <SafeAreaView style={styles.droidSafeArea} />

          <View style={styles.logoContainer}>
            <Image style={styles.logo} />
            <Text style={styles.logoText}> MY APP </Text>
          </View>

          {/*  <View style={styles.inputContainer}>
            <Ionicons
              name='person-outline'
              size={28}
              color='rgba(255,255,255,0.7)'
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={'Username'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name='lock-closed-outline'
              size={28}
              color='rgba(255,255,255,0.7)'
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={'Password'}
              secureTextEntry={true}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.btnEye}
              onPress={this.showPass.bind(this)}>
              <Ionicons
                name={this.state.press == false ? 'eye-off-outline' : 'eye-outline'}
                size={26}
                color={'rgba(255,255,255,0.7)'}
              />
            </TouchableOpacity>
          </View>

          {/*<TouchableOpacity style={styles.btnLogin}
           // onPress={() => this.handleLogin(this.state.email, this.state.password)}>
            <Text style={styles.btnText}> LOGIN </Text>
      </TouchableOpacity>*/}


          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signInWithGoogleAsync()}>
              <Image
                source={require('../assets/google_icon.png')}
                style={styles.googleIcon} />
            </TouchableOpacity>
          </View>
        </ImageBackground >
      );
    }
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 120,
    height: 120
  },
  logoText: {
    color: '#2b2a26',
    fontSize: 50,
    fontWeight: '500',
    fontFamily: 'custom-font',
    marginBottom: 400
  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    fontFamily: 'custom-font',
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#432577',
    justifyContent: 'center',
    marginTop: 20
  },
  btnText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    fontFamily: 'custom-font',
    textAlign: 'center'
  },

  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },

  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: RFValue(70),
    height: RFValue(70),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
