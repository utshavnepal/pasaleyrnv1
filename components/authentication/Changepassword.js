import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';

import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux' 
const Changepassword = ({navigation, route}) => {
  const phoneno = route.params
  const [password, setPassword] = useState("")
  const [secured, setSecured] = useState(true)
  const clearTextInput = () => {
    
    setPassword('')
    setPressed(false)
  }
  
  const [pressed, setPressed] = useState(false)
  const myData= useSelector(state => state.user.id)



  const toastConfig = {
    warning: ({ text1, props }) => (
      <View style={{ height: 30, width: '100%', backgroundColor: 'orange', padding: 4, }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
    done: ({ text1, props }) => (
      <View style={{ height: 30, width: '100%', backgroundColor: '#1affc6', padding: 4, }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };





  const handleFormSubmit = async () => {
    if ( password) {

     
      await axios.post('http://3.6.180.23:5000/user/changepassword',{
        password:password,
        userid:myData
      },{
        headers:{
          'Content-Type':'application/json'
        }}
        )
            .then( (response) =>{
              
           if (response.status === 200){
            navigation.reset({
              index:0,
              routes:[{name:'Homelogged'}]
              })
           }else{
            Alert.alert("Error",
            "Error in resetting password ",
            [{
                text:"OK",
            
            }]
            )
           } 
            })
            .catch( (error)=> {
                console.log(error.type);
            });        
        
      }
      
      
      
    else {
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        text1: "All fields are Required"
      })
    }
  }

  return (
    <View style={{marginTop:80}}>

<Toast config={toastConfig} />
    <ScrollView>
    <View style={styles.one}>
        <Image style={styles.two} source={require('../../assets/stupa.png')}/>
      </View>
     
<View>
<View style={styles.one}>
      <Text style={styles.three}>
        Change your password
      </Text>
      </View>
<View style={[styles.one, styles.four]}>
 
    
<TextInput style={styles.five} value={password} onChangeText={setPassword} placeholder="Write Your Password" secureTextEntry={secured} />
            <TouchableOpacity style={styles.pass} onPress={()=>{setSecured((prev)=>!prev)}}>
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
<TouchableOpacity>
<Text style={styles.seven} >wait</Text>
</TouchableOpacity>
  
</View>
  </>
)}
</View>

</ScrollView>
<View style={{marginTop:150}}>
  <View style={styles.one}>
    <Text style={styles.eight}>
    Forgot password
    </Text>
  </View>
  
</View>

  
     

    </View>
  )
}

export default Changepassword

const styles = StyleSheet.create({
  one:{
alignItems:'center'
  },
  two:{
    height:250,
    width:250
  },
  three:{
    marginTop:30,
    fontSize:30,
    marginBottom:30,
    color:'#f83758'
  },
  four:{
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
    marginTop:30,
    fontSize:20,
    
    color:'#f83758'
  },
})