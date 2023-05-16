/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";

import React, { useEffect, useState } from 'react';
import WALLET_ICON from '../assets/icons/wallet_icon.png';
import PLACEHOLDER from '../assets/images/placeholder.png';
import WALLET_VIEW from '../assets/images/wallet_view_icon.png';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useStores } from '../store/Store';
import { useIsFocused } from '@react-navigation/native';
import WalletCard from '../components/walletCard';

const WalletTab = (props: any) => {
  const isFocused = useIsFocused();
  const authStore = useStores();
  const [cards, setCards] = useState([]);
  const [sumOfAllCards, setSumOfAllCards] = useState();
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false)



  const handleRefetch = () => {
    setRefetch(!refetch)
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${authStore.authToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://20.172.135.207/api/api/v1/card/all', requestOptions)
      .then(response => response.json())
      .then((result: any) => {
        if (result.response.CODE === 200) {

          const cards: any = result.data;
          for (var i = 0; i < cards.length; i++) {
            if (cards[i].photo !== null && cards[i].photo !== "[, ]") {
              const photosParsed: string[] = JSON.parse(cards[i].photo);
              cards[i].photo = photosParsed;
            }
          }
          setCards(cards);
          setLoading(false);
          const sum = result.data.reduce(function (a: any, b: any) {
            return JSON.parse(a) + JSON.parse(b.balance);
          }, 0);
          setSumOfAllCards(sum);
        } else {
          if (Platform.OS === "android") {
            ToastAndroid.show(result.response.DESCRIPTION, ToastAndroid.SHORT);
          } else {
            Alert.alert("Info", result.response.DESCRIPTION);
          }
        }
      })
      .catch(error => console.log('error', error));
  }, [authStore.authToken, isFocused, refetch]);

  console.log('=======>>>=========');
  console.log('cards ===>>>', cards);
  console.log('=======>>>=========');


  return (
    <View style={styles.main}>
      {!loading ? (
        <ScrollView>
          <View style={styles.mainHeader}>
            <View style={styles.headerColumn}>
              <Image source={WALLET_ICON} />
              <Text
                style={{
                  fontFamily: 'OpenSans-Medium',
                  textAlign: 'center',
                  fontSize: 24,
                  color: '#3F3D56',
                }}>
                Wallet
              </Text>
            </View>
            <View style={{ width: 1, height: 58, backgroundColor: '#D8E1E8' }} />
            <View style={styles.headerColumn}>
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#6080A0',
                }}>
                Total verdi
              </Text>
              <Text
                style={{
                  fontFamily: 'OpenSans-Medium',
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#3F3D56',
                }}>
                {sumOfAllCards} kr
              </Text>
            </View>
            {/* <View style={{width: 1, height: 58, backgroundColor: '#D8E1E8'}} />
          <View style={styles.headerColumn}>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                textAlign: 'center',
                fontSize: 16,
                color: '#6080A0',
              }}>
              Kan tjene
            </Text>
            <Text
              style={{
                fontFamily: 'OpenSans-Medium',
                textAlign: 'center',
                fontSize: 18,
                color: '#3F3D56',
              }}>
              320 kr
            </Text>
          </View> */}
          </View>
          <View style={styles.buttonRow}>
            {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Alle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: '#30C9AA',
              borderWidth: 0,
              elevation: 5,
            }}>
            <Text style={{...styles.buttonText, color: '#FFFFFF'}}>
              Gavekort
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Tilgodelapp</Text>
          </TouchableOpacity> */}
          </View>
          <FlatList
            data={cards}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
              <WalletCard item={item} key={item.id} refetch={handleRefetch} />
            )}
          />
        </ScrollView>
      ) : (
        /* <View style={styles.walletCard}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={ADDIDAS}
            style={{width: 76, height: 76}}
            resizeMode={'contain'}
          />
        </View>
        <View style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              textAlign: 'center',
              fontSize: 16,
              color: '#6080A0',
            }}>
            Verdi
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans-Medium',
              textAlign: 'center',
              fontSize: 18,
              color: '#3F3D56',
            }}>
            300 KR
          </Text>
        </View>
        <View style={{width: 1, height: 58, backgroundColor: '#D8E1E8'}} />
        <View style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              textAlign: 'center',
              fontSize: 16,
              color: '#6080A0',
            }}>
            Kan tjene
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans-Medium',
              textAlign: 'center',
              fontSize: 18,
              color: '#3F3D56',
            }}>
            220
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Image source={WALLET_VIEW} />
        </View>
      </View>
      <View style={styles.walletCard}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={ADDIDAS}
            style={{width: 76, height: 76}}
            resizeMode={'contain'}
          />
        </View>
        <View style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              textAlign: 'center',
              fontSize: 16,
              color: '#6080A0',
            }}>
            Verdi
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans-Medium',
              textAlign: 'center',
              fontSize: 18,
              color: '#3F3D56',
            }}>
            300 KR
          </Text>
        </View>
        <View style={{width: 1, height: 58, backgroundColor: '#D8E1E8'}} />
        <View style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              textAlign: 'center',
              fontSize: 16,
              color: '#6080A0',
            }}>
            Kan tjene
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans-Medium',
              textAlign: 'center',
              fontSize: 18,
              color: '#3F3D56',
            }}>
            220
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Image source={WALLET_VIEW} />
        </View>
      </View> */ <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color="#30C9AA" />
        </View>
      )}
    </View>
  );
};

export default WalletTab;

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#F6F8FA',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
  mainHeader: {
    width: '90%',
    height: 105,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8E1E8',
    marginTop: 20,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  headerColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    backgroundColor: '#F6F8FA',
    borderColor: '#6080A0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#6080A0',
  },
  walletCard: {
    width: '90%',
    height: 105,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8E1E8',
    marginTop: 20,
    marginHorizontal: 20,
    display: 'flex',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  noCardAvailable: {
    fontSize: hp(2),
    textAlign: 'center',
    marginTop: hp(25),
    fontFamily: 'OpenSans-Regular',
    color: '#6080A0',
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
});
