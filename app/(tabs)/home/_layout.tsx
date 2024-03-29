import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
        <Stack.Screen 
            
            name='index'
            options={{
                headerShown: true,
                headerTitle : "trang chu"
                
            }}
        />
        <Stack.Screen 
          name='test'
          options={{
            headerShown : true,
          }}
        />
        <Stack.Screen 
          name='(adviseDoctor)'
          options={{
            headerShown : false,
          }}
        />
        <Stack.Screen 
          name='(scheduleDoctor)'
          options={{
            headerShown : false,
          }}
        />
        
    </Stack>
  )
}

export default HomeLayout