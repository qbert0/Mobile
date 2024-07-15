import React from "react";
import { Tabs, usePathname } from "expo-router";
import { tabbar, tabbarsub } from "../../constant/tabsbar";

const TabLayout = () => {
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0860c4", // sua mau tabbar active o day
        // tabBarInactiveTintColor : ""
      }}
    >
      {tabbar.map((tab: tabbarsub) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarLabel: tab.tabBarlabel,
            tabBarIcon: ({ color, size }) => (
              <tab.tabbarIcon size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
