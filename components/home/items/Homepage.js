import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import React, {useState, useEffect} from 'react'
import { users } from '../../../data'
import { LinearGradient } from 'expo-linear-gradient'
import { Icon } from '@rneui/themed';
const {width, height} = Dimensions.get('screen')
const displaywidth = Dimensions.get('screen').width/2-30
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { getToken, removeToken} from '../../services/AsyncStorageService'
import { setUserInfo, unSetUserInfo } from '../../features/userSlice'
import { setUserToken, unsetUserToken} from '../../features/authSlice'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import axios from 'axios';


const Data = [{id:1, higher:999, lower:0},{id:2, higher:2499, lower:999},{id:3, higher:4999, lower:2499},{id:4, higher:9999, lower:4999},]


const Homepage = ({navigation}) => {
    const[loaded, setLoaded]=useState(false)
 const [dealDate, setDealdate] = useState(moment().endOf('day').fromNow())
 const [bannerimage, setBannerimage] = useState('')
 const [userlToken, setUserlToken] = useState()
const [categorylist, setCategorylist] = useState([])

 useEffect(()=>{
   (
     async()=>{
      const token = await getToken()
      setUserlToken(token)
     }
   )();
 })
 
   
 
 const {data, isSuccess } = useGetLoggedUserQuery(userlToken)
  
   const dispatch = useDispatch()
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ phoneno: data.user.phoneno, name: data.user.name, id: data.user._id}))
      
    }
  })
  
  const setbannerimage = async (req,res,next)=>{
    await  axios.get(`http://3.6.180.23:5000/frontpic/get/frontpic`,{headers: {
           'Content-type': 'application/json',}
         })
          
          .then((responseJson) => {
            setBannerimage(responseJson.data.result)
         setLoaded(true)
       
          })
          .catch((error) => {
            console.error(error);
          });
    
  }

  const getcatogerylist = async () =>{
     await  axios.get(`http://3.6.180.23:5000/categories/showall`,{headers: {
           'Content-type': 'application/json',}
         })
          
          .then((responseJson) => {
            setCategorylist(responseJson.data.result)
           setbannerimage()     
           
       
          })
          .catch((error) => {
            console.error(error);
          });
    
    }
 //useEffect(()=>{
   // var date = moment().utcOffset('+03:00').format('yyyy-mm-DD')
    
  //  console.log(date)
// },[])

useEffect(()=>{
getcatogerylist()
},[])
  return (

    <ScrollView>
        { !loaded ? (
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
            <View style={{backgroundColor:'white', paddingTop:40}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:'row', alignItems:'center', padding:10, justifyContent:'center'}}>
      <Image source={require('../../../assets/icon.png')} style={{height:60, width:60, resizeMode:'cover', borderRadius:30 }}/>
        <Text style={{fontSize:24, fontWeight:'600', marginHorizontal:10, color:'#f83758'}}>
                Pasaley
        </Text>

      </View>
    

{/* search any product*/}

<View style={{padding:10, alignItems:'center', justifyContent:'center'}}>
<TouchableOpacity onPress={()=>navigation.getParent().navigate('Gadgetsearch')}>
<View style={{backgroundColor:'#fdf7fd', width:width*0.9, borderWidth:1, borderRadius:5, padding:10, borderColor:'#C8C8C8', height:45}}>
    <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
    <Icon type='antdesign' name='search1' size={18} borderRadius={5} color={"#c8c8c8"}/>
<Text style={{color:'#c8c8c8',paddingHorizontal:10, fontSize:18}}> Search</Text>
    </View>
</View>
</TouchableOpacity>

</View>

{/* catogeries list */} 
<View style={{marginHorizontal:10}}>
<Text style={{fontWeight:'700', fontSize:18}}>
    All Featured
</Text>
</View>
<View style={{flex:1}}>

    <ScrollView style={{flex:1}} horizontal showsHorizontalScrollIndicator={false} >
    {categorylist.map(({name,photolink,_id},index)=>(
        <TouchableOpacity key={index}  onPress={()=>navigation.navigate('Catogerieslist',_id)} >
        <View style={{width:85, padding:5}}>
        <LinearGradient colors={["#bc2a8d","#e95950","#fccc63"]}
        style={{padding:2, borderRadius:50, }}
         >
        <Image src={photolink} style={styles.userImage} />
        </LinearGradient>
        <Text style={{textAlign:'center', fontSize:12, textTransform:'lowercase', marginTop:5}}>{name}</Text>
       </View>
        </TouchableOpacity>
     
    ))}
    </ScrollView>
</View>


{/* carosel animated */}

<View style={{ justifyContent:'center', alignItems:'center', height:310}}>
<View>
    <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    
        data={bannerimage}
        keyExtractor={(item,index)=>index}
        renderItem={({item,index})=>{
            
            return (
                <View style={{width:width, height:300, alignItems:'center', justifyContent:'center'}} key={index}>
                <Image style={{resizeMode:'contain', height:270, width: width*0.9, margin:10}} src={item.image}/>
                </View>
            )
        }}
    />
</View>
  
</View>




            </ScrollView>
    </View> 
            </>
        )}

{loaded && (
    <ScrollView style={{backgroundColor:'white'}}>

{/* sticker view */ }        
        <View style={{alignItems:'center', justifyContent:'center',marginHorizontal:9, marginBottom:30}}>
<View style={{width:width*0.9, backgroundColor:'#4392f9', height:100, borderRadius:18, borderColor:'#c8c8c8', borderWidth:0.5,}}>
<View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:'100%', marginHorizontal:20}}>
    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
    <View style={{marginBottom:20}}>
        <Text style={{fontSize:18, fontWeight:'bold',color:'white', }}>
            Deal of the Day
        </Text>
    </View>
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
    <Icon type='ionicons' name='timer' size={23} borderRadius={5} color={"white"}/>
    <Text style={{ fontSize:15, fontWeight:'500', color:'white'}}> Expire's  {dealDate}</Text>
    </View>
       
    </View>

    <View style={{alignItems:'center', justifyContent:'center', padding:20}}>
    <TouchableOpacity onPress={()=>navigation.navigate('Trending')} style={{borderColor:'white', borderRadius:10, borderWidth:2, height:50, width:120, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
<Text style={{color:'white', fontSize:15, fontWeight:'900'}}>
    ViewAll
</Text>
  <Icon type='antdesign' name='arrowright' size={23} borderRadius={5} color={"white"}/>
    </TouchableOpacity>
    </View>
</View>
</View>
        </View>



        {/* productsview */ }   




        {/* sticker view */ }   
    
    </ScrollView>
) }     
    </ScrollView>
   
  )
}

export default Homepage

const styles = StyleSheet.create({
    userImage:{
        height:70, width:70,
        borderRadius:50,
        borderColor:'white',
        borderWidth:4,
    }
})