import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios'
const Phoneno = ({navigation}) => {
  
  const [phoneno, setPhoneno] = useState(null)
const [pressed, setPressed] = useState(false)



const buttonClicked = async ()=>{
  
  if (phoneno.length === 10) {
    try {
      await axios.post('http://3.6.180.23:5000/user/checkuserauth',JSON.stringify({
        phoneno:phoneno
      }),{
        headers:{
          'Content-Type':'application/json',
          
        }}
        )
            .then( (response) =>{
              
             setPressed(false) 
              if (response.data.status === 'register'){
                navigation.navigate('Registration',phoneno)
              }
               
              if (response.data.status === 'user'){
                navigation.navigate('Password',phoneno)
              }
          
              
            })
            .catch( (error)=> {
                console.log(error);
            });   
    } catch (error) {
      console.log(error)
    }
   
  }else{
    setPressed(false)
  }
  
}
  return (
    <View style={{marginTop:30}}>
    <ScrollView>
    <View style={styles.one}>
        <Image style={styles.two} source={require('../../assets/BG.png')}/>
      </View>
   
     
<View>

<View style={[styles.one, styles.four]}>
 
    
 <TextInput style={styles.five}
           placeholder="Enter Phone Number"
           
           value={phoneno} onChangeText={setPhoneno}  keyboardType='phone-pad' maxLength={10} 




/>
</View>



{!pressed && (
  <>
  <TouchableOpacity onPress={buttonClicked}>
<View style={[styles.one, styles.six]}>

<Text style={styles.seven} >Continue</Text>

  
</View>
</TouchableOpacity>
  </>
)}
{pressed && (
  <>
  <View style={[styles.one, styles.six]}>
  <Text style={styles.seven} >Wait while processing</Text>
  </View>
  </>
)}

</View>


</ScrollView>

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
   
     

    </View>
  )
}

export default Phoneno

const styles = StyleSheet.create({
  one:{
alignItems:'center'
  },
  two:{
    height:350,
    width:300
  },
  three:{
    fontSize:60,
    
    color:'#f83758'
  },
  four:{
    flexDirection: "row",
        marginTop: 20,
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
  }
})