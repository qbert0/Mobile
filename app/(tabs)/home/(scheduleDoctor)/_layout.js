import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <>
    <Stack>
    <Stack.Screen
          name='bookClinic'
          options={{
            headerShown : true,
          }}
        />
        <Stack.Screen
          name='bookDoctor'
          options={{
            headerShown : true,
          }}
        />
        <Stack.Screen
          name='confirm'
          options={{
            headerShown : true,
          }}
        />
        <Stack.Screen
          name='dateAndTime'
          options={{
            headerShown : true,
          }}
        />

    </Stack>
    </>
    )
}
