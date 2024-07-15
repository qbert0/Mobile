import {
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationEventMap
} from "@react-navigation/material-top-tabs"
import { Link, useRouter, withLayoutContext } from "expo-router"
import { ParamListBase , TabNavigationState } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { questionTitle } from "@/constant/screen/threads";


const {Navigator} = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<   
    MaterialTopTabNavigationOptions,
    typeof Navigator,TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
    
>(Navigator);


const Layout = () => {
    const router = useRouter()

    const onQuestion = () => {
      router.push("/(adviceDoctor)/post")
    }

    return (
        <>
        <MaterialTopTabs screenOptions={{
            // tabBarPressColor: "#fff",
            // tabBarActiveTintColor : "#0860c4",
            // tabBarInactiveTintColor : "#fff",
        }}>
            <MaterialTopTabs.Screen 
                name="advice"
                options={{
                  
                }}
            />
            <MaterialTopTabs.Screen 
                name="myself"
                options={{
                    
                }}
            />

        </MaterialTopTabs>
        <Link href={"/(adviceDoctor)/post"} className=' flex-col bg-question items-center absolute rounded-l-lg right-0 z-10 bottom-1/4 p-0.5'>
          <TouchableOpacity
            className='z-20 flel-col items-center relative'
            onPress={onQuestion}
          >
            <MaterialCommunityIcons name="account-question-outline" size={24} color="white" />
            <Text className="text-white">
              {questionTitle.title1}
            </Text>
            <Text className="text-white">
              {questionTitle.title2}
            </Text>
          </TouchableOpacity>
        
        </Link>
        
        </>
    )
}

export default Layout