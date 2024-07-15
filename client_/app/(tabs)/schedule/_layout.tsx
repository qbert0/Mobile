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
            headerShown: true,
            headerTitle: () => (
              <View className="w-ful">
                <Text className="text-white flex-row justify-center text-2xl font-semibold ">
                  Lịch khám
                </Text>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#0860c4",
            },
          }}
        />
    </Stack>
  )
}

export default SettingLayout