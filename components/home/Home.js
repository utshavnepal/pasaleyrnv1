import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Homepage from './items/Homepage';
import { useDispatch, useSelector } from 'react-redux'
import Categorieslist from './items/Catogerieslist';
import Itemdetails from './items/Itemdetail';
import Trending from '../trending/Trending';
import Range from './items/Range';



const Home = () => {
    const[loaded, setLoaded]=useState(true)
    const myData= useSelector(state => state.user)
   

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
     <Stack.Screen name='Homepage' component={Homepage}/>     
     <Stack.Screen name='Catogerieslist' component={Categorieslist}/>
     <Stack.Screen name='Itemdetails' component={Itemdetails}/>
     <Stack.Screen name='Trending' component={Trending}/>
     <Stack.Screen name='Range' component={Range}/>
     </Stack.Navigator>
     
     </>   
    )}
    </>
  )
}

export default Home

const styles = StyleSheet.create({})