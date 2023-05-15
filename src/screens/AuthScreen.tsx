/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import LoginImage from '../assets/images/login_screen.png';
import BUTTONRIGHTARROW from '../assets/icons/button_right_arrow.png';
import GOOGLE_ICON from '../assets/icons/google_icon.png';
import APPLE_ICON from '../assets/icons/apple.png';
import HORIZONTAL_LINE from '../assets/icons/horizontal_line.png';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useStores } from '../store/Store';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const AuthScreen = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();
  const authStore = useStores();

  // Handle user state changes
  function onAuthStateChanged(userReceived: any) {
    console.log('====================================');
    console.log('userReceived ==>', JSON.stringify(userReceived));
    console.log('====================================');
    setUser(userReceived);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    if (user) {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        name: user.displayName ? user.displayName : "",
        email: user.email,
        role: 'user',
        profile: user.photoURL,
        uid: user?.providerData.length ? user?.providerData[0]?.uid : '',
        auth_provider: user?.providerData.length ? user?.providerData[0]?.providerId : '',
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      console.log('req ===> ', requestOptions);

      fetch(
        'http://20.172.135.207/api/api/v1/auth/register/google-user',
        requestOptions,
      )
        .then(response => response.json())
        .then(async (result: any) => {
          console.log(typeof result, 'dynamic');
          console.log('response ===>', JSON.stringify(result));
          console.log('jwt ===>', result.jwtToken);
          console.log('data ===>', result.data);
          await authStore.update('user', result.data);
          await authStore.update('authToken', result.jwtToken);
          props.navigation.navigate('HomeScreen');
        })
        .catch(error => console.log('error 1', error));
    }
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: '338371456087-d3km3ke63od69pam1hl490cng5qtutpo.apps.googleusercontent.com',
      webClientId:
        '338371456087-fm6vj3phhn4ha70e4gfjrk6aemrbumo2.apps.googleusercontent.com',
    });
  }, []);
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function appleLogin() {
    // performs login request
    if (appleAuth.isSupported) {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('Apple Sign-In failed - no identify token returned');
        }

        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

        // Sign the user in with the credential
        return auth().signInWithCredential(appleCredential);
      }

    }
    else {
      if (Platform.OS === "android") {
        ToastAndroid.show("Apple-autentisering støttes ikke på denne enheten.", ToastAndroid.SHORT);
      } else {
        Alert.alert("Info", "Apple-autentisering støttes ikke på denne enheten.", [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ])
      }
    }
  }

  return (
    <ImageBackground source={LoginImage} style={{ flex: 1 }}>
      <LinearGradient
        colors={['transparent', 'transparent', 'black', 'black']}
        style={{ flex: 1, justifyContent: 'center' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 290,
          }}>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <Image
              source={HORIZONTAL_LINE}
              style={{marginRight: 10, marginTop: 15}}
            />
            <Text
              style={{
                fontSize: 19,
                fontFamily: 'OpenSans-Regular',
                color: '#FFFFFF',
              }}>
              ELLER
            </Text>
            <Image
              source={HORIZONTAL_LINE}
              style={{marginLeft: 10, marginTop: 15}}
            />
          </View> */}
          <TouchableOpacity
            onPress={() => {
              onGoogleButtonPress();
            }}
            style={{
              width: '80%',
              height: 47,
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: 22,
              marginVertical: 20,
            }}>
            <Image
              source={GOOGLE_ICON}
              style={{ width: 24, height: 24, marginLeft: 10 }}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'OpenSans-Regular',
                color: '#6080A0',
                textAlign: 'center',
                textTransform: 'uppercase',
              }}>
              Registrer deg hos google
            </Text>
            <Image
              source={BUTTONRIGHTARROW}
              style={{ marginRight: 5, tintColor: '#6080A0' }}
            />
          </TouchableOpacity>
          {Platform.OS === "ios" ? <TouchableOpacity
            onPress={() => {
              appleLogin();
            }}
            style={{
              width: '80%',
              height: 47,
              backgroundColor: 'black',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              borderColor: '#FFFFFF',
              borderWidth: 1,
              alignItems: 'center',
              borderRadius: 22,
              marginVertical: 20,
            }}>
            <Image
              source={APPLE_ICON}
              style={{
                width: 24,
                height: 24,
                marginLeft: 10,
                tintColor: '#FFFFFF',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'OpenSans-Regular',
                color: '#FFFFFF',
                textAlign: 'center',
                textTransform: 'uppercase',
              }}>
              Registrer deg hos Apple
            </Text>
            <Image
              source={BUTTONRIGHTARROW}
              style={{ marginRight: 5, tintColor: '#FFFFFF' }}
            />
          </TouchableOpacity> : null}
        </View>
        <TouchableOpacity
          style={{
            width: '80%',
            height: 47,
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            alignSelf: 'center',
            borderColor: '#FFFFFF',
            borderWidth: 1,
            borderRadius: 22,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 19,
              fontFamily: 'OpenSans-Regular',
              color: 'white',
              textAlign: 'center',
              marginRight: '15%',
              textTransform: 'uppercase',
            }}>
            sjekk ut dig først
          </Text>
          <Image
            source={BUTTONRIGHTARROW}
            style={{ marginRight: 15, tintColor: 'white' }}
          />
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

export default AuthScreen;

// const styles = StyleSheet.create({});
