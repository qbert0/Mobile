import { Image, View } from "react-native"
const woman = require("../../assets/nu.jpg");
const man = require("../../assets/nam.jpg");
interface Props {
    gender : string,
    age : string,
}

const AvatarImage = ({gender, age} : Props) => {

    return (
            <View className=" w-full h-full bg-majorbg rounded-full flex justify-center items-center">
                <Image  
                    source={gender === 'woman' ? woman : man}
                    // style={{width: 10, height: 10, borderRadius:12,}} 
                    className="h-full w-full rounded-full"
                />
            </View>
    )
}

export default AvatarImage