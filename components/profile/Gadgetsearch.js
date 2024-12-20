import { SafeAreaView, StyleSheet, Text, View, TextInput, FlatList, Dimensions, Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Gadgetsearch = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [data,setData] =useState([])

  const [istyped, setIstyped] = useState(false)



  useEffect(() => {
    axios
    .get('http://3.6.180.23:5000/ecomlist/getallname',{headers: {
       'Content-type': 'application/json',}
     })
      
      .then((responseJson) => {
        
        setFilteredDataSource(responseJson.data.message);
        setMasterDataSource(responseJson.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  
  
  
  
  const searchFilterFunction = (text) => {
    setIstyped(true)
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  
  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.name}
        
      </Text>
    );
  };
  
  
const getItem  = async (item) => {
    // Function for click on an item
    axios
    .get(`http://3.6.180.23:5000/ecomlist/id/getbyid/${item._id}`,{headers: {
       'Content-type': 'application/json',}
     })
      
      .then((responseJson) => {
        const plant = responseJson.data.data
        setData(plant)
        if(responseJson.status == 200){
           
            navigation.navigate('Gadgetdetail', plant)
        }
   
      })
      .catch((error) => {
        console.error(error);
      });

  };
  
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{flex: 1, marginTop:30}}>
    <View>

</View>
        <View style={styles.container}>
        <View>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        </View>

        {istyped && (
      <>
        <View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        </View>
      </>
    )}
        </View>
    </SafeAreaView>
  )
}

export default Gadgetsearch

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
      },
      itemStyle: {
        padding: 10,
      },
      textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },

})