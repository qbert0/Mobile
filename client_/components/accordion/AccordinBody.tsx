import { Image, StyleSheet, Text } from "react-native"
import { View } from "react-native"

const HEIGHT = 300
const HEIGHT_COMMENt = 45
const styles = StyleSheet.create({
    body : {
        backgroundColor: "white",
        marginHorizontal: 2,
        flexDirection: "row",
        borderRadius : 8,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#f4f4f6",
        height: HEIGHT
    },
    comment : {
        // backgroundColor: "white",
        // flexDirection: "row",
        // borderRadius : 8,
        // justifyContent: "space-between",
        // alignItems: "center",
        // paddingVertical: 8,
        // paddingHorizontal: 16,
        // borderBottomWidth: 1,
        // borderColor: "#f4f4f6",
        height: HEIGHT_COMMENt
    }
})
const defaultLink = "https://files.edgestore.dev/w3yo8jqa6b3xtuvu/publicFiles/_public/"

interface Props {
    image? : string
    comment? : string
}

const AccordinBody = ({image, comment} : Props ) => {

    if (!image) {
        return (
            <View style={[styles.comment]}
            className="flex-col px-2 mb-1"
            >
                <Text className="text-base font-bold">Nhận xét</Text>
                <Text>{comment}</Text>
            </View>
        )
    }

    return (
        
        <View 
            style={[styles.body]}
        >
            <Image
            source={{uri: defaultLink + image}}
            style={{
                height: HEIGHT,
            }}
            className="w-full"
        />
        </View>
    )
}

export default AccordinBody