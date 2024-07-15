import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { tabTitle } from '@/constant/screen/threads'

const AdviseLayout = () => {
  return (
    <Stack
    screenOptions={{
        headerStyle: {
          backgroundColor: "#0860c4",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
    }}
    >
        <Stack.Screen
            name='(threads)'
            options={{
                headerShown : true,
                headerTitle : tabTitle.header,
            }}
        />
        <Stack.Screen
            name='post'
            options={{
                headerShown : false
            }}
        />
        <Stack.Screen
            name='[id]'
            options={{
                headerShown : false
            }}
        />
    </Stack>
  )
}

export default AdviseLayout

