/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import BACK_BUTTON from '../assets/icons/back_button_white.png';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import UPLOAD from '../assets/icons/upload.png'
import SCANICON from '../assets/icons/scan_icon.png'
import { launchImageLibrary } from 'react-native-image-picker';
import ATTACHEMENT_ICON from '../assets/icons/attachment.png';
import BUTTONRIGHTARROW from '../assets/icons/button_right_arrow.png';
import CALENDAR from '../assets/icons/calendar_big.png';
import ADDIDAS from '../assets/icons/addidas_big.png';
import TAG from '../assets/icons/discount_icon.png';
import PRICE from '../assets/icons/dollar_icon.png';
import CARD from '../assets/icons/gift_card.png';
import LOCK from '../assets/icons/lock.png';
import SERIALNO from '../assets/icons/serial_number_icon.png';
import PLACEHOLDER from '../assets/images/placeholder.png';
import IMAGE_PLACEHOLDER from '../assets/images/image_placeholder.png';
import Constants from '../constants/EnviornmentVariables';
import { CardDataSet } from '../constants/DataSetForManualCards';
import { useStores } from '../store/Store';
import TopBar from '../components/topBar';
import AutocompleteSearch from '../components/AutoComplete';

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
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false)
  const [openCardType, setOpenCardType] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [cardData, setCardData] = useState<any>(null);
  const [valueCardType, setValueCardType] = useState(null);
  const [itemsCardType, setItemsCardType] = useState([
    { label: 'Gavekort', value: 'giftCard' },
    { label: 'Tilgodelapp', value: 'allowanceslip' },
  ]);
  const [openCardCategory, setOpenCardCategory] = useState(false);
  const [manual, setManual] = useState(false)
  const [valueCardCategory, setValueCardCategory] = useState(null);
  const [itemsCardCategory, setItemsCardCategory] = useState([
    { label: 'Hobby', value: 'hobby' },
    { label: 'Sports', value: 'sport' },
  ]);

  useEffect(() => {
    setCardData(selectedItem);
  }, [selectedItem])
  console.log("🚀 ~ file: ManualAddCardScreen.tsx:74 ~ useEffect ~ selectedItem:", cardData);

  const getImageBlob = (uri: string, mime: string, fileName: string) => {
    return {
      uri: uri,
      type: mime,
      name: fileName || 'image.jpg',
    };
  };

  useEffect(() => {

    if (imageOne !== "" || imageTwo !== "") {
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
          pin: pin,
          isListed: false,
          isActive: true,
          photoUrl: cardData.profileUrl ? cardData.profileUrl : JSON.stringify(photos),
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
              setSubmitting(false);
              props.navigation.navigate('WalletTab');
            } else {
              if (result?.response?.DESCRIPTION !== "Card is already exist in wallet") {
                if (Platform.OS === "android") {
                  ToastAndroid.show(
                    result.response.DESCRIPTION,
                    ToastAndroid.SHORT,
                  );
                } else {
                  Alert.alert("Info", result.response.DESCRIPTION);
                }
                setSubmitting(false);
                props.navigation.navigate('WalletTab');
              } else {
                if (Platform.OS === "android") {
                  ToastAndroid.show(
                    result.response.DESCRIPTION,
                    ToastAndroid.SHORT,
                  );
                } else {
                  Alert.alert("Info", result.response.DESCRIPTION);
                }
                setSubmitting(false);
                props.navigation.navigate('HomeScreen');
              }
            }
          })
          .catch(error => {
            setSubmitting(false);
            if (Platform.OS === "android") {
              ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);

            } else {
              Alert.alert("Info", JSON.stringify(error));
            }
            console.log('error', error);
          });
      } else {
        setSubmitting(false);
        if (Platform.OS === "android") {
          ToastAndroid.show('Serienummer og pris er obligatoriske', ToastAndroid.LONG);
        } else {
          Alert.alert("Info", 'Serienummer og pris er obligatoriske');
        }
      }
    }
  }, [responseImage, imageOne, imageTwo]);

  const addCard = async () => {

    setSubmitting(true);
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
          console.log('data url 1 ==>>>>', data);
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
            console.log('data url 2 ==>>>>', data);
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
      if (Platform.OS === "android") {
        ToastAndroid.show('Kortet ditt er sendt inn for vurdering', ToastAndroid.LONG);
      } else {
        Alert.alert('Kortet ditt er sendt inn for vurdering');
      }
    } else {
      setSubmitting(false);
      if (Platform.OS === "android") {
        ToastAndroid.show('Velg minst ett bilde', ToastAndroid.LONG);
      } else {
        Alert.alert("Info", 'Velg minst ett bilde');
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={'height'}>
        <View style={{ height: '100%' }}>
          <TopBar backEnable={true} navigation={props.navigation} />
          <View style={styles.column}>

            {/* <View
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(5),
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
                        marginLeft: index === 0 ? hp(1) : 0,
                      }}>
                      <View style={styles.innerCircle}>
                        <Image
                          source={{ uri: item.uri }}
                          resizeMode="contain"
                          style={{
                            width: hp(8),
                            height: hp(8),
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
                            width: hp(6),
                            height: hp(6),
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
                          width: hp(7),
                          height: hp(7),
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
                  marginRight: hp(2)
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
                      if (result.didCancel) {
                        if (Platform.OS === "android") {
                          ToastAndroid.show('Velg minst 2 bilder av kortet', ToastAndroid.LONG);
                          // props.navigation.navigate('MapScreen')
                        } else {
                          Alert.alert('Info', 'Velg minst 2 bilder av kortet', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                          ]);
                        }
                        return;
                      }
                      if (result.errorMessage) {
                        if (Platform.OS === "android") {
                          ToastAndroid.show('Noe gikk galt', ToastAndroid.LONG);
                          // props.navigation.navigate('MapScreen')
                        } else {
                          Alert.alert('Info', 'Noe gikk galt', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                          ]);
                        }
                        return;
                      }
                      setResponseImage(result.assets);
                    }
                  }}
                  style={styles.addButton}>
                  <Image
                    source={ATTACHEMENT_ICON}
                    style={{ width: hp(3), height: hp(3) }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    marginTop: 5,
                    marginRight: 20,
                  }}>
                  Legg ved bilder
                </Text>
              </View>
            </View> */}
            <View style={styles.scannerContainer}>
              <Text style={{
                fontSize: hp(3.5), fontFamily: 'OpenSans-Regular',
                color: '#6080A0',
              }}>
                Legg til info
              </Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => props.navigation.navigate('CameraScreen')} >
                  <Image
                    source={SCANICON}
                    style={{ width: hp(9), height: hp(9), }}
                  />
                </TouchableOpacity>
                <Image
                  source={UPLOAD}
                  style={{ width: hp(9), height: hp(9), marginRight: hp(6) }}
                />

              </View>
            </View>
            <View style={{ marginTop: hp(-5) }}>
              <AutocompleteSearch setManual={setManual} setSelected={setSelectedItem} />
            </View>
            <View style={styles.formContainer}>
              {!manual ? <Image source={cardData?.pictureUrl ? { uri: cardData?.pictureUrl } : IMAGE_PLACEHOLDER} style={styles.mainImage} resizeMode='cover' /> :
                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                  {responseImage ? (
                    responseImage.map((item: any, index: number) => {
                      return item.uri ? (
                        <View
                          key={index.toString()}
                          style={{
                            ...styles.whiteCircle,
                            marginLeft: index === 0 ? hp(1) : 0,
                          }}>
                          <View style={styles.innerCircle}>
                            <Image
                              source={{ uri: item.uri }}
                              resizeMode="contain"
                              style={{
                                width: hp(8),
                                height: hp(8),
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
                                width: hp(7),
                                height: hp(7),
                                // tintColor: '#6080A0',
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
                              width: hp(7),
                              height: hp(7),
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
                              width: hp(7),
                              height: hp(7),
                              // tintColor: '#6080A0',
                            }}
                          />
                        </View>
                      </View>
                    </>
                  )}
                  <TouchableOpacity

                    onPress={async () => {
                      const result = await launchImageLibrary({
                        selectionLimit: 2,
                        mediaType: 'photo',
                        includeBase64: false,
                        includeExtra: true,
                      });
                      if (result.assets) {
                        if (result.didCancel) {
                          if (Platform.OS === "android") {
                            ToastAndroid.show('Velg minst 2 bilder av kortet', ToastAndroid.LONG);
                            // props.navigation.navigate('MapScreen')
                          } else {
                            Alert.alert('Info', 'Velg minst 2 bilder av kortet', [
                              { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ]);
                          }
                          return;
                        }
                        if (result.errorMessage) {
                          if (Platform.OS === "android") {
                            ToastAndroid.show('Noe gikk galt', ToastAndroid.LONG);
                            // props.navigation.navigate('MapScreen')
                          } else {
                            Alert.alert('Info', 'Noe gikk galt', [
                              { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ]);
                          }
                          return;
                        }
                        setResponseImage(result.assets);
                      }
                    }}
                    style={styles.addButton}>
                    <Image
                      source={ATTACHEMENT_ICON}
                      style={{ width: hp(3), height: hp(3) }}
                    />
                  </TouchableOpacity>
                </View>}

              <View style={{ height: hp(36), marginTop: hp(2) }}>
                <ScrollView>
                  <View
                    style={styles.textInputView}>
                    <Image
                      source={SERIALNO}
                      style={{ width: 30, height: 25, marginLeft: 15 }}
                    />
                    <TextInput
                      value={props?.route?.params?.code ? props?.route?.params?.code : serialNo}
                      placeholder="Skriv inn serienummer"
                      onChangeText={(text: any) => {
                        setSerialNo(text);
                      }}
                      placeholderTextColor={'#6080A0'}
                      style={styles.textInput}
                    />
                  </View>
                  <View
                    style={styles.textInputView}>
                    <Image
                      source={LOCK}
                      style={{ width: 25, height: 30, marginLeft: 15 }}
                    />
                    <TextInput
                      value={pin}
                      placeholder="password/CVC"
                      onChangeText={(text: any) => {
                        setPin(text);
                      }}
                      placeholderTextColor={'#6080A0'}
                      style={styles.textInput}
                    />
                  </View>
                  <View
                    style={styles.textInputView}>
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
                        const price = text.replace(/[^0-9]/g, '')
                        if (price) {
                          setPrice(JSON.parse(price));
                        } else {
                          setPrice(price);
                        }
                      }}
                      placeholderTextColor={'#6080A0'}
                      style={styles.textInput}
                      keyboardType="number-pad"
                    />
                  </View>
                  {/* <View
                    style={styles.textInputView}>
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
                      style={styles.textInput}
                    />
                  </View> */}
                  <TouchableOpacity
                    onPress={() => setOpen(!open)}
                    style={styles.textInputView}>
                    <Image
                      source={CALENDAR}
                      style={{
                        width: 25,
                        height: 25,
                        marginLeft: 15,
                        tintColor: '#B7C7D7',
                      }}
                    />
                    <Text style={styles.textInput}>{date.toDateString()}</Text>
                    <DatePicker
                      modal
                      mode='date'
                      locale='fr'
                      open={open}
                      date={date}
                      onConfirm={(date) => {
                        setDate(date);
                        const dateObj = new Date(date);
                        const year = dateObj.getFullYear();
                        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
                        const day = ("0" + dateObj.getDate()).slice(-2);
                        const formattedDateString = `${year}-${month}-${day}`;
                        setOpen(false)
                        setExpiry(formattedDateString)
                      }}
                      onCancel={() => {
                        setOpen(false)
                      }}
                    />
                  </TouchableOpacity>
                  {/* <View
                    style={styles.textInputView}>
                    <Image
                      source={CARD}
                      style={styles.cardImage}
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
                        backgroundColor: '#FFFFFF',
                        borderWidth: 0,
                        borderTopRightRadius: hp(2),
                        borderBottomRightRadius: hp(2),
                        // elevation: 0.5,
                      }}
                      textStyle={{
                        fontSize: hp(1.6),
                        fontFamily: 'OpenSans-Regular',
                        marginLeft: 20,
                        textAlign: 'left',
                        color: '#6080A0',
                      }}
                      placeholderStyle={{
                        fontSize: hp(1.6),
                        fontFamily: 'OpenSans-Regular',
                        marginLeft: 20,
                        textAlign: 'left',
                        color: '#6080A0',
                      }}
                    />
                  </View> */}
                  <View
                    style={styles.textInputView}>
                    <Image
                      source={CARD}
                      style={styles.cardImage}
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
                        backgroundColor: '#FFFFFF',
                        borderWidth: 0,
                        borderTopRightRadius: hp(2),
                        borderBottomRightRadius: hp(2),
                      }}
                      textStyle={styles.textInput}
                      placeholderStyle={{
                        fontSize: hp(1.6),
                        fontFamily: 'OpenSans-Regular',
                        marginLeft: 20,
                        textAlign: 'left',
                        color: '#6080A0',
                      }}
                    />
                  </View>

                </ScrollView>
              </View>
              <TouchableOpacity
                disabled={submitting}
                onPress={() => {
                  if (manual) {
                    addCard();
                  } else {
                    setResponseImage(cardData.profileUrl)
                    setImageOne(cardData.profileUrl)
                  }

                }}
                style={{
                  width: '80%',
                  height: hp(6),
                  backgroundColor: '#30C9AA',
                  display: 'flex',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: submitting ? 'center' : 'flex-end',
                  alignItems: 'center',
                  borderRadius: 22,
                  marginTop: hp(2)
                }}>
                {!submitting ?
                  <>
                    <Text
                      style={{
                        fontSize: hp(1.6),
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
                  </> : <ActivityIndicator color={'#FFFFFF'} />}
              </TouchableOpacity>
            </View>
          </View>
        </View >
      </KeyboardAvoidingView >
    </View >
  );
};

export default ManualAddCardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F5F8',
  },
  column: {
    display: 'flex',
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
    width: hp(12),
    height: hp(12),
    borderRadius: hp(10),
    backgroundColor: '#F2F5F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#E6ECF2',
    width: hp(4.5),
    height: hp(4.5),
    borderRadius: hp(2),
    justifyContent: 'center',
    marginRight: hp(3),
    marginTop: hp(6),
    alignItems: 'center',

  },
  textInputView: {
    backgroundColor: '#ffffff',
    borderColor: "#E6ECF2",
    borderWidth: 1,
    width: '80%',
    height: hp(6.5),
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(1.5),
    marginVertical: 10,
  },
  textInput: {
    fontSize: hp(1.6),
    fontFamily: 'OpenSans-Regular',
    color: '#6080A0',
    marginLeft: hp(3.5),
    width: "80%",
    textAlign: 'left',
  },
  cardImage: {
    width: hp(4),
    height: hp(4),
    marginLeft: 12,
    tintColor: '#B7C7D7',
  },
  scannerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    width: '75%',
    marginTop: hp(-1),
    position: 'absolute',
    top: 0
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: wp(4)
  },
  formContainer: {
    marginTop: hp(-10),
    backgroundColor: '#FFFFFF',
    height: hp(70),
    width: "100%",
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
    zIndex: hp(-1),
  },
  mainImage: {
    height: hp(17),
    width: hp(35),
    borderRadius: hp(2.5),
    alignSelf: "center",
    marginTop: hp(2)
  }
});
