import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';



const Bird = ({birdBottom, birdLeft, frames}) => {

    


    const birdWidth = 50
    const birdHeight = 60

    return (
        <View style={{
            position: 'absolute',
            backgroundColor: 'yellow',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
        }}>
          <Image style={birdStyles.container} source={frames}/>
        </View>
    )
}

export default Bird

const birdStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#986',
      alignItems: 'center',
      justifyContent: 'center',
      width:70,
      height:60
    },
  })