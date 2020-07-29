import React ,{useState, useEffect}from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { LoginButton } from 'react-native-fbsdk';
import {View,StyleSheet,Button,ActivityIndicator} from 'react-native';
import {AuthContext} from '../Context';
import { SocialIcon } from 'react-native-elements'
import firebase from 'firebase';
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
import data from '../countries';
 import {Splash} from './Home_screen';
/*
export function FacebookSignIn() {
  return (
    <Button
    style={styles.signInButton}
      title="Facebook Sign-In"
      onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
    />
  );
}
*/

export function FacebookSignIn() {
  const {fbSignIn} = React.useContext(AuthContext);
  /* useEffect(() => {
    setTimeout( () => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (isLoading) {
    return <Splash />;
  }*/
  
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    let fbToken = data.accessToken.toString();
    console.log(fbToken);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(facebookCredential)
      .then(() => fbSignIn()).then();
  }
  async function fbLogOut(){ LoginManager.logOut()};
  return (
  <>
    <View style={styles.container}>
      <SocialIcon
        onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
        style={styles.signInButton}
        title='Sign In With Facebook'
        button
        type='facebook'/>
      </View>
  </>
  );
}


const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  signInButton: {
    width: 192,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});