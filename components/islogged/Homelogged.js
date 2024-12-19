import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity  } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../home/Home';

import Cart from '../cart/Cart';
import Grocery from '../Grocery/Grocery';
import Profile from '../profile/Profile';


const Tab = createMaterialBottomTabNavigator();





const Homelogged = ({navigation}) => {
const [isloaded, setIsloaded] = useState(true)



    
    
   
   
  return (
  <>
    {!isloaded ? (
        <>
        <View style={{justifyContent:'center', alignItems:'center', height:'100%'}}>
        <ActivityIndicator  size={81} color="#f83758" />
        <Text style={{color:'#f83758', fontSize:20}}>
          wait while loading...
        </Text>
        </View>
        </>
    ):(
        <>
        <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f83758"
      barStyle={{ backgroundColor: '#fcf3f6' }}
      inactiveColor='#9d9ca1'    
      screenOptions={{  unmountOnBlur:true, }}  
    >

<Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ' Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          
        }}
      
        
      />
      

<Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          
          tabBarLabel: ' Cart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Grocery"
        component={Grocery}
        options={{
        
          tabBarLabel: ' Grocery',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fridge-variant-alert-outline" color={color} size={26} />
          ),
        }}
      />
      

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
        </>
    )}


  </>
  )
}

export default Homelogged

const styles = StyleSheet.create({})