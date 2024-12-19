import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


import { getToken } from './components/services/AsyncStorageService';
import Homelogged from './components/islogged/Homelogged';
import Wallet from './components/wallet/Wallet';
import Phoneno from './components/authentication/Phoneno';
import Registration from './components/authentication/Registration';
import Password from './components/authentication/Password';
import Orders from './components/profile/Orders';
import Changepassword from './components/authentication/Changepassword';
import Privacy from './components/Others/Privacy';
import Gadgetsearch from './components/profile/Gadgetsearch';
import Gadgetdetail from './components/profile/Gadgetdetail';
import Gadgetlist from './components/profile/Gadgetlist';
const Navigation = () => {
    const[loaded, setLoaded] = useState(false)
    const[token, setToken] = useState('')
    const [userLToken, setUserLToken] = useState('')


    useEffect(() => {
      (async () => {
        const tokene = await getToken() // Getting Token from Storage
        setToken(tokene)
      setLoaded(true)
                 // Store Token in Local State
      })();
    })
  return (
   <>
 {!loaded && (
        <>
        <View style={{justifyContent:'center', alignItems:'center', height:'100%'}}>
        <ActivityIndicator  size={81} color="#f83758" />
        <Text style={{color:'#f83758', fontSize:20}}>
          wait while loading...
        </Text>
        </View>
        </>
    )}
    { loaded && (
        <>

{!token  ? (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false, contentStyle:{backgroundColor:"#fdf7fd"}}}>
        {/* initial and login screen*/ }
      <Stack.Screen name='Phoneno' component={Phoneno}/>
      <Stack.Screen name='Registration' component={Registration}/>
      <Stack.Screen name='Password' component={Password}/>
      <Stack.Screen name='Changepassword' component={Changepassword}/>

<Stack.Screen name='Homelogged' component={Homelogged}/>
 {/* payment  screen*/ }
 <Stack.Screen name='Wallet' component={Wallet}/>
 {/* profile  screen*/ }
<Stack.Screen name='Order' component={Orders}/>
<Stack.Screen name='Privacy' component={Privacy}/>
<Stack.Screen name='Gadgetsearch' component={Gadgetsearch}/>
       <Stack.Screen name='Gadgetdetail' component={Gadgetdetail}/>
<Stack.Screen name='Gadgetlist' component={Gadgetlist}/>


      </Stack.Navigator>
    </NavigationContainer>
    </>
):(
    <>
    <NavigationContainer theme={{colors:{background:"#fdf7fd"}}}>
      <Stack.Navigator screenOptions={{headerShown:false, contentStyle:{backgroundColor:"#fdf7fd"}}}>
      {/* initial and login screen*/ }
      <Stack.Screen name='Homelogged' component={Homelogged}/>

      <Stack.Screen name='Phoneno' component={Phoneno}/>
      <Stack.Screen name='Registration' component={Registration}/>
      <Stack.Screen name='Password' component={Password}/>
         <Stack.Screen name='Changepassword' component={Changepassword}/>

        {/* payment  screen*/ }
   <Stack.Screen name='Wallet' component={Wallet}/>
      
       {/* profile  screen*/ }
       <Stack.Screen name='Order' component={Orders}/>
       <Stack.Screen name='Privacy' component={Privacy}/>
       <Stack.Screen name='Gadgetsearch' component={Gadgetsearch}/>
       <Stack.Screen name='Gadgetdetail' component={Gadgetdetail}/>
       <Stack.Screen name='Gadgetlist' component={Gadgetlist}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
)}
        </>
    )}

   </>
  )
}

export default Navigation

const styles = StyleSheet.create({})