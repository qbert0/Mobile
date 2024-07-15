import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import React from "react";
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const router = useRouter();

  // If the user is signed in, redirect them to the home page
  // If the user is not signed in, redirect them to the login page
  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/home/");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  return (
    <Stack>
      <Stack.Screen
        name="(public)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(adviceDoctor)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="scheduleDoctor"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="personal"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
        <InitialLayout />
      
    </ClerkProvider>
  );
};

export default RootLayoutNav;
