import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux' 
import { removeToken } from '../services/AsyncStorageService';
import { unSetUserInfo } from '../features/userSlice';
import { unsetUserToken } from '../features/authSlice';

import axios from 'axios';

const Profile = ({navigation}) => {

  const[loaded, setLoaded] = useState(true)

 const myData= useSelector(state => state.user)

  const handleLogout = async () => {
    unSetUserInfo({ phoneno: "", name: "",id:"" })
    unsetUserToken({ token: null })
    await removeToken('token')
    navigation.getParent().navigate('Phoneno');
  }

const userid = myData.id
const deleteaccount = async ()=>{
  await axios.post('http://3.6.180.23:5000/user/deleteuser',{
  userid:userid
  },{
    headers:{
      'Content-Type':'application/json'
    }}
    )
        .then( (response) =>{
          
          if (response.status === 200){
           handleLogout()
          }
       
      
          
        })
        .catch( (error)=> {
            console.log(error.type);
        });
}

  return (
    <ScrollView style={{backgroundColor:'white', paddingTop:30}}>
      {!loaded ? (
        <>
        <View style={{justifyContent:'center', alignItems:'center', height:'100%'}}>
        <ActivityIndicator  size={81} color="#f83758" />
        <Text style={{color:'#f83758', fontSize:20}}>
          wait while loading...
        </Text>
        </View>
        </>
    ): (
        <ScrollView>
<View style={{ borderWidth:2, borderRadius:20, borderColor:'grey', padding:20, margin:30}}>
<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
<Icon type='antdesign' name='user' size={88} borderRadius={5} color={"#c8c8c8"}/>
<View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
  <View>
    <Text style={{color:'gray', fontSize:15, fontWeight:'bold'}}>{myData.name}</Text>
  </View>
  <Text style={{color:'gray', fontSize:15, fontWeight:'bold'}}>
    {myData.phoneno}
  </Text>
</View>
</View>


</View>
        </ScrollView>)}




{/* profile list */}
<TouchableOpacity onPress={()=>navigation.getParent().navigate('Changepassword')}>
<View style={{padding:20, margin:30, borderRadius:30, backgroundColor:'#c8c8c8', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
<Icon type='antdesign' name='user' size={28} borderRadius={5} color={"white"}/>
<Text style={{fontSize:15, fontWeight:'800', color:'white'}}>Changepasssword</Text>
</View>
</TouchableOpacity>


<TouchableOpacity onPress={()=>navigation.getParent().navigate('Order')}>
<View style={{padding:20, marginHorizontal:30, borderRadius:30, backgroundColor:'#c8c8c8', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
<Icon type='feather' name='package' size={28} borderRadius={5} color={"white"}/>
<Text style={{fontSize:15, fontWeight:'800', color:'white'}}>My Order</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
<View style={{padding:20, margin:30, borderRadius:30, backgroundColor:'#c8c8c8', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
<Icon type='antdesign' name='shoppingcart' size={28} borderRadius={5} color={"white"}/>
<Text style={{fontSize:15, fontWeight:'800', color:'white'}}>Cart</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={()=>navigation.getParent().navigate('Privacy')}>
<View style={{padding:20, marginHorizontal:30, borderRadius:30, backgroundColor:'#c8c8c8', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
<Icon type='entypo' name='document' size={28} borderRadius={5} color={"white"}/>
<Text style={{fontSize:15, fontWeight:'800', color:'white'}}>Privacy and policy</Text>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={deleteaccount}>
<View style={{padding:20, margin:30, borderRadius:30, backgroundColor:'#c8c8c8', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
<Icon type='antdesign' name='logout' size={28} borderRadius={5} color={"white"}/>
<Text style={{fontSize:15, fontWeight:'800', color:'white'}}>Delete account</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={handleLogout}>
<View style={{padding:20, marginHorizontal:30, borderRadius:30, backgroundColor:'#c8c8c8', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
<Icon type='antdesign' name='logout' size={28} borderRadius={5} color={"white"}/>
<Text style={{fontSize:15, fontWeight:'800', color:'white'}}>Logout</Text>
</View>
</TouchableOpacity>


    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({})