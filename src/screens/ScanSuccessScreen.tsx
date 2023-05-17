/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import BACK_BUTTON from '../assets/icons/back_button_white.png';
import ADDIDAS from '../assets/icons/addidas_logo.png';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import COMPLETED from '../assets/icons/completed_icon.png';
import DOLLAR from '../assets/icons/dollar_icon.png';
import BARCODE from '../assets/images/barcode_sample.png';
import BINARY from '../assets/icons/binary_icon.png';
import LOCATION from '../assets/icons/location_icon.png';
import CALENDAR from '../assets/icons/calendar_icon.png';
import LinearGradient from 'react-native-linear-gradient';
import BUTTONRIGHTARROW from '../assets/icons/button_right_arrow.png';
import { useStores } from '../store/Store';

const ScanSuccessScreen = (props: any) => {
  const authStore = useStores();
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [now, setDate] = useState(new Date());

  const handleDigWallet = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${authStore.authToken}`,
    );

    var raw = JSON.stringify({
      serialNumber: props.route.params.code.substring(2, 8),
      manufacturar: company,
      balance: price,
      type: 'gift-card',
      category: '',
      expiry: '',
      isListed: false,
      isActive: true,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://20.172.135.207/api/api/v1/card/add-wallet',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.response.CODE === 200) {
          console.log('card add ==>', result);
          props.navigation.navigate('WalletTab');
        } else {
          if (Platform.OS === "android") {
            ToastAndroid.show(result.response.DESCRIPTION, ToastAndroid.SHORT);
          } else {
            Alert.alert("Info", result.response.DESCRIPTION);
          }
          props.navigation.navigate('HomeScreen');
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#F2F5F8'} />
      <View
        style={{
          position: 'absolute',
          top: hp(4),
          left: hp(1),
          zIndex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('HomeScreen');
          }}>
          <Image source={BACK_BUTTON} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <ScrollView
          style={{ width: '100%', height: '100%' }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Image source={COMPLETED} style={{ marginTop: hp(7), height: hp(9), width: hp(9) }} />
          <View>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                fontSize: hp(2),
                color: '#3F3D56',
                marginTop: hp(3)
              }}>
              Takk for handelen!
            </Text>
          </View>
          <View style={{ width: hp(25) }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: hp(1.9),
                color: '#6080A0',
                textAlign: 'center',
                marginTop: hp(2),
              }}>
              “DIG” å gjør en god handel! for mer info sjekk DIG-Wallet
            </Text>
          </View>
          <View
            style={{
              width: '80%',
              height: hp(55),
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#D8E1E8',
              alignItems: 'center',
              marginTop: hp(3),
            }}>
            <LinearGradient
              colors={['#00B4E4', '#30C9AA']}
              start={{ x: 0.0, y: 1.0 }}
              end={{ x: 1.0, y: 1.0 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: hp(13),
                height: hp(13),
                borderRadius: hp(7),
                backgroundColor: '#FFFFFF',
                padding: hp(1),
                marginTop: hp(1),
              }}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  width: hp(8),
                  height: hp(8),
                  borderRadius: hp(4),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={ADDIDAS} style={{ width: hp(12), height: hp(12), borderRadius: hp(10) }} />
              </View>
            </LinearGradient>
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
              <Image
                source={DOLLAR}
                style={{ width: 27, height: 27, marginTop: 5 }}
              />
              <Text
                style={{
                  fontFamily: 'OpenSans-Bold',
                  fontSize: hp(2.7),
                  lineHeight: hp(4),
                  color: '#6080A0',
                  marginLeft: 10,
                }}>
                {price === '' ? '0' : price} KR
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: hp(1.9),
                color: '#6080A0',
              }}>
              {' '}
              Du har spart 100 KR
            </Text>
            <Image
              source={BARCODE}
              style={{ width: hp(17), height: 74, marginTop: 10 }}
            />
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: hp(1.5),
                color: '#6080A0',
              }}>
              {props.route.params?.code ? props.route.params.code : ''}
            </Text>
            <View
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                marginLeft: 105,
              }}>
              {/* <View style={{display: 'flex', flexDirection: 'column'}}>
              <Image source={LOCATION} />
            </View> */}
              {/* <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 10,
              }}>
              <Text>Pin: 6925</Text>
            </View> */}
            </View>
            {/* <View
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              marginTop: 5,
              marginLeft: 110,
            }}>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <Image source={CALENDAR} />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: 10,
              }}>
              <Text>Utløpsdato:</Text>
              <Text style={{marginLeft: 10}}>
                {
                  new Date(now.getFullYear(), now.getMonth() + 1, 1)
                    .toISOString()
                    .split('T')[0]
                }
              </Text>
            </View>
            </View> */}
            <View
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#E6ECF2',
                  width: '80%',
                  height: hp(6),
                  alignSelf: 'center',
                  borderRadius: 50,
                  marginVertical: 10,
                }}>
                <TextInput
                  value={company}
                  placeholder="Gå inn i selskapet"
                  onChangeText={(text: any) => {
                    console.log('====================================');
                    console.log('company ==>', text);
                    console.log('====================================');
                    setCompany(text);
                  }}
                  placeholderTextColor={'#6080A0'}
                  style={styles.textInput}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#E6ECF2',
                  width: '80%',
                  height: hp(6),
                  alignSelf: 'center',
                  borderRadius: 50,
                }}>
                <TextInput
                  value={price}
                  placeholder="Skriv inn pris"
                  onChangeText={(text: any) => {
                    console.log('====================================');
                    console.log('price ==>', text);
                    console.log('====================================');
                    setPrice(text);
                  }}
                  placeholderTextColor={'#6080A0'}
                  style={styles.textInput}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleDigWallet()}
            style={{
              width: '80%',
              height: hp(5.2),
              backgroundColor: '#30C9AA',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderRadius: 22,
              marginTop: hp(2)
            }}>
            <Text
              style={{
                fontSize: hp(2.3),
                fontFamily: 'OpenSans-Regular',
                color: 'white',
                textAlign: 'center',
                marginRight: '30%',
              }}>
              DIG-Wallet
            </Text>
            <Image
              source={BUTTONRIGHTARROW}
              style={{ marginRight: 15, tintColor: 'white' }}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default ScanSuccessScreen;

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    backgroundColor: '#F6F8FA',
    alignItems: 'center',
  },
  textInput: {
    fontSize: hp(1.8),
    fontFamily: 'OpenSans-Regular',
    textAlign: 'left',
    marginTop: hp(1),
    marginLeft: hp(3.5),
    color: '#6080A0',
    lineHeight: hp(3)
  }
});
