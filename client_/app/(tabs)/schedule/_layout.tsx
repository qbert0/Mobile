import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SettingLayout = () => {
  return (
    <Stack
    screenOptions={{
     
    }}
    >
        <Stack.Screen 
            name='(option)'
            options={{
              headerTitle: 'Lịch khám',
              headerTitleAlign: 'center',
              headerStyle: {
                  backgroundColor: '#FFFFFF',
              },     
              headerTintColor: '#000000',
              headerTitleStyle: {
                  fontWeight: '100',
                  fontSize: 18,
              },
          }}
        />
    </Stack>
  )
}

export default SettingLayout