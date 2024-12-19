import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { useRegisterUserMutation } from '../services/userAuthApi';
import { storeToken } from '../services/AsyncStorageService';
import Toast from 'react-native-toast-message';
const Registration = ({navigation, route}) => {
  
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [secured, setSecured] = useState(true)
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [csecured, setScecured] = useState(true)

  const [pressed, setPressed] = useState(false)
  const phoneno = route.params


  const clearTextInput = () => {
    setName('')
    setPressed(false)
    setPassword('')
    setPassword_confirmation('')
    
  }


  const [registerUser] = useRegisterUserMutation()


  
  const handleFormSubmit = async () => {
    setPressed(true)
    if (name && phoneno && password && password_confirmation ) {
      if (password === password_confirmation) {
        if(phoneno.length === 10){
          const formData = { name, phoneno, password, password_confirmation }
          const res = await registerUser(formData)
          if (res.data.status === "success") {
            await storeToken(res.data.token) 
            // Store Token in Storage
            clearTextInput()
            navigation.reset({
              index:0,
              routes:[{name:'Homelogged'}]
              })
            
          }
          if (res.data.status === "failed") {
            Toast.show({
              type: 'warning',
              position: 'top',
              topOffset: 0,
              text1: res.data.message
            })
        }

        }
        else{
          Toast.show({
            type: 'warning',
            position: 'top',
            topOffset: 0,
            text1: 'enter 10 digit phoneno'
          })
        }
      } else {
        Toast.show({
          type: 'warning',
          position: 'top',
          topOffset: 0,
          text1: "Password and Confirm Password doesn't match"
        })
      }
    } else {
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        text1: "All fields are Required"
      })
    }
  }





  const toastConfig = {
    warning: ({ text1, props }) => (
      <View style={{ height: 30, width: '100%', backgroundColor: '#f83758', padding: 4, }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
    done: ({ text1, props }) => (
      <View style={{ height: 30, width: '100%', backgroundColor: '#f83758', padding: 4, }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };



  
  return (
    <View style={{marginTop:90}}>
    <Toast config={toastConfig} />
    <ScrollView>
    <View style={styles.one}>
        <Image style={styles.two} source={require('../../assets/welcome.png')}/>
        <Text style={styles.three}>Register!</Text>
      </View>
 
     
<View>

<View style={[styles.one, styles.four]}>
 
    
 <TextInput style={styles.five}
           placeholder="Name"
           
           value={name} onChangeText={setName}   

       />
 
</View>

<View style={[styles.one, styles.eight]}>
 
    
<TextInput style={styles.five} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry={secured} />
            <TouchableOpacity style={styles.pass} onPress={()=>{setSecured((prev)=>!prev)}}>
              <Text>
                show 
              </Text>
            </TouchableOpacity>
 
</View>
<View style={[styles.one, styles.eight]}>
 
    
 <TextInput style={styles.five} value={password_confirmation} onChangeText={setPassword_confirmation} placeholder="Confirm Password" secureTextEntry={csecured} />
             <TouchableOpacity style={styles.pass} onPress={()=>{setScecured((prev)=>!prev)}}>
               <Text>
                 show 
               </Text>
             </TouchableOpacity>
  
 </View>
 




{!pressed && (
  <>
  <View style={[styles.one, styles.six]}>
<TouchableOpacity onPress={handleFormSubmit}>
<Text style={styles.seven} >Continue</Text>
</TouchableOpacity>
  
</View>

  </>
)}
{pressed && (
  <>
  <View style={[styles.one, styles.six]}>
<TouchableOpacity >
<Text style={styles.seven} >wait</Text>
</TouchableOpacity>
  
</View>

  </>
)}

</View>



<View style={{marginTop:150}}>
  <View style={styles.one}>
    <Text>
      By continuing, you agree to our
    </Text>
  </View>
  <View style={styles.one}>
    <Text>
      Terms of Service Privacy Policy Content Policy
    </Text>
  </View>
</View>
   
     
</ScrollView>
    </View>
  )
}

export default Registration

const styles = StyleSheet.create({
  one:{
alignItems:'center'
  },
  two:{
    height:250,
    width:200,
    resizeMode:'cover'
  },
  three:{
    fontSize:30,
    fontWeight:'bold',
    
    color:'#f83758'
  },
  four:{
    flexDirection: "row",
        marginTop: 60,
        marginHorizontal: 25,
        backgroundColor:"white",
     
        padding: 15,
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5},
        elevation: 3,
        shadowOpacity: 0.1,
  },
  five:{
    fontSize: 20,
  
  },
  six:{
   
        marginTop: 30,
        marginHorizontal: 25,
        backgroundColor:"#f83758",
     alignContent:'center',
        padding: 10,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5},
        elevation: 3,
        shadowOpacity: 0.1,
        
  },
  seven:{
    color:'white',
    alignItems:'center',
    fontSize:20
  },
  eight:{
    flexDirection: "row",
        marginTop: 20,
        marginHorizontal: 25,
        backgroundColor:"white",
     justifyContent:'space-between',
        padding: 15,
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5},
        elevation: 3,
        shadowOpacity: 0.1,
  }
})