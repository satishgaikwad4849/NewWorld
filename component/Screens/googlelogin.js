import React, {useState, useEffect} from 'react';
import {View, Text, Button, Alert, StatusBar, StyleSheet} from 'react-native';
import {AuthContext} from '../Context';
import firebase from 'firebase';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

export const GoogleLogIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId:
        '1016024845465-ok8veubdd07v9863f9g9d7tvc1riaoti.apps.googleusercontent.com',
      offlineAccess: false,
      hostedDomain: '',
      forceConsentPrompt: true,
    });
  }
  useEffect(() => {
    configureGoogleSign();
  }, []);
  const {googleSignIn} = React.useContext(AuthContext);
  async function firebaseSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setError(null);
      setIsLoggedIn(true);
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      // login with credential
      return firebase
        .auth()
        .signInWithCredential(googleCredential)
        .then(() => googleSignIn());
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
          Alert.alert('Process Cancelled')
        } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
          Alert.alert('Process in progress')
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
          Alert.alert('Play services are not available')
        } else {
        // some other error
          Alert.alert('Something else went wrong... ', error.toString())
          setError(error)
      }
    }
  }
  async function getCurrentUserInfo() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUserInfo(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          // when user hasn't signed in yet
        Alert.alert('Please Sign in')
        setIsLoggedIn(false)
        } else {
          Alert.alert('Something else went wrong... ', error.toString())
          setIsLoggedIn(false)
        }
      }
  }
  async function signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setIsLoggedIn(false);
      setUserInfo(null);
    } catch (error) {
        Alert.alert('Something else went wrong... ', error.toString())
      }
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <GoogleSigninButton
          style={styles.signInButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => firebaseSignIn()}
        />
        <View style={styles.statusContainer}>
          {isLoggedIn === false ? (
            <Text style={styles.message}>You must sign in!</Text>
          ) : (
            <Button
              onPress={() => signOut()}
              title="Sign out"
              color="#332211"
            />
          )}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  signInButton: {
    width: 192,
    height: 48,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
