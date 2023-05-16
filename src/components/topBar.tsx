/* eslint-disable react-native/no-inline-styles */
import { View, Image, TouchableOpacity, Text, Alert, ToastAndroid, Platform } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import LOGO from '../assets/icons/logo.png';
import LOCATION_ICON from '../assets/icons/location_icon.png';
import NOTIFICATION_ICON from '../assets/icons/notification_icon.png';
import CART_ICON from '../assets/icons/cart_icon.png';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import HAMBURGER_ICON from '../assets/icons/hamburger_icon.png';
import PROFILE from '../assets/icons/profile.png';
import BACK from '../assets/icons/back_button_white.png';
import { useStores } from '../store/Store';
import LinearGradient from 'react-native-linear-gradient';
import { title } from 'process';

const TopBar = (props: any) => {
  const route = useRoute();
  const authStore = useStores();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: hp(13),
        marginTop: hp(2.5),
      }}>
      {props.backEnable ? (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('HomeScreen')}>
          <Image source={BACK} style={{ width: 70, height: 70 }} />
        </TouchableOpacity>
      ) : (
        <Image source={LOGO} resizeMode='stretch' style={{ height: hp(13), width: hp(13), marginTop: hp(3) }} />
      )}

      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === "android") {
            ToastAndroid.show('Kommer snart', ToastAndroid.LONG);
            // props.navigation.navigate('MapScreen')
          } else {
            Alert.alert('Info', 'Kommer snart', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          }
        }}>
        <Image
          source={LOCATION_ICON}
          style={{ tintColor: route.name === 'MapScreen' ? '#6080A0' : '', marginTop: hp(3) }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === "android") {
            ToastAndroid.show('Kommer snart', ToastAndroid.LONG);
            // props.navigation.navigate('MapScreen')
          } else {
            Alert.alert('Info', 'Kommer snart', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          }
        }}>
        <Image
          source={NOTIFICATION_ICON}
          style={{
            tintColor: route.name === 'NotificationScreen' ? '#6080A0' : '',
            marginTop: hp(3)
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === "android") {
            ToastAndroid.show('Kommer snart', ToastAndroid.LONG);
            // props.navigation.navigate('MapScreen')
          } else {
            Alert.alert('Info', 'Kommer snart', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          }
        }}>
        <Image
          source={CART_ICON}
          style={{
            tintColor: route.name === 'CartScreen' ? '#6080A0' : '',
            marginTop: hp(3)
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === "android") {
            ToastAndroid.show('Kommer snart', ToastAndroid.LONG);
            // props.navigation.navigate('MapScreen')
          } else {
            Alert.alert('Info', 'Kommer snart', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          }
        }}>
        <Image source={HAMBURGER_ICON} style={{ marginTop: hp(3) }} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('ProfileScreen')}>
        <LinearGradient
          colors={['#00B4E4', '#30C9AA']}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: hp(6),
            height: hp(6),
            borderRadius: 27,
            backgroundColor: '#FFFFFF',
            padding: 10,
            marginRight: 20,
            marginTop: hp(3)
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              width: hp(5),
              height: hp(5),
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
                width: hp(4.2),
                height: hp(4.2),
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
