import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, FlatList, ActivityIndicator, Alert} from 'react-native'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useIsFocused } from '@react-navigation/native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import axios from 'axios';

const Cart = ({navigation}) => {

  const isFocused = useIsFocused()
const [item, setItem] = useState([])
const[total, setTotal] = useState(100)
const [isloaded, setIsloaded] = useState(true)
const [isVisible, setIsVisible] = useState(true);
const [emptycart, setEmptycart] = useState(true)
const [final, setFinal] = useState(0)
const [paymentpress, setPaymentpress] = useState(false)

const [district, setDistrict]  = useState('')
const[area, setArea] = useState('')
const[street, setStreet] = useState('')
const[coupon, setCoupon] = useState('')
const[coponapplied, setCouponapplied] = useState(false)
const[couponpress, setCouponpress] = useState(false)
const [price, setPrice] = useState(0)
const [discountrate, setDiscountrate]= useState(0)
const [discounttotal, setDiscounttotal] = useState(0)


const myData= useSelector(state => state.user)
const customerid = myData.id



const priceset = async (items)=>{
  let sum = items.reduce(function(prev,current){
return prev + current.price*current.unit
  },0)
  setPrice(sum)
  setFinal(sum+29)
}

const carteAdded = async ()=>{
  await axios.post('http://3.6.180.23:5000/cartt/get/cart',{
    customerid:customerid
  },{
    headers:{
      'Content-Type':'application/json'
    }}
    )
        .then( (response) =>{
       
          if (response.status === 200){
          setItem(response.data.message.products)
          const items = response.data.message.products
          priceset(items)
          setIsloaded(true)
          setEmptycart(false)
          }else{
            setEmptycart(true)
            carteAdded()
          }
       
      
          
        })
        .catch( (error)=> {
            console.log(error.type);
        });
}


useEffect(()=>{
carteAdded()
},[isFocused]) 



const addCoupondetsils = async (rate)=>{
  const ram = price - (rate * price / 10000)  + 29
setFinal(ram)
  setDiscounttotal(ram)
 setCouponapplied(true)
}

const couponPressed  = async ()=>{
  
  if (coupon){
    setCouponpress(true)
    await axios.post('http://3.6.180.23:5000/cupoon/cupon/cuponapplied',{
      couponname:coupon
    },{
      headers:{
        'Content-Type':'application/json'
      }}
      )
          .then( (response) =>{
          
            if (response.status === 200){
              
              setDiscountrate(response.data.message.discountrate)
              const rate = response.data.message.discountrate
              addCoupondetsils(rate)
            }else{
              Alert.alert("Wrong promo",
    "Please enter promo code sucessfully",
    setCouponapplied(false)
    [{
        text:"OK",
        onPress:()=>setCouponpress(false)
    }]
    )
            }
         
        
            
          })
          .catch( (error)=> {
              console.log(error.type);
          });
  }else{
    Alert.alert("Wrong promo",
    "Please enter promo code sucessfully",
    [{
        text:"OK",
        onPress:()=>setCouponpress(false)
    }]
    )
  }
}


const reloadcart =()=>{
  carteAdded()
}


const Deleteitem = async (plant)=>{
  setIsloaded(false)
  await axios.post('http://3.6.180.23:5000/cartt/remove',{
    customerid:customerid,
    productid:plant.productid, 
    unit:1,
    
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
                onPress:()=>reloadcart()
            }]
            )
          }
       
      
          
        })
        .catch( (error)=> {
            console.log(error.type);
        });
  
 
}



const Additem = async (plant)=>{
  setIsloaded(false)
  await axios.post('http://3.6.180.23:5000/cartt/add',{
    customerid:customerid,
    productid:plant.productid, 
    unit:1,
    name:plant.name,
    price:plant.price
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
                onPress:()=>reloadcart()
            }]
            )
          }
       
      
          
        })
        .catch( (error)=> {
            console.log(error.type);
        });
  

}

const clearcart = async()=>{
  await axios.post('http://3.6.180.23:5000/cartt/minus/categoryid',{
    customerid:customerid,
    
  },{
    headers:{
      'Content-Type':'application/json'
    }}
    )
        .then( (response) =>{
 
          if (response.status === 200){
            Alert.alert("Added!",
            "added to order sucessfully",
            [{
                text:"OK",
                onPress:()=>navigation.getParent().navigate('Order')
            }]
            )
          }
       
      
          
        })
        .catch( (error)=> {
            console.log(error.type);
        });
  
}


let paymentoptions = "cod"
const  buyorders = async ()=>{
  setIsloaded(false)
if(district && street && area){

  await axios.post('http://3.6.180.23:5000/multipleorder/mo/addmoorder',{
    userid:customerid,
    products:item,
    total:final,
    price:final,
    paymenttype:paymentoptions,
    district:district,
            area:area,
            street:street
  },{
    headers:{
      'Content-Type':'application/json'
    }}
    )
        .then( (response) =>{
          if (response.status === 200){
           clearcart()
          }
       

       
      
          
        })
        .catch( (error)=> {
            console.log(error.type);
        });
  



}else{
  Alert.alert("Incomplete!",
            "Enter your district area street",
            [{
                text:"OK",
                onPress:()=>setIsloaded(true)
            }]
            )
}
}




const Card =({plant})=>{
  return<View key={plant._id} style={styles.card4}>
    <View style={{padding:10, alignItems:'center'}}>
    <View>
    <Text style={{color:'#f83758', fontWeight:'bold', fontSize:20}}>
        {plant.name}
      </Text>
    </View>


    <View  style={{ flexDirection:'row',justifyContent:'space-between'}}>
<View style={{margin:10}}>
  <TouchableOpacity onPress={()=>Deleteitem(plant)}>
    <View style ={{height:28, width:22,
backgroundColor:'#f83758',
borderRadius:5,
justifyContent:'center',
alignItems:'center'}}>
      <Text  style={{fontSize:15, color:'white', fontWeight:'bold'}}>
        -
      </Text>
    </View>
  </TouchableOpacity>
</View>
<View style={{margin:5}}>
  <Text style={{color:'#f83758', fontWeight:'bold', fontSize:24}}>
    {plant.unit}
  </Text>
</View>


<View style={{margin:10}}>
  <TouchableOpacity onPress={()=>Additem(plant)}>
    <View style ={{height:28, width:22,
backgroundColor:'#f83758',
borderRadius:5,
justifyContent:'center',
alignItems:'center'}}>
      <Text style={{fontSize:15, color:'white', fontWeight:'bold'}}>
        +
      </Text>
    </View>
  </TouchableOpacity>
</View>
</View>





     <View>
      <Text style={{color:'#f83758', fontWeight:'bold', fontSize:20}}>
        RS {plant.price}
      </Text>
     </View>


    
    
    </View>
  </View>
}









  









  return (
    <View style={{paddingTop: SCREEN_HEIGHT*0.06, backgroundColor:'white'}}>
     
     <ScrollView> 
    {!isloaded && (
      <>
      <View style={{justifyContent:'center', alignItems:'center', height:SCREEN_HEIGHT}}>
        <ActivityIndicator  size={81} color="#f83758" />
        <Text style={{color:'#f83758', fontSize:20}}>
          wait while loading...
        </Text>
        </View>
      </>
    )}
    {isloaded && (
      <>

      {emptycart && (
        <>
        <View style={{justifyContent:'center', alignItems:'center', height:SCREEN_HEIGHT}}>
        <ActivityIndicator  size={81} color="#f83758" />
        <Text style={{color:'#f83758', fontSize:20}}>
          Your cart is empty, please buy to continue...
        </Text>
        </View>
        </>
      )}
      {!emptycart && (
        <>
        <View>
          <ScrollView bounces={false}>
          <View style={{ alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:22, color:'#f83758', fontWeight:'bold'} }>
             Please proceed to continue
        </Text>

    </View>
   
    <View >
        <View style={styles.container1}>
        <View style={{ alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:22, color:'#f83758', fontWeight:'bold'} }>
            Enter Delivery Address 
        </Text>

    </View>
<View style={styles.card3}>
<TextInput  placeholder="Write Your district" value={district} onChangeText = {setDistrict}  />
</View>
<View style={styles.card3}>
<TextInput placeholder='enter your area name' value={area} onChangeText = {setArea}/>
</View>
<View style={styles.card3}>
<TextInput placeholder='enter your street'  value={street} onChangeText = {setStreet}/>
</View>
        </View>
    </View>

    <View style={{ alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:22, color:'#f83758', fontWeight:'bold'} }>
             Please, Verify the details. 
        </Text>

    </View>
   




              
        
<View>
<FlatList
 horizontal={true} 
  style={{margin:5}}
  data={item}
  keyExtractor={(item)=>item._id}
  renderItem={({item})=> <Card plant={item} />}
/>

</View>



<View>
  {!coponapplied && (
    <>
      <View>

      <View style={{alignItems:'flex-end', marginRight:30}}>
      <View>
        <Text style={{color:'#f83758', fontWeight:'bold', fontSize:20}}>
          Price : {price}
        </Text>
      </View>
      <View>
        <Text  style={{color:'#f83758', fontWeight:'bold', fontSize:20}}>
          Delivery fee : RS 29
        </Text>
      </View>
      <View>
        <Text  style={{color:'#f83758', fontWeight:'bold', fontSize:20}}>
          Total : {final}
        </Text>
      </View>
    </View>
<View>

</View>

      {couponpress && (
    <>
    <View style={{alignItems:'center', justifyContent:'center', margin:20}}>
    <ActivityIndicator  size={81} color="#f83758" />
        <Text style={{color:'#f83758', fontSize:20}}>
          wait while loading...
        </Text>
   </View>
    </>
)}



{!couponpress &&(
    <>
    <View style={{marginTop:10}}>
    
   <View style={{alignItems:'center', justifyContent:'center'}}>
    <Text style={{fontSize:18, color:'#f83758', fontWeight:'bold'} }>Enter coupon</Text>
   </View>
    <View style={{flex:0.5, flexDirection:'row', justifyContent:'space-between', margin:20, paddingTop:20, paddingBottom:80}}>
        <View style={styles.card}>
            <TextInput placeholder='enter promo code' value={coupon} onChangeText={setCoupon} />
        </View>
        <View>
<TouchableOpacity onPress={couponPressed}>
<View style={styles.card2}>
        
        <Text style={{fontSize:18, color:'white', fontWeight:'bold'} }>
            Continue
        </Text>
    </View>
        </TouchableOpacity>
        </View>
       
    </View>
</View>
    </>
)}
      </View>
    </>
  )}
</View>

          <View>
            
          </View>
          </ScrollView>        
        </View>
     
    {coponapplied && (
      <>
        <View style={{alignItems:'flex-end', marginRight:30}}>
        <View>
      <View>
        <Text  style={{color:'#f83758', fontWeight:'bold', fontSize:20}}>
          Price : {price}
        </Text>
      </View>
      <View>
        <Text  style={{color:'#f83758', fontWeight:'bold', fontSize:20}}>
          Discount : {discountrate/100} %
        </Text>
      </View>
      <View>
        <Text  style={{color:'#f83758', fontWeight:'bold', fontSize:20}}>
          Delivery fee : RS 29
        </Text>
      </View>
      <View>
        <Text  style={{color:'#f83758', fontWeight:'bold', fontSize:20}}>
          Total : {discounttotal}
        </Text>
      </View>
    </View>
        </View>
      </>
    )}
    {!paymentpress && (
      <>
      <View>
      
      <View style={styles.containerr}>
     
      
      
    
      
      
      
      
      <View style={{ justifyContent:'center', alignItems:'center', flex:1}}>
          <TouchableOpacity onPress={buyorders}>
          <View style={styles.buybtn}>
      <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>
          Cash on Delivery
      </Text>
         </View> 
      
      
         
          </TouchableOpacity>
      </View>
      </View>
</View>      
      </>
    )}
  
    {paymentpress && (
      <>
      <View style ={{alignItems:'center', justifyContent:'center'}}>
      <Text style={{color:'#F25041', fontSize:18, fontWeight:'bold'}}>
          Wait while loading
      </Text>
      </View>
      </>
    )}
        </>
      )}

    </>
    )}
    </ScrollView> 
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  card3:{
    borderRadius:10,
    backgroundColor:'white',
    height:50,
    width:360,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    margin:10,

},
container1:{
  flex:0.55,
  backgroundColor:'#F2F2F2',
  marginHorizontal:7,
  marginBottom:7,
  borderRadius:20,
   height:300,
  paddingTop:30
},
card:{
  borderRadius:10,
  backgroundColor:'#F2F2F2',
  height:50,
  width:170,
  borderColor:'black',
  alignItems:'center',
  justifyContent:'center'

  
},
card2:{
  borderRadius:10,
  backgroundColor:'#f83758',
  height:50,
  width:170,
  borderColor:'black',
  alignItems:'center',
  justifyContent:'center'

},
card4:{
  margin:10,
  borderRadius:20,
  backgroundColor:'#F2F2F2',
  width:SCREEN_WIDTH*0.43
},
containerr:{
  flex:0.5,
  backgroundColor:'#F2F2F2',
  marginHorizontal:7,
  marginBottom:7,
  borderRadius:10,
  height:200,
  
},
buybtn:{
  width:350,
  height:50,
  backgroundColor:'#f83758',
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10
},
})