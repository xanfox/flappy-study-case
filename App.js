import React, { useEffect, useState } from 'react';
import {  Dimensions, StyleSheet, View,Text, Button, TouchableWithoutFeedback } from 'react-native';

import Bird from './src/components/Bird'
import Pipes from './src/components/Pipes'

export default function App() {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth / 2

  const [birdBottom, setBirdBottom]               = useState(screenHeight / 2)
  const [pipesToLeft, setPipesToleft]             = useState(screenWidth)
  const [pipesToLeft2, setPipesToleft2]           = useState(screenWidth + screenWidth/2 +30)
  const [pipesRandomHeigh, setPipesRandomHeigh]   = useState(0)
  const [pipesRandomHeigh2, setPipesRandomHeigh2] = useState(0)
  const [isGameOver, setIsGameOver]               = useState(false)
  const [score, setScore]                         = useState(10)
  const [frames, setFrame] = useState(frame1)
  const [rotation, setRotation]                   = useState('0deg')
  const [counter, setCounter] = useState(0);

  const pipeWidth = 60
  const pipeHeight = 300
  //const gap = 200
  const [gap, setGap] = useState(200);
  const gravity = 3

  let gameTimerId
  let pipesToLeftLoop
  let pipesToLeftLoop2

  //variavis usadas nas animações
  const frame1 = require('./assets/flappy-bird-assets/PNG/frame-1.png')
  const frame2 = require('./assets/flappy-bird-assets/PNG/frame-2.png')
  const frame3 = require('./assets/flappy-bird-assets/PNG/frame-3.png')
  const frame4 = require('./assets/flappy-bird-assets/PNG/frame-4.png')
  const framer = [frame1, frame1, frame2, frame3, frame4]
  const rotor  = ['0deg', '1deg', '2deg', '3deg', '4deg', '5deg', '6deg',
                  '7deg', '8deg', '9deg', '10deg', '11deg', '12deg', '13deg',
                  '14deg', '15deg', '16deg', '17deg', '18deg', '19deg', '20deg',
                  '21deg', '22deg', '23deg', '24deg', '25deg', '26deg', '27deg',
                  '28deg', '29deg', '30deg', '31deg', '32deg', '33deg', '34deg', 
                  '35deg', '36deg', '37deg', '38deg', '39deg', '40deg', '41deg',
                  '42deg', '43deg', '44deg', '45deg' ]
  


  //makes the bird start to falling down
  let x

  useEffect(()=>{
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
        x = Math.floor(Math.random() * 5)

        setFrame(framer[x])
        
        setRotation(rotor[counter])
        setCounter(counter + 1)
        if(counter > 44){
          setCounter(0)
        }
       
        //console.log('frame: ' + framer[x])
      }, 30);

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
        console.log('game over')
        gameOver()
      }
    })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(pipesToLeftLoop)
    clearInterval(pipesToLeftLoop2)
    setIsGameOver(true)
  }

/*console.log('________________________________')
console.log('Largura da Tela: ' + screenWidth)
console.log('Altura da Tela: ' + screenHeight)
console.log('Esquerda do pássaro: ' + birdLeft)
console.log('Pezinho do pásaro: ' + birdBottom)
console.log('Cano um para a esquerda: ' + pipesToLeft)
console.log('Cano dois para a esquerda: ' + pipesToLeft2)
console.log('^ aq encerra o movimento do cano e bird')
console.log('Tamanho aleatório do cano 1  300px e + : ' + pipesRandomHeigh)
console.log('Tamanho aleatório do cano 2  300px e + : ' + pipesRandomHeigh2)
console.log('Esse é o tamanho do GAP: ' + gap)*/
//console.log(gameTimerId)


  return (
    <TouchableWithoutFeedback onPress={fly}>
      <View style={styles.container}>
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
    </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#986',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
