/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BACK_BUTTON from '../assets/icons/back_button_white.png';

import ATTACHEMENT_ICON from '../assets/icons/attachment.png';
import PLACEHOLDER from '../assets/images/placeholder.png';
import BUTTONRIGHTARROW from '../assets/icons/button_right_arrow.png';
import { useStores } from '../store/Store';
import SERIALNO from '../assets/icons/serial_number_icon.png';
import LOCK from '../assets/icons/lock.png';
import TAG from '../assets/icons/discount_icon.png';
import PRICE from '../assets/icons/dollar_icon.png';
import CALENDAR from '../assets/icons/calendar_big.png';
import CARD from '../assets/icons/gift_card.png';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Constants from '../constants/EnviornmentVariables';

const ManualAddCardScreen = (props: any) => {
  const URL = Constants.BASE_URL;
  const authStore = useStores();
  const [responseImage, setResponseImage] = useState<any>(null);
  const [serialNo, setSerialNo] = useState('');
  const [pin, setPin] = useState('');
  const [imageOne, setImageOne] = useState('');
  const [imageTwo, setImageTwo] = useState('');
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState<any>();
  const [expiry, setExpiry] = useState('');
  const [openCardType, setOpenCardType] = useState(false);
  const [valueCardType, setValueCardType] = useState(null);
  const [itemsCardType, setItemsCardType] = useState([
    { label: 'Gavekort', value: 'giftCard' },
    { label: 'Tilgodelapp', value: 'allowanceslip' },
  ]);
  const [openCardCategory, setOpenCardCategory] = useState(false);
  const [valueCardCategory, setValueCardCategory] = useState(null);
  const [itemsCardCategory, setItemsCardCategory] = useState([
    { label: 'Hobby', value: 'hobby' },
    { label: 'Sports', value: 'sport' },
  ]);
  const getImageBlob = (uri: string, mime: string, fileName: string) => {
    return {
      uri: uri,
      type: mime,
      name: fileName || 'image.jpg',
    };
  };

  useEffect(()=> {
    if((responseImage?.length > 1 && imageOne !== "" && imageTwo !== "") || (responseImage?.length === 1 && (imageOne !== "" || imageTwo !== ""))) {
      if (serialNo && price) {
        var myHeaders = new Headers();
        // var data = new FormData();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${authStore.authToken}`);
        var photos = []
        if (imageOne !== "") {
          photos.push(imageOne);
        }
        if (imageTwo !== "") {
          photos.push(imageTwo);
        }
        var raw = JSON.stringify({
          serialNumber: serialNo,
          manufacturar: company,
          balance: price,
          type: valueCardType,
          category: valueCardCategory,
          expiry: expiry,
          isListed: false,
          isActive: true,
          photoUrl: JSON.stringify(photos),
        });

        console.log('====================================');
        console.log('raw ===>>>>>>', raw);
        console.log('====================================');
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
            console.log('result ==>', result);
            if (result?.response?.CODE === 200 && result?.response?.DESCRIPTION !== "Card is already exist in wallet") {
              console.log('card add ==>', result);
              props.navigation.navigate('WalletTab');
            } else {
              if(result?.response?.DESCRIPTION !== "Card is already exist in wallet") {
                ToastAndroid.show(
                  result.response.DESCRIPTION,
                  ToastAndroid.SHORT,
                );
                props.navigation.navigate('WalletTab');  
              } else {
                ToastAndroid.show(
                  result.response.DESCRIPTION,
                  ToastAndroid.SHORT,
                );
                props.navigation.navigate('HomeScreen');
              }
            }
          })
          .catch(error => {
            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
            console.log('error', error);
          });
      } else {
        ToastAndroid.show(
          'Serienummer og pris er obligatoriske',
          ToastAndroid.LONG,
        );
      }
    }
  }, [responseImage, imageOne, imageTwo]);

  const addCard = async () => {
    console.log('====================================');
    console.log('responseImage ===>>>', responseImage);
    console.log('====================================');
    if (responseImage && responseImage.length > 0) {
      var headers = new Headers();
      headers.append('Authorization', `Bearer ${authStore.authToken}`);
      // headers.append('Content-Type', 'multipart/form-data');
      const formData = new FormData();
      formData.append(
        'file',
        getImageBlob(
          responseImage[0].uri,
          responseImage[0].type,
          responseImage[0].fileName,
        ),
      );
      var options = {
        method: 'PUT',
        headers: headers,
        body: formData,
        redirect: 'follow',
      };
      fetch(
        `http://20.172.135.207/api/api/v1/upload/card/${authStore.user?.id}`,
        options,
      )
        .then(response => response.json())
        .then(data => {
          console.log('====================================');
          console.log('data url ==>>>>', data);
          console.log('====================================');
          if (data.response.CODE === 200) {
            setImageOne(data.data);
          }
        })
        .catch(error => {
          console.log('====================================');
          console.log('error 1 ==>', error);
          console.log('====================================');
        });
      if (responseImage.length > 1) {
        const formDataSec = new FormData();
        formDataSec.append(
          'file',
          getImageBlob(
            responseImage[1].uri,
            responseImage[1].type,
            responseImage[1].fileName,
          ),
        );
        var options = {
          method: 'PUT',
          headers: headers,
          body: formData,
          redirect: 'follow',
        };
        fetch(
          `http://20.172.135.207/api/api/v1/upload/card/${authStore.user?.id}`,
          options,
        )
          .then(response => response.json())
          .then(data => {
            console.log('====================================');
            console.log('data url ==>>>>', data);
            console.log('====================================');
            if (data.response.CODE === 200) {
              setImageTwo(data.data);
            }
          })
          .catch(error => {
            console.log('====================================');
            console.log('error 2==>', error);
            console.log('====================================');
          });
      }
    } else {
      ToastAndroid.show('Velg minst ett bilde', ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={'height'}>
        <ScrollView style={{ height: '100%' }}>
          <View style={styles.column}>
            <View
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('AddCardOptionsScreen');
                }}>
                <Image source={BACK_BUTTON} />
              </TouchableOpacity>
              {responseImage ? (
                responseImage.map((item: any, index: number) => {
                  return item.uri ? (
                    <View
                      key={index.toString()}
                      style={{
                        ...styles.whiteCircle,
                        marginLeft: index === 0 ? 30 : 0,
                      }}>
                      <View style={styles.innerCircle}>
                        <Image
                          source={{ uri: item.uri }}
                          resizeMode="contain"
                          style={{
                            width: 65,
                            height: 65,
                          }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        ...styles.whiteCircle,
                        marginLeft: index === 0 ? 30 : 0,
                      }}>
                      <View style={styles.innerCircle}>
                        <Image
                          source={PLACEHOLDER}
                          style={{
                            width: 60,
                            height: 60,
                            tintColor: '#6080A0',
                          }}
                        />
                      </View>
                    </View>
                  );
                })
              ) : (
                <>
                  <View
                    style={{
                      ...styles.whiteCircle,
                      marginLeft: 30,
                    }}>
                    <View style={styles.innerCircle}>
                      <Image
                        source={PLACEHOLDER}
                        style={{
                          width: 70,
                          height: 70,
                          // tintColor: '#6080A0',
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      ...styles.whiteCircle,
                      marginLeft: 0,
                    }}>
                    <View style={styles.innerCircle}>
                      <Image
                        source={PLACEHOLDER}
                        style={{
                          width: 70,
                          height: 70,
                          // tintColor: '#6080A0',
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    const result = await launchImageLibrary({
                      selectionLimit: 2,
                      mediaType: 'photo',
                      includeBase64: false,
                      includeExtra: true,
                    });
                    if (result.assets) {
                      console.log('====================================');
                      console.log(
                        'image picker result ===>>>',
                        result.assets ? result.assets : [],
                      );
                      console.log('====================================');
                      if (result.didCancel) {
                        ToastAndroid.show(
                          'Please pick atleast 2 photos of the card',
                          ToastAndroid.SHORT,
                        );
                        return;
                      }
                      if (result.errorMessage) {
                        ToastAndroid.show(
                          result.errorMessage,
                          ToastAndroid.SHORT,
                        );
                        return;
                      }
                      setResponseImage(result.assets);
                    }
                  }}
                  style={styles.addButton}>
                  <Image
                    source={ATTACHEMENT_ICON}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
                {/* <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    marginTop: 5,
                    marginRight: 20,
                  }}>
                  Legg ved bilder
                </Text> */}
              </View>
            </View>
            <ScrollView
              style={{ display: 'flex', flex: 1, width: '100%', marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: '#E6ECF2',
                  width: '80%',
                  height: 55,
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginVertical: 10,
                }}>
                <Image
                  source={SERIALNO}
                  style={{ width: 30, height: 25, marginLeft: 15 }}
                />
                <TextInput
                  value={serialNo}
                  placeholder="Skriv inn serienummer"
                  onChangeText={(text: any) => {
                    setSerialNo(text);
                  }}
                  placeholderTextColor={'#6080A0'}
                  style={{
                    fontSize: 10,
                    fontFamily: 'OpenSans-Regular',
                    marginLeft: 30,
                    textAlign: 'left',
                    color: '#6080A0',
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#E6ECF2',
                  width: '80%',
                  height: 55,
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginVertical: 10,
                }}>
                <Image
                  source={PRICE}
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 15,
                    tintColor: '#B7C7D7',
                  }}
                />
                <TextInput
                  value={price?.toString()}
                  placeholder="Skriv inn pris"
                  onChangeText={(text: any) => {
                    if (text) {
                      setPrice(JSON.parse(text));
                    } else {
                      setPrice(text);
                    }
                  }}
                  placeholderTextColor={'#6080A0'}
                  style={{
                    fontSize: 10,
                    fontFamily: 'OpenSans-Regular',
                    marginLeft: 30,
                    textAlign: 'left',
                    color: '#6080A0',
                  }}
                  keyboardType="number-pad"
                />
              </View>
              <View
                style={{
                  backgroundColor: '#E6ECF2',
                  width: '80%',
                  height: 55,
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginVertical: 10,
                }}>
                <Image
                  source={TAG}
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 15,
                    tintColor: '#B7C7D7',
                  }}
                />
                <TextInput
                  value={company}
                  placeholder="Gå inn i selskapet"
                  onChangeText={(text: any) => {
                    setCompany(text);
                  }}
                  placeholderTextColor={'#6080A0'}
                  style={{
                    fontSize: 10,
                    fontFamily: 'OpenSans-Regular',
                    marginLeft: 30,
                    textAlign: 'left',
                    color: '#6080A0',
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#E6ECF2',
                  width: '80%',
                  height: 55,
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginVertical: 10,
                }}>
                <Image
                  source={CALENDAR}
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 15,
                    tintColor: '#B7C7D7',
                  }}
                />
                <TextInput
                  value={expiry}
                  placeholder="YYYY-MM-DD"
                  onChangeText={(text: any) => {
                    setExpiry(text);
                  }}
                  placeholderTextColor={'#6080A0'}
                  style={{
                    fontSize: 10,
                    fontFamily: 'OpenSans-Regular',
                    marginLeft: 30,
                    textAlign: 'left',
                    color: '#6080A0',
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#E6ECF2',
                  width: '80%',
                  height: 55,
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginVertical: 10,
                }}>
                <Image
                  source={CARD}
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 12,
                    tintColor: '#B7C7D7',
                  }}
                />
                <DropDownPicker
                  placeholder="Velg en korttype"
                  open={openCardType}
                  value={valueCardType}
                  items={itemsCardType}
                  setOpen={setOpenCardType}
                  setValue={setValueCardType}
                  setItems={setItemsCardType}
                  dropDownDirection="TOP"
                  containerStyle={{
                    width: '85%',
                  }}
                  dropDownContainerStyle={{
                    width: '100%',
                    borderRadius: 10,
                    backgroundColor: '#E6ECF2',
                  }}
                  style={{
                    backgroundColor: '#E6ECF2',
                    borderWidth: 0,
                    // elevation: 0.5,
                  }}
                  textStyle={{
                    fontSize: 10,
                    fontFamily: 'OpenSans-Regular',
                    marginLeft: 20,
                    textAlign: 'left',
                    color: '#6080A0',
                  }}
                  placeholderStyle={{
                    fontSize: 10,
                    fontFamily: 'OpenSans-Regular',
                    marginLeft: 20,
                    textAlign: 'left',
                    color: '#6080A0',
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#E6ECF2',
                  width: '80%',
                  height: 55,
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginVertical: 10,
                }}>
                <Image
                  source={CARD}
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 12,
                    tintColor: '#B7C7D7',
                  }}
                />
                <DropDownPicker
                  placeholder="Velg en kategori"
                  open={openCardCategory}
                  value={valueCardCategory}
                  items={itemsCardCategory}
                  setOpen={setOpenCardCategory}
                  setValue={setValueCardCategory}
                  setItems={setItemsCardCategory}
                  dropDownDirection="TOP"
                  containerStyle={{
                    width: '85%',
                  }}
                  dropDownContainerStyle={{
                    width: '100%',
                    borderRadius: 10,
                    backgroundColor: '#E6ECF2',
                  }}
                  style={{
                    backgroundColor: '#E6ECF2',
                    borderWidth: 0,
                    // elevation: 0.5,
                  }}
                  textStyle={{
                    fontSize: 10,
                    fontFamily: 'OpenSans-Regular',
                    marginLeft: 20,
                    textAlign: 'left',
                    color: '#6080A0',
                  }}
                  placeholderStyle={{
                    fontSize: 10,
                    fontFamily: 'OpenSans-Regular',
                    marginLeft: 20,
                    textAlign: 'left',
                    color: '#6080A0',
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#E6ECF2',
                  width: '80%',
                  height: 55,
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginVertical: 10,
                }}>
                <Image
                  source={LOCK}
                  style={{ width: 25, height: 30, marginLeft: 15 }}
                />
                <TextInput
                  value={pin}
                  placeholder="Skriv inn pin"
                  onChangeText={(text: any) => {
                    setPin(text);
                  }}
                  placeholderTextColor={'#6080A0'}
                  style={{
                    fontSize: 10,
                    fontFamily: 'OpenSans-Regular',
                    marginLeft: 30,
                    textAlign: 'left',
                    color: '#6080A0',
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  addCard();
                }}
                style={{
                  width: '80%',
                  height: 47,
                  backgroundColor: '#30C9AA',
                  display: 'flex',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderRadius: 22,
                }}>
                <Text
                  style={{
                    fontSize: 19,
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ManualAddCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  column: {
    display: 'flex',
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  whiteCircle: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F2F5F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 20,
    marginTop: 50,
    alignItems: 'center',
  },
});
