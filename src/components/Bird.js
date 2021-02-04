import React from 'react';
import { View, Image, StyleSheet } from 'react-native';



const Bird = ({birdBottom, birdLeft, frames, rotatation}) => {

    


    const birdWidth = 50
    const birdHeight = 60
    

    return (
        <View style={{
            position: 'absolute',
            //backgroundColor: 'yellow',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
            transform: [{ rotate: rotatation }]
        }}>
          <Image style={birdStyles.container} source={frames}/>

        </View>
    )
}

export default Bird

const birdStyles = StyleSheet.create({
    container: {
      width:70,
      height:60
    },
  })