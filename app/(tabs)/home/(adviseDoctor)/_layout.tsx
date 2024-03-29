import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AdiviseLayout = () => {
  return (
    <>
    <Stack>
        <Stack.Screen 
            name='advise'
            options={{
                headerShown : true,
            }}
        />
        <Stack.Screen 
          name='post'
          options={{
            headerShown : true,
          }}
        />
    </Stack>
    </>
  )
}

export default AdiviseLayout