import { ImageBackground, Text, View } from "react-native"
const woman = require("../../assets/avatar4.png");
import { Entypo } from '@expo/vector-icons';
const ImageNotPublic = () => {

    return (
        <ImageBackground
            source={woman}
            style={{width: 200, height: 180, borderRadius:12,}} 
            className="flex-col justify-center items-center"
        >
            <Entypo name="eye-with-line" size={24} color="white" />
            <Text className="text-base text-white">Ảnh chứa yếu tố nhạy cảm</Text>
        </ImageBackground>
    )
}

export default ImageNotPublic