import { Text, View } from "react-native"
import ThreadAnser from "./ThreadAnser"
import { ThreadTitle } from "@/constant/screen/threads"
import { Comment, sortComment } from "./ThreadDataType"

interface anser {
    name : string,
    date : string,
    title : string,
}

interface Props {
    anser : Comment[] 
}

const ThreadAnserBox = ({anser} : Props) => {
    const anserSort = sortComment(anser)
   
    return (
        <>
        <View className="w-full px-3 py-1 ">
            {/* header */}
            <View className="py-1.5">
                <Text className="font-medium text-lg">
                    {ThreadTitle.anser + " "}
                </Text>

            </View>

            {anserSort.map((i, index) => (
                <ThreadAnser 
                key={index}
                name={i.name}
                date={i.createAt}
                title={i.content}
                />
            ))
            }
        </View>
        </>
    )
}

export default ThreadAnserBox