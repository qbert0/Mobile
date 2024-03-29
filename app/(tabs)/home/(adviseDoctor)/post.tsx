import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Post = () => {
  return (
    <>
    <Stack.Screen  options={{
        headerShown : true
    }}/>
    <View>
      <Text>Post</Text>
    </View>
    </>
    
  )
}

export default Post