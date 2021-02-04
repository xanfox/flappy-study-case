import React from 'react';
import { View } from 'react-native';

const Pipes = ({
    color, 
    pipeWidth, 
    pipeHeight, 
    pipesToLeft, 
    gap, 
    randomBottom,
}) => {

  return(
     <> 
        <View 
            style={{
                position: 'absolute',
                backgroundColor: color,
                width: pipeWidth,
                height: pipeHeight,
                left: pipesToLeft,
                bottom: randomBottom + pipeHeight + gap ,
            }}
        />
        <View 
            style={{
                position: 'absolute',
                backgroundColor: color,
                width: pipeWidth,
                height: pipeHeight,
                left: pipesToLeft,
                bottom: randomBottom,
            }}
        />        
    </>
  ) 
}

export default Pipes;