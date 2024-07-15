import { View,   } from 'react-native'
import React from 'react'
import ButtonDesign from './ButtonDesign'
import { pathScreen } from '../../constant/pathFile'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Activity = () => {
  

  return (
    <View className='flex-row px-2 '>
        <ButtonDesign 
          path={pathScreen.advise.path} 
          label={pathScreen.advise.lable} 
        >
          <MaterialCommunityIcons name="chat-question" size={24} color="#194d89" />
        </ButtonDesign>
        <ButtonDesign 
          path={pathScreen.order.path} 
          label={pathScreen.order.label} 
        >
          <MaterialCommunityIcons name="robot-excited" size={24} color="#194d89" />
        </ButtonDesign>
    </View>
  )
}

export default Activity