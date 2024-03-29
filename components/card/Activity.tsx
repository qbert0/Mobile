import { View, Text, Image, ImageBackground,   } from 'react-native'
import React from 'react'
import ButtonDesign from './ButtonDesign'
import { pathScreen } from '../../constant/pathFile'
const background = require("../../assets/background.jpg")
const background2 = require("../../assets/background2.jpg")
const background3 = require("../../assets/background3.jpg")
const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const Activity = () => {
  

  return (
    <View className='flex flex-row justify-between mt-8 mb-8 absolute'>
      <ImageBackground 
        source={background} 
        resizeMode="cover" 
        style={{
          height: 230,
        }}
        className=' w-full grid grid-rows-2'
      >
        <ButtonDesign path={pathScreen.advise.path} label={pathScreen.advise.lable} />
        <ButtonDesign path={pathScreen.schedule.path} label={pathScreen.schedule.label} />
      </ImageBackground>
      
      
      
    </View>
  )
}

export default Activity