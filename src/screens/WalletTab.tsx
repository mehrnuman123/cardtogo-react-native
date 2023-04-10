/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WALLET_ICON from '../assets/icons/wallet_icon.png';
import ADDIDAS from '../assets/images/placeholder.png';
import WALLET_VIEW from '../assets/images/wallet_view_icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletTab = (props: any) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getWalletItems();
  }, []);
  const getWalletItems = async () => {
    const items = await AsyncStorage.getItem('walletitems');
    if (items !== null) {
      var arr = JSON.parse(items);
      setCards(arr);
    } else {
      setCards([]);
    }
  };

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.mainHeader}>
          <View style={styles.headerColumn}>
            <Image source={WALLET_ICON} />
            <Text
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: 24,
                fontWeight: '500',
                color: '#3F3D56',
              }}>
              Wallet
            </Text>
          </View>
          <View style={{width: 1, height: 58, backgroundColor: '#D8E1E8'}} />
          <View style={styles.headerColumn}>
            <Text
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'normal',
                color: '#6080A0',
              }}>
              Total verdi
            </Text>
            <Text
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500',
                color: '#3F3D56',
              }}>
              200 kr
            </Text>
          </View>
          <View style={{width: 1, height: 58, backgroundColor: '#D8E1E8'}} />
          <View style={styles.headerColumn}>
            <Text
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'normal',
                color: '#6080A0',
              }}>
              Kan tjene
            </Text>
            <Text
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500',
                color: '#3F3D56',
              }}>
              320 kr
            </Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
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
          </TouchableOpacity>
        </View>
        {cards.map((item: any) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('CardDetailScreen');
              }}
              style={styles.walletCard}>
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
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Open Sans',
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'normal',
                    color: '#6080A0',
                  }}>
                  Verdi
                </Text>
                <Text
                  style={{
                    fontFamily: 'Open Sans',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '500',
                    color: '#3F3D56',
                  }}>
                  300 KR
                </Text>
              </View>
              <View
                style={{width: 1, height: 58, backgroundColor: '#D8E1E8'}}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Open Sans',
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'normal',
                    color: '#6080A0',
                  }}>
                  Kan tjene
                </Text>
                <Text
                  style={{
                    fontFamily: 'Open Sans',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '500',
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
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* <View style={styles.walletCard}>
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
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'normal',
              color: '#6080A0',
            }}>
            Verdi
          </Text>
          <Text
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500',
              color: '#3F3D56',
            }}>
            300 KR
          </Text>
        </View>
        <View style={{width: 1, height: 58, backgroundColor: '#D8E1E8'}} />
        <View style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'normal',
              color: '#6080A0',
            }}>
            Kan tjene
          </Text>
          <Text
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500',
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
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'normal',
              color: '#6080A0',
            }}>
            Verdi
          </Text>
          <Text
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500',
              color: '#3F3D56',
            }}>
            300 KR
          </Text>
        </View>
        <View style={{width: 1, height: 58, backgroundColor: '#D8E1E8'}} />
        <View style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'normal',
              color: '#6080A0',
            }}>
            Kan tjene
          </Text>
          <Text
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500',
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
      </View> */}
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
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: 'normal',
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
