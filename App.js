import React, { useEffect, useState } from 'react';
import {  Dimensions, StyleSheet, View,Text, Button, TouchableWithoutFeedback, Image } from 'react-native';

import Bird from './src/components/Bird'
import Pipes from './src/components/Pipes'


export default function App() {
  const screenWidth = Math.floor( Dimensions.get('screen').width )
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth / 2

  const [birdBottom, setBirdBottom]               = useState(screenHeight / 2)
  const [pipesToLeft, setPipesToleft]             = useState(screenWidth)
  const [pipesToLeft2, setPipesToleft2]           = useState(screenWidth + screenWidth/2 +30)
  const [pipesRandomHeigh, setPipesRandomHeigh]   = useState(0)
  const [pipesRandomHeigh2, setPipesRandomHeigh2] = useState(0)
  const [isGameOver, setIsGameOver]               = useState(false)
  const [score, setScore]                         = useState(10)
  const [frames, setFrame]                        = useState(frame1)
  const [rotation, setRotation]                   = useState('0deg')
  const [counter, setCounter]                     = useState(0);
  const [cnt, setCnt]                             = useState(0)
  const [moveBackground, setMoveBackground]       = useState( 0 )

  const pipeWidth = 60
  const pipeHeight = 300
  //const gap = 200
  const [gap, setGap] = useState(200);
  const gravity = 3

  let gameTimerId
  let pipesToLeftLoop
  let pipesToLeftLoop2

  //variavis usadas nas animações
  const backgroundImg = require('./assets/background/forest.png')
  const frame1 = require('./assets/flappy-bird-assets/PNG/frame-1.png')
  const frame2 = require('./assets/flappy-bird-assets/PNG/frame-2.png')
  const frame3 = require('./assets/flappy-bird-assets/PNG/frame-3.png')
  const frame4 = require('./assets/flappy-bird-assets/PNG/frame-4.png')
  const framer = [frame1, frame1, frame2, frame3, frame4]
  /*const rotor  = ['0deg', '1deg', '2deg', '3deg', '4deg', '5deg', '6deg',
                  '7deg', '8deg', '9deg', '10deg', '11deg', '12deg', '13deg',
                  '14deg', '15deg', '16deg', '17deg', '18deg', '19deg', '20deg',
                  '21deg', '22deg', '23deg', '24deg', '25deg', '26deg', '27deg',
                  '28deg', '29deg', '30deg', '31deg', '32deg', '33deg', '34deg', 
                  '35deg', '36deg', '37deg', '38deg', '39deg', '40deg', '41deg',
                  '42deg', '43deg', '44deg', '45deg' ] */
  const rotor = ['0deg', '5deg', '10deg', '15deg', '20deg', '25deg', '30deg' ]
  


  //makes the bird start to falling down
  useEffect(()=>{
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
        

        setFrame(framer[cnt])
        setCnt(cnt => cnt + 1)
        if (cnt > 2) {
          setCnt(0)
        }
        
        setRotation(rotor[counter])
        setCounter(counter + 1)
        if(counter >  5){
          setCounter(0)
        }
        

        
      }, 30);
      setMoveBackground(moveBackground => moveBackground - 7)
      if (moveBackground <   - screenWidth / 100 * 156) {
        setMoveBackground(  screenWidth * 2  )
      }
      return () => {
        clearInterval(gameTimerId)
      } 
    }

  }, [birdBottom])

// makes the bird animation




// makes the bird tries to fly

  const fly = () =>{
    if(! isGameOver && birdBottom < screenHeight){
      setBirdBottom(birdBottom => birdBottom + 50)
      setScore(score => score + 10)
      setRotation('320deg')

    }
  }
  const restart = () => { 
    setScore(0)
    setIsGameOver(false)
    setBirdBottom(screenHeight/2)
    setPipesToleft(screenWidth)
    setPipesToleft2(screenWidth + screenWidth/2 +30)
  };


  // set the first pipe on the screen
  useEffect(()=>{
    if (pipesToLeft > -pipeWidth) {
      pipesToLeftLoop = setInterval(() => {
        setPipesToleft (pipesToLeft => pipesToLeft -5)
      }, 30);

      return () => {
        clearInterval(pipesToLeftLoop)
      }
    }else{
      setPipesToleft(screenWidth)
      setPipesRandomHeigh(Math.floor( Math.random() * 100 ) )
      setGap(Math.floor(Math.random() * 35 ) + 170)
      setScore(score => score + 100)
      
    }
  }, [pipesToLeft])

  // set second pipe obstacle :
  useEffect(()=>{
    if (pipesToLeft2 > -pipeWidth) {
      pipesToLeftLoop2 = setInterval(() => {
        setPipesToleft2 (pipesToLeft2 => pipesToLeft2 -5)
      }, 30);

      return () => {
        clearInterval(pipesToLeftLoop2)
      }
    }else{
      setPipesToleft2(screenWidth)
      setPipesRandomHeigh2(Math.floor(Math.random() * 100 ))
      setGap(Math.floor(Math.random() * 35 ) + 170)
      setScore(score => score + 100)
    }
  }, [pipesToLeft2])

    //check for collisions
    useEffect(() => {

      if (
        ((birdBottom < (pipesRandomHeigh + pipeHeight + 30 ) ||
        birdBottom > (pipesRandomHeigh + pipeHeight + gap -30)) &&
        (pipesToLeft > screenWidth/2 -30 && pipesToLeft < screenWidth/2 + 30 )
        )
        || 
        ((birdBottom < (pipesRandomHeigh2 + pipeHeight + 30) ||
        birdBottom > (pipesRandomHeigh2 + pipeHeight + gap -30)) &&
        (pipesToLeft2 > screenWidth/2 -30 && pipesToLeft2 < screenWidth/2 + 30 )
        )
        ) 
        {
        
        gameOver()
      }
    })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(pipesToLeftLoop)
    clearInterval(pipesToLeftLoop2)
    setIsGameOver(true)
  }



  return (
    
    <>

    <TouchableWithoutFeedback onPress={fly}>
      
    
      <View style={styles.container}>
      <Image
          source={backgroundImg}
          style={{
            
            left:   moveBackground,
            height: screenHeight / 100 * 80,
            width: screenWidth / 100 * 555

            
            
          }}

          />
          
      {isGameOver && <Button title='Game Over: Restart' onPress={restart}/> }
      <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft}
        frames={frames}
        rotatation={rotation}
      
      />
      <Pipes
        pipeWidth={pipeWidth}
        pipeHeight={pipeHeight}
        gap={gap}
        pipesToLeft={pipesToLeft}
        color={'blue'}
        randomBottom={pipesRandomHeigh}
      />

      <Pipes
        pipeWidth={pipeWidth}
        pipeHeight={pipeHeight}
        gap={gap}
        pipesToLeft={pipesToLeft2}
        color={'yellow'}
        randomBottom={pipesRandomHeigh2}
      />
      <Text>{score}</Text>
      <Text>Moving background: {moveBackground}</Text>
      <Text>Screen Width: { screenWidth }</Text>

    </View>
    </TouchableWithoutFeedback>
    
    </>
   

    
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#986',
    alignItems: 'center',
    justifyContent: 'center',
    //zIndex: 100,
    //position: 'absolute'
    
    
  },
  background:{

  }
})
