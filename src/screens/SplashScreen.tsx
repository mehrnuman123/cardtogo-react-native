/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SPLASH from '../assets/images/splash.png';

import {useStores} from '../store/Store';
import {observer} from 'mobx-react';
import {useIsFocused} from '@react-navigation/native';

const Splash = (props: any) => {
  const isFocused = useIsFocused();
  const authStore = useStores();

  useEffect(() => {
    const init = async () => {
      await authStore.init();
      const slider =
        JSON.parse((await AsyncStorage.getItem('sliderVisited')) || 'false') ||
        undefined;
      const user = authStore.user;
      var navigate = '';
      if (!slider) {
        navigate = 'IntroScreen';
      }
      if (user && Object.keys(user).length) {
        navigate = 'HomeScreen';
      }
      if (slider && !user) {
        navigate = 'AuthScreen';
      }
      if (!user) {
        navigate = 'AuthScreen';
      }
      SplashScreen.hide();
      props.navigation.navigate(navigate);
    };
    if (isFocused) {
      init();
    }
  }, [isFocused]);

  return (
    <View
      style={{
        backgroundColor: '#30c9aa',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground source={SPLASH} style={{height: 200, width: 300}} />
    </View>
  );
};

export default observer(Splash);

// const styles = StyleSheet.create({});
