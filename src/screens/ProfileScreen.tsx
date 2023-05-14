/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import TopBar from '../components/topBar';
import LinearGradient from 'react-native-linear-gradient';
import {useStores} from '../store/Store';
import LOGOUT from '../assets/icons/logout_icon.png';
import {firebase} from '@react-native-firebase/auth';

const ProfileScreen = (props: any) => {
  const authStore = useStores();
  return (
    <>
      <StatusBar backgroundColor="#F2F5F8" barStyle="dark-content" />
      <TopBar navigation={props.navigation} backEnable={true} />
      <View style={styles.main}>
        <View style={{...styles.row, marginTop: 20}}>
          <View style={styles.horizontalListItem}>
            <LinearGradient
              colors={['#00B4E4', '#30C9AA']}
              start={{x: 0.0, y: 1.0}}
              end={{x: 1.0, y: 1.0}}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                height: 70,
                borderRadius: 33,
                backgroundColor: '#FFFFFF',
                padding: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  width: 68,
                  height: 68,
                  borderRadius: 34,
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
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    borderWidth: 1,
                  }}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text style={styles.name}>{authStore.user?.name}</Text>
            <Text style={styles.email}>{authStore.user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={async () => {
            await authStore.clear();
            firebase.auth().signOut();
            setTimeout(() => {
              props.navigation.navigate('SplashScreen');
            }, 3000);
          }}
          style={{
            ...styles.row,
            justifyContent: 'flex-end',
            marginRight: 20,
            marginTop: 10,
          }}>
          <View style={styles.iconBackground}>
            <Image source={LOGOUT} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

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
  horizontalListItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 25,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  name: {
    color: '#3F3D56',
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'left',
  },
  email: {
    color: '#6080A0',
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'left',
  },
  iconBackground: {
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#6080A0',
    borderWidth: 0.5,
  },
});

export default ProfileScreen;
