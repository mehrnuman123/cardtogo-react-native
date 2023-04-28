/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BACK_BUTTON from '../assets/icons/back_button_white.png';
import BUTTONRIGHTARROW from '../assets/icons/button_right_arrow.png';

const AddCardOptionsScreen = (props: any) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('HomeScreen');
          }}>
          <Image source={BACK_BUTTON} />
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Camera');
          }}
          style={{
            width: '80%',
            height: 47,
            backgroundColor: '#30C9AA',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 22,
          }}>
          <View style={{width: 10, height: 10}} />
          <Text
            style={{
              fontSize: 19,
              fontFamily: 'Open Sans',
              color: 'white',
              textAlign: 'center',
            }}>
            Skann strekkode
          </Text>
          <Image
            source={BUTTONRIGHTARROW}
            style={{marginRight: 15, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ManualAddCardScreen');
          }}
          style={{
            width: '80%',
            height: 47,
            backgroundColor: '#30C9AA',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 22,
            marginTop: 50,
          }}>
          <View style={{width: 10, height: 10}} />
          <Text
            style={{
              fontSize: 19,
              fontFamily: 'Open Sans',
              color: 'white',
              textAlign: 'center',
            }}>
            Gå inn manuelt
          </Text>
          <Image
            source={BUTTONRIGHTARROW}
            style={{marginRight: 15, tintColor: 'white'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCardOptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  column: {
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
