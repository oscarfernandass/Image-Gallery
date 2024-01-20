import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text, ActivityIndicator } from 'react-native';
import Post from './Post';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [photos, setPhotos] = useState([]);
  const [storedPhotos, setStoredPhotos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    navigation.addListener('focus',async()=>{
      fetchFlickrData();
    })
  })

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const getData = async (key) => {
    try {
      const storedData = await AsyncStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };



const fetchFlickrData = async () => {
  // setRefreshing(true);
  // setLoading(true);
  try {
    const response = await fetch(
      'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
    );

    if (!response.ok) {
      const storedData = await getData('flickrData');
      if (storedData && storedData.length > 0) {
        setPhotos(storedData);
        alert('You are offline. Displaying data from AsyncStorage.');
      } else {
        alert('Network request failed, and no stored data found');
        throw new Error('Network request failed, and no stored data found');
      }
    } else {
      const data = await response.json();
      setPhotos(data.photos.photo);
      setStoredPhotos(data.photos.photo);
      storeData('flickrData', data.photos.photo);
    }
  } catch (error) {
    const storedData = await getData('flickrData');
    if (storedData) {
      setPhotos(storedData);  
      alert('You are offline. Displaying data from Async Storage.');
    } else {
      console.error('Error fetching data:', error);
      alert('Network request failed, and no stored data found');
    }
  } finally {
    setRefreshing(false);
  }
  setLoading(false);
};



  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFlickrData();
  }, []);

  useEffect(() => {
    fetchFlickrData();
  }, []);

  

  return (
    <View style={styles.container}>
      {/* Show ActivityIndicator on top when refreshing */}
      {refreshing && (
        <View style={styles.refreshIndicator}>
          <ActivityIndicator style={{padding:10}} size="larger" color='lightgreen' />
        </View>
      )}
      {loading?
      (
        <>
        <FlatList
          data={storedPhotos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => 
          <Post title={item.title} imageUrl={item.url_s} 
          />}
          ItemSeparatorComponent={() => <View style={{ borderBottomWidth: 5, borderBottomColor: 'lightgreen' }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          />
          </>
      ):
      (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post title={item.title} imageUrl={item.url_s} />}
          ItemSeparatorComponent={() => <View style={{ borderBottomWidth: 5, borderBottomColor: 'lightgreen' }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['transparent','transparent']} progressBackgroundColor={'transparent'}/>
          }
        />
      )
      }
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});