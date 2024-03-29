import { View, Text } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import Post from '@/components/card/Post'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const advise = () => {
  return (
    <>
    <Stack.Screen  options={{
        headerShown : true
    }}/>
    <View className='h-full w-full bg-bg'>
        <View className='bg-post-bt flex-col items-center absolute rounded-l-lg right-0 z-10 bottom-1/4 p-0.5'>
        <MaterialCommunityIcons name="account-question-outline" size={24} color="black" />
            <Text>
              dajt 
              
            </Text>
            <Text>
              cau hoi
            </Text>
        </View>

        <Post />
    </View>
    </>
    
  )
}

export default advise