import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Alert,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Card,
} from 'native-base';
import {AuthContext} from '../Context';
// import {GoogleLogIn} from './googlelogin';
import Icon from 'react-native-vector-icons/Ionicons';
// import {FacebookSignIn} from './fbsignin';
import firebase from 'firebase';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { SocialIcon } from 'react-native-elements';
import data from '../countries';
/*import { Formik } from 'formik';
import * as yup from 'yup';*/

export const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const {signIn} = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const loginHandle = (username, password) => {
    signIn(username, password);
  };

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
      // setUserInfo(userInfo);
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
        .then(() => googleSignIn())
        .then(
          setTimeout(() => {
            navigation.navigate('Splash');
            setIsLoading(true);
          }, 1000),
        );
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
  const {fbSignIn} = React.useContext(AuthContext);
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
      .then(() => fbSignIn())
      .then(
        setTimeout(() => {
          navigation.navigate('Splash');
          setIsLoading(true);
        }, 1000),
      );
  }
  // async function fbLogOut(){ LoginManager.logOut()};
  /*const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Please, provide your Firstname!'),
    password: yup
      .string()
      .required('Please, provide your paassj!')
  });*/
  return (
    <>
      {/*<Formik
      initialValues={{ username:'',
    password: ''}}
      onSubmit={(values, actions) => {
        values
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      validationSchema={validationSchema}
    >
 {formikProps => (
        <React.Fragment>*/}
      <>
        <Container style={{backgroundColor:'#052c65'}}>
          <Content>
            <Card
              style={{marginTop: 70, width: 350, marginLeft: 20, height: 560}}>
              <Icon
                name="ios-book"
                size={150}
                color="#052c65"
                style={{marginTop:20,marginLeft:110}}
              />
              <Form style={{marginTop: 20, marginLeft: 25,width: 300}}>
                <Item fixedLabel>
                  {/* <Label>Username</Label> */}
                  <Input
                    placeholder="Phone or Email"
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    // onChangeText={formikProps.handleChange('username')}
                  />
                </Item>
                {/* <Text style={{ color: 'red' }}>{formikProps.errors.username}</Text> */}
                <Item fixedLabel last>
                  {/* <Label>Password</Label> */}
                  <Input
                    placeholder="Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                    // onChangeText={formikProps.handleChange('password')}
                  />
                </Item>
                {/* <Text style={{ color: 'red' }}>{formikProps.errors.password}</Text> */}
              </Form>
              <Button style={{marginTop:40,marginLeft:25,width:300, backgroundColor: '#052c65'}} block onPress={()=> loginHandle (data.username, data.password)}> 
                {/* <Button style={{marginTop:40,marginLeft:25,width:300, backgroundColor: '#1f65ff'}} block onPress={formikProps.handleSubmit}> */}
                <Text>Sign In</Text>
              </Button>
              <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{fontSize: 14, marginTop: 20, marginLeft: 40}}>
                  <Text>Don't hava an account? </Text>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style={{color: '#750573',fontSize: 15,marginRight:16,letterSpacing: 1}}>
                      Sign up here
                    </Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
              <StatusBar barStyle="dark-content" />
              <View style={styles.container}>
                <GoogleSigninButton
                  style={styles.signInButton}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={() => firebaseSignIn()}
                />
              </View>
              <View style={styles.container}>
                <SocialIcon
                  onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
                  style={styles.signInButton}
                  title='Sign In With Facebook'
                  button
                  type='facebook'/>
               </View>
            </Card>
          </Content>
        </Container>
      </>
      {/* </React.Fragment>
      )}
    </Formik>*/}
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

