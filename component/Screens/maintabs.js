import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Home,
  TopSalloons,
  TopProfessionals,
  List,
  AddItem,
  Details,
} from './Home_screen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator();
const TopProfStack = createStackNavigator();
const TopSalloonsStack = createStackNavigator();
const ListStack=createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Welcome',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu" 
            size={25}
            backgroundColor="#1f65ff"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({route}) => ({
        title: route.params.title,
      })}
    />
    <HomeStack.Screen name="Additem" component={AddItem} />
    <HomeStack.Screen name="List" component={List} />
  </HomeStack.Navigator>
);
const TopProfStackScreen = () => (
  <TopProfStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <TopProfStack.Screen name="Top Professionals" component={TopProfessionals}/>
  </TopProfStack.Navigator>
);

const TopSalloonsStackScreen = () => (
  <TopSalloonsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <TopSalloonsStack.Screen name="Top Salloons" component={TopSalloons} />
  </TopSalloonsStack.Navigator>
);
const ListStackScreen = () => (
  <ListStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ListStack.Screen name="List" component={List} />
  </ListStack.Navigator>
);
export const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Top Professionals"
      component={TopProfStackScreen}
      options={{
        tabBarLabel: 'Top Professionals',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-people" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Top Salloons"
      component={TopSalloonsStackScreen}
      options={{
        tabBarLabel: 'Top Salloons',
        tabBarColor: '#694fad',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person-add" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
