/* eslint-disable react-native/no-inline-styles */
import {View, Image, TouchableOpacity, Text, Alert, ToastAndroid, Platform} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import LOGO from '../assets/icons/logo.png';
import LOCATION_ICON from '../assets/icons/location_icon.png';
import NOTIFICATION_ICON from '../assets/icons/notification_icon.png';
import CART_ICON from '../assets/icons/cart_icon.png';
import HAMBURGER_ICON from '../assets/icons/hamburger_icon.png';
import PROFILE from '../assets/icons/profile.png';
import BACK from '../assets/icons/back_button_white.png';
import {useStores} from '../store/Store';
import LinearGradient from 'react-native-linear-gradient';
import { title } from 'process';

const TopBar = (props: any) => {
  const route = useRoute();
  const authStore = useStores();

  return (
    <View
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        marginTop: 20,
        // backgroundColor: 'black',
      }}>
      {props.backEnable ? (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('HomeScreen')}>
          <Image source={BACK} style={{width: 70, height: 70}} />
        </TouchableOpacity>
      ) : (
        <Image source={LOGO} style={{height: 90, width: 90}} />
      )}

      <TouchableOpacity
        onPress={() => {
          if(Platform.OS === "android"){
            ToastAndroid.show('Kommer snart', ToastAndroid.LONG);
            // props.navigation.navigate('MapScreen')
          } else {
            Alert.alert('Info', 'Kommer snart', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        }}>
        <Image
          source={LOCATION_ICON}
          style={{tintColor: route.name === 'MapScreen' ? '#6080A0' : ''}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if(Platform.OS === "android"){
            ToastAndroid.show('Kommer snart', ToastAndroid.LONG);
            // props.navigation.navigate('MapScreen')
          } else {
            Alert.alert('Info', 'Kommer snart', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        }}>
        <Image
          source={NOTIFICATION_ICON}
          style={{
            tintColor: route.name === 'NotificationScreen' ? '#6080A0' : '',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if(Platform.OS === "android"){
            ToastAndroid.show('Kommer snart', ToastAndroid.LONG);
            // props.navigation.navigate('MapScreen')
          } else {
            Alert.alert('Info', 'Kommer snart', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        }}>
        <Image
          source={CART_ICON}
          style={{
            tintColor: route.name === 'CartScreen' ? '#6080A0' : '',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if(Platform.OS === "android"){
            ToastAndroid.show('Kommer snart', ToastAndroid.LONG);
            // props.navigation.navigate('MapScreen')
          } else {
            Alert.alert('Info', 'Kommer snart', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        }}>
        <Image source={HAMBURGER_ICON} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('ProfileScreen')}>
        <LinearGradient
          colors={['#00B4E4', '#30C9AA']}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 27,
            backgroundColor: '#FFFFFF',
            padding: 10,
            marginRight: 20,
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              width: 45,
              height: 45,
              borderRadius: 22,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            <Image
              source={{
                uri: authStore.user?.profile,
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
              }}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
