import React from 'react';
import {View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import {AuthContext} from '../Context';

export function DrawerContent(props) {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View>
      <DrawerItem
        label="Home"
        onPress={() => {
          props.navigation.navigate('Home');
        }}
      />
      <DrawerItem
        label="Profile"
        onPress={() => {props.navigation.navigate('Profile')}}
      />
      <DrawerItem
        label="LogOut"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}