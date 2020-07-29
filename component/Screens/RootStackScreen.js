import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {SignInScreen} from './Signinscreen';

import {SignUpScreen} from './Signupscreen';

import {Splash} from './Home_screen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="Splash" component={Splash} />
  </RootStack.Navigator>
);

export default RootStackScreen;
