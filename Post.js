// Post.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const Post = ({ title, imageUrl }) => (
  <View style={styles.outer}>
    <FastImage
      style={styles.image}
      source={{
        uri: imageUrl,
        priority: FastImage.priority.high,
      }}
    />
    {title ? (
      <Text style={styles.head}>{title}</Text>
    ) : (
      <Text style={styles.head}>Image Doesn't have Title</Text>
    )}
  </View>
);

export default Post;

const styles = StyleSheet.create({
  outer: {
    // paddingVertical: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 230,
    alignSelf: 'center',
    // borderTopLeftRadius:30,
    // borderRadius: 6,
  },
  head: {
    // marginLeft:"-20%",
    color: 'white',
    fontSize: 20,
    width: '100%',
    backgroundColor:'black',
    padding:6,
    // borderBottomRightRadius:30,
  },
  noTitleText: {
    color: 'gray',
    fontSize: 16,
    // marginTop: 5,
  },
});
