import React from 'react';
import { View, Image, StyleSheet, ImageBackground, Text } from 'react-native';

// import { Container } from './styles';
const backgroundImg = require('../../assets/background/forest.png')
const BackGround  = () => {
  return (
    <View>
        <Text>Lumpa</Text>
        <ImageBackground 
          source={backgroundImg} 
          style={{
            //flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            zIndex: 1000,
            marginTop: 500
        }}>

        </ImageBackground>
    </View>
)}

export default BackGround


