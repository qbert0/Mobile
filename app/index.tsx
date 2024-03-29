import { Redirect } from "expo-router";
import { Text, View } from "react-native";

const StartPage = () => {
  return (
    <Redirect href={"./home"}/>
  )
}

export default StartPage;