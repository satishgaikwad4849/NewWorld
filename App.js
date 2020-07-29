import React from 'react';
//import Counter from './component/counter'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {combineReducers} from 'redux';
import authReducer from './UseRedux/reducers/authReducer';
import counterReducer from './UseRedux/reducers/counterReducer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TopProfessionals,
  TopSalloons,
  Splash,
} from './component/Screens/Home_screen';
// import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from './component/Context';
import {DrawerContent} from './component/Screens/Drawer';
import {MainTabScreen} from './component/Screens/maintabs';
import {SignInScreen} from './component/Screens/Signinscreen';
import {SignUpScreen} from './component/Screens/Signupscreen';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager} from 'react-native-fbsdk';


const rootReducer = combineReducers({
  authReducer: authReducer,
  counterReducer: counterReducer,
});

const store = createStore(rootReducer);
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="Splash" component={Splash} />
  </RootStack.Navigator>
);

export default () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  //const [isLoading, setIsLoading] = React.useState(true);
  //const [userToken, setUserToken] = React.useState(null);
  /*async function fbLogOut(){ 
    LoginManager.logOut();
  };*/
  const authContext = React.useMemo(() => {
    return {
      signIn: async (userName, password) => {
        //setIsLoading(false);
        //setUserToken("asdf");
        let userToken;
        userToken = null;
        if (userName === 'satish' && password === 'gocorono') {
          try {
            userToken = 'dfgdfg';
            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },

      googleSignIn: async () => {
        let userToken;
        userToken = null;
        try {
          userToken = 'dfgdfg';
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', token: userToken});
      },
      fbSignIn: async () => {
        let userToken;
        userToken = null;
        try {
          userToken = 'dfgdfg';
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', token: userToken});
      },
      signUp: () => {
        //setIsLoading(false);
        //setUserToken("asdf");
      },

      signOut: async () => {
        //setIsLoading(false);
        //setUserToken(null);
        try {
          await AsyncStorage.removeItem('userToken');
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          await fbLogOut();
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(async () => {
      //setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return <Splash />;
  }
  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              initialRouteName="Home"
              drawerContent={(props) => <DrawerContent {...props} />}>
              <Drawer.Screen name="Home" component={MainTabScreen} />
              <Drawer.Screen
                name="Top Professionals"
                component={TopProfessionals}
              />
              <Drawer.Screen name="List" component={TopSalloons} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};
