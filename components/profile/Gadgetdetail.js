import { StyleSheet, Text, View, SafeAreaView,ActivityIndicator, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon } from '@rneui/themed'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'



const Gadgetdetail = ({navigation, route}) => {
const [loaded, setLoaded] = useState(true)
const [vendordetails, setVendordetails] = useState('')

const plant = route.params

const myData= useSelector(state => state.user)
const customerid = myData.id
    const URL = plant.photolink
    const vendorid = plant.vendorname
   
     const name = plant.name
     const productid = plant._id
     const price = plant.price
     const unit = 1
    




const onBuypressed =async ()=>{
setLoaded(false)
await axios.post('http://3.6.180.23:5000/cartt/add',{
    customerid:customerid,
    productid:productid, 
    unit:unit,
    name:name,
    price:price
  },{
    headers:{
      'Content-Type':'application/json'
    }}
    )
        .then( (response) =>{
          if (response.status === 200){
            Alert.alert("Added!",
            "added to cart sucessfully",
            [{
                text:"OK",
                onPress:()=>setLoaded(true)
            }]
            )
          }
       
      
          
        })
        .catch( (error)=> {
            console.log(error.type);
        });

}
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white', paddingTop:20}}>
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
{loaded && (
    <>
    <View style={styles.header}>
<Icon name='arrow-back' size={38} onPress={()=>navigation.goBack()} />
<Icon name='shopping-cart' size={28} color={'#f83758'}  />
</View>
<View style={styles.imagecontainer}>
<Image 
style={{height:300, width:300, resizeMode:'contain'}}
src={URL}/>
</View>
<ScrollView>
<View style={styles.detailcontainer}>
<View style={{marginLeft:20, flexDirection:'row', alignItems:'flex-end'}}>
<View style={styles.line}/>
<Text style={{fontSize:18, fontWeight:'bold'}}>Best Choice</Text>







</View>
<View style={{marginLeft:20, marginRight:40,  marginTop:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>

<Text style={{fontSize:22, fontWeight:'bold'}}>
{plant.name}
</Text>



</View>
<View style={styles.pricetag}>
<Text style={{alignItems:'center', justifyContent:'center', color:'white',fontWeight:'bold',fontSize:14}}>
    Rs. {plant.price}
</Text>
</View>
<View style={{paddingHorizontal:20, marginTop:10}}>
<Text style={{fontSize:20, fontWeight:'bold'}}>
    About
</Text>
<Text style={{color:'grey', fontSize:16, lineHeight:22, marginTop:20}}>
    {plant.shortdescription}
</Text>

</View>
<View style={{marginTop:20, justifyContent:'center', alignItems:'center', flex:1}}>
<TouchableOpacity onPress={onBuypressed} >
   <View style={styles.buybtn}>
<Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>
    Buy Now
</Text>
   </View> 
   </TouchableOpacity>
</View>
<View style={{paddingHorizontal:20, marginTop:10}}>
<Text style={{fontSize:20, fontWeight:'bold'}}>
    Description
</Text>
<Text style={{color:'grey', fontSize:16, lineHeight:22, marginTop:20}}>
    {plant.description}
</Text>

</View>
</View>




</ScrollView>
    </>
)}

    </SafeAreaView>
  )
}

export default Gadgetdetail

const styles = StyleSheet.create({
    header:{

        paddingHorizontal:20,
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    imagecontainer:{

        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    detailcontainer:{
        flex:0.55,
        backgroundColor:'#F2F2F2',
        marginHorizontal:7,
        marginBottom:7,
        borderRadius:20,
        marginTop:30,
        paddingTop:30
    },
    line:{
        width:25,
        height:2,
        backgroundColor:'black',
        marginBottom:5,
        marginRight:3
    },
    pricetag:{
        backgroundColor:'#f83758',
        width:100,
        height:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginRight:20
    },
    buybtn:{
        width:150,
        height:50,
        backgroundColor:'#f83758',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30
    }
})