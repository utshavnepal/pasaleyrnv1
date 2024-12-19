import { StyleSheet, Text, View, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, Dimensions, Image, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const width = Dimensions.get('screen').width/2-30
import { Icon } from '@rneui/themed';
import axios from 'axios';


import { useDispatch, useSelector } from 'react-redux'


const Gadgetlist = ({navigation, route}) => {
    const[loaded, setLoaded]=useState(false)
    const [gadgetlist, setGadgetlist] = useState([])
    const [categoryid, setCategoryid] = useState('')
     const data = route.params
    const unit = 1
    const myData= useSelector(state => state.user)
const customerid = myData.id


   const addlist = async(data)=>{
    
    
    const ram = data
  
    await axios.get(`http://3.6.180.23:5000/ecomlist/get/ecom/${ram}`,
    {
      headers:{
        'Content-Type':'application/json'
      }}
    ) .then( (response) =>{
        
        
          
      setGadgetlist(response.data.data)
      setLoaded(true)
          
        })
        .catch( (error)=> {
            console.log(error.type);
        });

   }
    const getList = async()=>{
      await axios.post(`http://3.6.180.23:5000/categories/get/cat`,{name:"grocery"},
      {
        headers:{
          'Content-Type':'application/json'
        }}) .then( (response) =>{
        
        
          
        setCategoryid(response.data.result._id)
         
         const data =response.data.result._id
         addlist(data)
            
          })
          .catch( (error)=> {
              console.log(error.type);
          });
  
    }

    useEffect(()=>{
      getList()
    },[])




    const oncartAdded = async ({plant})=>{
const name = plant.name
const productid = plant._id
const price = plant.price
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
{/* card*/}
const Card =({plant})=>{
    const url =  plant.photolink
    return <View style={styles.card} key={plant._id}>
   <View style={{alignItems:'flex-end'}}>
   <View style={{width:30, height:30,
   borderRadius:15,
   alignItems:'center',
   justifyContent:'center',
   backgroundColor:'rgba(245, 42, 42 , 0.2)'
   }}>
   <Icon name ='favorite' size= {18} color='#F83758' />
   </View>
    
   </View>
   <View style={{height:100, alignItems:'center'}}>
   <Image 
   style={{ resizeMode:'contain', width:100, height:100}}
   source={url}/>
    </View>
    <View >
     <Text style={{fontWeight:'bold',fontSize:10,marginTop:10, justifyContent:'center', color:'#F83758', alignItems:'center'}}>
       {plant.name}
     </Text>
     <View style={{flexDirection:'row', justifyContent:'space-between'}}>
    
     <Text style={{fontSize:12, fontWeight:'bold', color:'#F83758'}}>
      Rs {plant.price}
     </Text>
     <TouchableOpacity  onPress={()=>oncartAdded({plant})}>
     <View style={{height:21, width:20,
   backgroundColor:'#f83758',
   borderRadius:5,
   justifyContent:'center',
   alignItems:'center'
   }}>
    
    <Text style={{fontSize:15, color:'white', fontWeight:'bold'}}>+</Text>
       
   
   </View>
   
     </TouchableOpacity>
   
     </View>
     
    </View>
    
    <TouchableOpacity onPress={()=>navigation.navigate('Grocerydetail', plant)}>
    <View style={{alignItems:'center', justifyContent:'center', marginTop:10,backgroundColor:'#F83758', borderRadius:10}}>
   
    <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Buy </Text>
    </View>
    </TouchableOpacity>
   
    <View>
    {plant.lowestdeal && (
      <View style={{ alignItems:'center', justifyContent:'center', borderRadius:10,  backgroundColor:'#f35728', marginTop:10, borderBottomEndRadius:40, padding:6}}>
     <Text style={{alignItems:'center', fontSize:12, fontWeight:'bold', color:'white'}}>
      Lowest deal Guranteed
     </Text>
      </View>
    )}
   </View>
   </View>
     
   }




  return (
    <View>
     {!loaded && (
        <>
        <View style={{justifyContent:'center', alignItems:'center', height:'100%'}}>
        <ActivityIndicator  size={81} color="#f83758" />
        <Text style={{color:'#f83758', fontSize:20}}>
          wait while loading...
        </Text>
        </View>
        </>
    )
     
    }
    {loaded && (
        <View style={{backgroundColor:'white', paddingTop:30}}>

        
{/* heading*/}
        <View style={styles.header}>


        <View>
        <Text style={{fontSize:25, fontWeight:'bold', color:'#F83758'}}>Welcome to</Text>
        <Text style={{fontSize:38, fontWeight:'bold', color:'#F83758'}}>Our shop</Text>
      </View>
      <Icon name='shopping-cart' size={28} color='#F83758'/>
    </View>
        



{/* search any product*/}

   



{/* datalist*/}
    <FlatList
        columnWrapperStyle={{justifyContent:'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop:10,
          paddingBottom:500,
          marginBottom: 500
        }}
        data={gadgetlist}
         numColumns={2} 
          renderItem={({item})=> <Card plant={item} />}
        />


        </View>
    )}
    </View>
  )
}

export default Gadgetlist

const styles = StyleSheet.create({
    header:{
        padding:30,
        
        flexDirection:'row',
        justifyContent:"space-between"
      },
      card:{
        height:300,
        backgroundColor:'#F2F2F2',
        width:width,
        marginTop:30,
        marginHorizontal:2,
        borderRadius:10,
        padding:15
        },
})
