import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const Info = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.first}>
        <Text style={{fontSize:50,color:'white',marginLeft:"5%"}}>API Calls &</Text>
        <Text style={{fontSize:30,color:'black',fontWeight:'700',marginLeft:"5%"}}>Caching</Text>
        <Text style={{width:"80%",marginLeft:"5%",color:'white',padding:10}}> In React Native, performing API calls and implementing caching mechanisms are integral for efficient data retrieval and storage. The fetch API and third-party libraries like Axios enable developers to make network requests seamlessly. Caching, crucial for enhancing app performance, can be achieved using AsyncStorage, a key-value storage system, suitable for smaller data sets. For larger states managed by Redux, Redux Persist proves valuable by persisting and rehydrating the store across app sessions. Additionally, network request caching, implemented through libraries or custom solutions, helps optimize app responsiveness. These practices collectively contribute to a smoother user experience, ensuring data availability and minimizing reliance on consistent network connectivity.</Text>
      </View>
      <View style={styles.second}>
        <Text style={{color:'white',fontSize:100}}>Oscar</Text>
        <Text style={{color:'lightgreen', fontSize:15,fontWeight:'800',paddingBottom:10}}>Fernandas</Text>
      </View>
    </ScrollView>
  )
}

export default Info

const styles = StyleSheet.create({
    container:{
        // flex:1,
        // justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    },
    first:{
        // height:"75%",
        width:"100%",
        backgroundColor:'lightgreen',
        flexDirection:'column',
        justifyContent:'center',
        gap:10,
        // alignItems:'center',
    },
    second:{
        // height:"25%",
        width:"100%",
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center',
    }
})