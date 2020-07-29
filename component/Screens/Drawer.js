import React from 'react';
import {View,Text} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import {AuthContext} from '../Context';
import { Avatar } from 'react-native-paper';
export function DrawerContent(props) {
  const {signOut} = React.useContext(AuthContext);
  // const {googleSignOut} = React.useContext(AuthContext);
  return (
    <View>
    <View style={{backgroundColor: '#052c65'}}>
    <Avatar.Image style={{margin:15,backgroundColor: '#052c65'}} size={250} source={require('../../7718.jpg')} />
    <Text style={{color: 'white',fontSize:25,fontFamily:'sans-serif-thin',padding:10,marginLeft:50}}>SALOON HUB</Text>
    </View>
    <View style={{marginTop:5}}>
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
      {/*<DrawerItem
        label="LogOut"
        onPress={() => {
          googleSignOut();
        }}
      />*/}
      </View>
    </View>
  );
}