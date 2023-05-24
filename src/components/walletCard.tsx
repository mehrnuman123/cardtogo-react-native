import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import WALLET_VIEW from '../assets/images/wallet_view_icon.png';
import PLACEHOLDER from '../assets/icons/id-card.png';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import { useStores } from '../store/Store';
const FImage = createImageProgress(FastImage);




const WalletCard = ({ item, refetch }: any) => {
  console.log("🚀 ~ file: walletCard.tsx:25 ~ WalletCard ~ item:", item?.photo)
  const authStore = useStores();
  const handleDeleteCard = () => {
    console.log("Yes")
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${authStore.authToken}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };
    console.log("Yes1")

    fetch(`http://20.172.135.207/api/api/v1/card/${item.id}`, requestOptions)
      .then(response =>
        response.json()
      )
      .then((result: any) => {
        if (result.response.CODE === 200) {
          refetch();
          if (Platform.OS === "android") {
            ToastAndroid.show('Kortet ble slettet', ToastAndroid.SHORT);
          } else {
            Alert.alert("Info", 'Kortet ble slettet');
          }

        } else {
          if (Platform.OS === "android") {
            ToastAndroid.show(result.response.DESCRIPTION, ToastAndroid.SHORT);
          } else {
            Alert.alert("Info", result.response.DESCRIPTION);
          }
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleLongPress = () => {
    Alert.alert('Slette', 'Er du sikker på at du vil slette dette kortet?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Slette', onPress: () => {
          handleDeleteCard()
        }
      },
    ]);
  };

  return (
    <TouchableOpacity
      onLongPress={handleLongPress}
      key={item.id}
      onPress={() => {
        if (Platform.OS === "android") {
          ToastAndroid.show('Kommer snart', ToastAndroid.LONG);
          // props.navigation.navigate('MapScreen')
        } else {
          Alert.alert('Info', 'Kommer snart', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
        // if (item.isListed) {
        //   ToastAndroid.show(
        //     'Allerede lagt til Market Place',
        //     ToastAndroid.SHORT,
        //   );
        // } else {
        //   props.navigation.navigate('CardDetailScreen', {
        //     card: item,
        //   });
        // }
      }}
      style={styles.walletCard}>
      {!item.photo || item.photo === '[, ]' ? <View
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={PLACEHOLDER}
          style={{ width: 76, height: 76 }}
          resizeMode={'contain'}
        />
      </View> :
        <View style={styles.circle}>
          <FImage
            source={{ uri: item?.photo?.toString() }}
            style={styles.image}
            resizeMode='cover'
            indicator={Progress.CircleSnail}
          />
          <View style={styles.fixCircleClipping} />
        </View>
        // <View style={{ borderRadius: hp(2) }}>
        //   <FImage
        //     source={{ uri: item?.photo[0] }}
        //     style={styles.image}
        //     resizeMode='cover'
        //     indicator={Progress.CircleSnail}
        //   />
        // </View>
      }
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: hp(2),
        }}>
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
            fontWeight: "700",
            color: '#3F3D56',
          }}>
          {item.balance} KR
        </Text>
      </View>
      <View style={{ width: 1, height: 58, backgroundColor: '#D8E1E8', marginLeft: hp(2) }} />

      {/* <View
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
              </View> */}
      <View
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 20,
        }}>
        <Image source={WALLET_VIEW} style={{ width: hp(4), height: hp(4), alignSelf: 'flex-end' }} />
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  walletCard: {
    width: '90%',
    height: hp(15),
    borderRadius: hp(2),
    borderWidth: 1,
    borderColor: '#D8E1E8',
    marginTop: hp(3),
    marginHorizontal: hp(3),
    display: 'flex',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: hp(3),
    paddingHorizontal: 10,
  },
  image: {
    width: hp(12.6),
    height: hp(12.6),
    border: 1,
  },
  circle: {
    width: hp(12.6), height: hp(12.6),
    marginTop: hp(-2),
    borderRadius: hp(2), zIndex: 1,
    overflow: "hidden"
  },
  fixCircleClipping: { position: 'absolute', top: -hp(1), bottom: -hp(1), right: -hp(1), left: -hp(1), borderRadius: hp(2), borderWidth: hp(1), borderBottomLeftRadius: hp(2) },

});

export default WalletCard;
