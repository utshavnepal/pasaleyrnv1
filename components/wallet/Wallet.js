import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
const Wallet = () => {
    const [loading, setLoading] = useState(true)
    const [otpsent, setOtpsent] = useState(true)
    const [mobile, setMobile] = useState('')
    const [transationPin, setTransationPin] = useState('')
    const [amount, setAmount] = useState(11187)
    const[secured, setSecured] = useState(true)
    const [otp, setOtp] = useState('')

    const appPaymentPressed = async ()=>{
        if(mobile&transationPin){
            let data =  JSON.stringify({
                "public_key": "test_public_key_071a7740881240bd97d2eb6b79a96c18",
                "mobile": mobile,
                "transaction_pin": transationPin,
                "amount": amount,
                "product_identity": "book/id-120",
                "product_name": "A Song of Ice and Fire",
                "product_url": "http://bookexample.com"
              });
              
         axios.post('https://khalti.com/api/v2/payment/initiate/', data, {
            headers:{
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            const token = res.data.token
            navigation.navigate('Khaltiotp', {token:token, mobile:mobile})
        }).catch((error)=>{
            console.log(error)
            
            
        })
        }else{
            console.log('entermobileor pw')
        }
        
        
                  
                }




    const otpEntered =async()=>{
console.log(otp)
    }
  return (
    <>
        {!loading && (
            <>
            <View style={{justifyContent:'center', alignItems:'center', height:'100%'}}>
        <ActivityIndicator  size={81} color="#f83758" />
        <Text style={{color:'#f83758', fontSize:20}}>
          wait while loading...
        </Text>
        </View>
            </>
        )}
        {loading && (
            <>
            {!otpsent && (
                <>
                <View style={{padding:40, backgroundColor:'#fdf7fd'}}>
  <View style={{justifyContent:'center', alignItems:'center', padding:20, marginTop:30}}>
    <Text style={{color:'#9d9ca1', fontSize:16}}>enter your khalti account detail to procced with your Order.</Text>
  </View>
  <View style={{marginTop:30}}>
                <TextInput  value={mobile} onChangeText={setMobile}  disableFullscreenUI={false} importantForAutofill='auto' 
                autoComplete='tel' placeholder='Enter your Mobilenumber' keyboardType='phone-pad' maxLength={10} 
                style={{backgroundColor:'#ffe8f2', width:300, height:50, borderRadius:10, alignItems:'center', justifyContent:'center'}}  />
            </View>

            <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center', }}>
                <TextInput  value={transationPin} onChangeText={setTransationPin} disableFullscreenUI={false}  placeholder='Enter your khalti pin here' 
                 secureTextEntry={secured}  
                
                style={{backgroundColor:'#ffe8f2',marginTop:20, width:300, height:50, borderRadius:10, alignItems:'center', justifyContent:'center'}}  />
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', marginTop:20, marginLeft:10}} onPress={()=>{setSecured((prev)=>!prev)}}>
              <Text style={{color:"#f1497f"}}>
                show 
              </Text>
            </TouchableOpacity>
            </View>


<View style={{padding:20,marginTop:30 }}>
<View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
<View style={{}}>
    <Text style={{fontSize:18, fontWeight:'800', color:'#6e47f3'}}>
        One month charge
    </Text>
</View>
<View>
    <Text style={{fontSize:18, fontWeight:'800', color:'#6e47f3'}}>
       Rs 99
    </Text>
</View>
</View>
<View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10}}>
<View style={{}}>
    <Text style={{fontSize:18, fontWeight:'800', color:'#6e47f3'}}>
        Vat 13%
    </Text>
</View>
<View>
    <Text style={{fontSize:18, fontWeight:'800', color:'#6e47f3'}}>
       Rs 12.87
    </Text>
</View>
</View>
<View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderTopWidth:2, borderColor:'#9d9ca1'}}>
<View style={{}}>
    <Text style={{fontSize:18, fontWeight:'800', color:'#6e47f3'}}>
        Total
    </Text>
</View>
<View>
    <Text style={{fontSize:18, fontWeight:'800', color:'#6e47f3'}}>
       Rs 111.83
    </Text>
</View>
</View>

</View>






<View style={{marginTop:18, alignItems:'center', justifyContent:'center'}}>
<TouchableOpacity onPress={appPaymentPressed}>
      <View style={{backgroundColor:'#f83758',marginTop:30, height:50, width:300,  borderRadius:30, alignItems:'center', justifyContent:'center', elevation:6, shadowColor:'#FFE8F2'}}>
<Text style={{fontSize:18, fontWeight:'bold', color:'#fdf7fd'}}>
  Send Otp
</Text>
          </View>
          </TouchableOpacity>
</View>

    </View>
                </>
            )}
       

{otpsent && (
    <>
<View style={{paddingTop:30}}>
<View >
      <View style={{justifyContent:'center', alignItems:'center', padding:30, marginTop:30}}>
    <Text style={{color:'#9d9ca1', fontSize:16}}>enter OTP sent to your mobile number inorder to procced with your Order.</Text>
  </View>
</View>
<View style={{alignItems:'center', justifyContent:'center', marginTop:30}}>
    <TextInput  value={otp} onChangeText={setOtp}  disableFullscreenUI={false} importantForAutofill='auto' 
                autoComplete='sms-otp' placeholder='Enter your Otp' keyboardType='phone-pad' maxLength={8} 
                style={{backgroundColor:'#ffe8f2', width:300, height:50, borderRadius:10, alignItems:'center', justifyContent:'center'}}  /> 
</View>



<View style={{marginTop:18, alignItems:'center', justifyContent:'center'}}>
<TouchableOpacity onPress={otpEntered}>
      <View style={{backgroundColor:'#f83758',marginTop:30, height:50, width:300,  borderRadius:30, alignItems:'center', justifyContent:'center', elevation:6, shadowColor:'#FFE8F2'}}>
<Text style={{fontSize:18, fontWeight:'bold', color:'#fdf7fd'}}>
  Send Otp
</Text>
          </View>
          </TouchableOpacity>
</View>


    
</View>
    </>
)}

            </>
        )}
    </>
  )
}

export default Wallet

const styles = StyleSheet.create({})