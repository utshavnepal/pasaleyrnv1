import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Grocerylist from './Grocerylist';
import Grocerydetsils from './Grocerydetsils';
const Stack = createNativeStackNavigator();

const Grocery = () => {
  const[loaded, setLoaded]=useState(true)
  return (
   <>
     {!loaded ? (
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
     <Stack.Navigator screenOptions={{headerShown:false, contentStyle:{backgroundColor:"#white"}}}>
     <Stack.Screen name='Grocerylist' component={Grocerylist}/>  
     <Stack.Screen name='Grocerydetail' component={Grocerydetsils}/>   
     </Stack.Navigator>
     
     </>   
    )}
   </>
  )
}

export default Grocery

const styles = StyleSheet.create({})