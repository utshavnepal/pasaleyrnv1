import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions, Image,FlatList} from 'react-native'
import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Orders = ({navigation}) => {
  const [loading, setLoading]= useState(false)
  const [orderlist,setorderlist]= useState([])  
  
  const userid = useSelector(state => state.user.id)

  

const getdeliveryid = async ()=>{
    await axios.post(`http://3.6.180.23:5000/multipleorder/get/mo/`,{
        userid:userid
    },{
    headers:{
      'Content-Type':'application/json'
    }}
    )
        .then( (response) =>{
         
          if (response.data.message == 'sucess'){
           setorderlist(response.data.data)
           setLoading(true)
          }
       

       
      
          
        })
        .catch( (error)=> {
            console.log(error.type);
        });
  


}


useEffect(()=>{
    getdeliveryid()
},[])

  const Card =({plant})=>{
    
     
    return <View style={{backgroundColor:'#F2F2F2', borderRadius:20, alignItems:'center', width:SCREEN_WIDTH*0.85, margin:20}}>
    <View>
    <Text style={{color:'#F83758', fontWeight:'bold', fontSize:16}}>
       Order id : {plant._id}
      </Text>
    </View>
     
      <View>
        <Text style={{color:'#F83758', fontWeight:'bold', fontSize:16}}>
       Your Price :  Rs  {plant.price}
        </Text>
      </View>
      <View>
        <Text style={{color:'#F83758', fontWeight:'bold', fontSize:16}}>
          Orginal price : Rs {plant.total}
        </Text>
      </View>
      <View>
      <View>
        <Text style={{color:'#F83758', fontWeight:'bold', fontSize:16}}>
          Ordertime :  {plant.ordertime}
        </Text>
      </View>
      <View style={{alignItems:'center', justifyContent:'center'}}>
      {plant.delivered && (
        <Text style={{color:'#F83758', fontWeight:'bold', fontSize:16}}>
            Delivered
        </Text>
      )}
      {!plant.delivered && (
        <Text style={{alignItems:'center', justifyContent:'center', color:'#F83758', fontWeight:'bold', fontSize:16}}>
           Delivery Pending
        </Text>
      )}
      </View>
      
      </View>
    </View>
  }
  return (

    <View style={{paddingTop:30}}>
      {!loading && (
        <>
        <View style={{justifyContent:'center', alignItems:'center', height:SCREEN_HEIGHT}}>
        <ActivityIndicator  size={81} color="#f83758" />
        <Text style={{color:'#f83758', fontSize:20}}>
          wait while loading...
        </Text>
        </View>
        </>
      )}
      {loading && (
        <View>
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <View>
           <Text style={{color:'#F83758', fontWeight:'bold', fontSize:35}}>
            Your Orders    
           </Text> 
          </View>
          <View>
           <Text style={{color:'#F83758', fontWeight:'bold', fontSize:35}}>
            are here !    
           </Text> 
          </View>

        </View>
        <View style={{alignItems:'center', justifyContent:'center', marginTop:20}}>
<TouchableOpacity onPress={()=>navigation.navigate('Homelogged')}>
  <View style={{height:SCREEN_HEIGHT*0.04, width:SCREEN_WIDTH*0.3, backgroundColor:'#F83758', borderRadius:10, alignItems:'center', justifyContent:'center'}}>
    <Text style={{color:'white', fontSize:15, fontWeight:'bold'}}>
      Back to home
    </Text>
  </View>
</TouchableOpacity>
</View>
        <View style={{alignItems:'center', justifyContent:'center'}}>

<FlatList
    
      showsVerticalScrollIndicator={false}
      
      data={orderlist}
        
        renderItem={({item})=> <Card plant={item} />}
/>
</View>



        </View>
      )}
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({})