import { Image, Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { convertCreateAt, convertName } from "./ThreadDataType";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import ImageNotPublic from "./ImageNotPublic";
import AvatarImage from "./AvatarImage";

interface Props {
    gender : string,
    age : string,
    date : Date ,
    title : string ,
    major : string[] ,
    image : string ,
    puImage : boolean,
}

const client = createClient(
    'https://snwjzonusggqqymhbluj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
); 

const ThreadHeader = ({gender, age, date, title,major, image, puImage} : Props) => {

    const [imageUpload, setImageUpload] = useState('')
    const uploadMedia = async () => {
        const data = await client.storage
          .from('file')
          .download(image)
          // .list()
          .then(({ data }) => {
              const fr = new FileReader();
              if(!data) return
              fr.readAsDataURL(data);
              fr.onload = () => {
                setImageUpload(fr.result as string);
              };
          });
    }

    useEffect(() => {
        uploadMedia()
    },[])

    return (
    <>
    <View className="w-full bg-threadbg px-3 py-2 flex-col "
        style={{
            borderRadius: 6,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 1,
            shadowRadius: 2,
            elevation: 2,
        }}
    >
        {/* avatar */}
        <View className="w-full flex-row items-center border-b py-2.5 border-red-100">
            <View className="w-10 h-10 p-0.5 rounded-full mr-4 bg-white flex justify-center items-center">
                <AvatarImage gender={gender} age={age} />
            </View>
            <View className="flex-col flex-1">
                <Text className="text-sm font-semibold">{convertName(gender, age)}</Text>
                <Text className="text-sm font-light italic">{convertCreateAt(date)}</Text>
            </View>
        </View>

        {/* title */}
        <View className="px-2 py-2">
            <Text className="text-sm font-normal flex-row">
                {title}
            </Text>
        </View>

        {/* image */}
        {
            imageUpload !== '' && puImage && 
            <View className="my-3 px-2">
            <Image 
                source={{uri: imageUpload}} 
                style={{width: 200, height: 200, borderRadius:12,}} 
                
            />
        </View>
        }{
            imageUpload !== '' && !puImage && 
            <View className="my-3 px-2">
                <ImageNotPublic />
            </View>
        }
        

        {/* list major  */}
        <View className="flex-row flex-wrap">
            {major?.map((i) => (
            <View key={i} className='flex rounded-md justify-center items-center bg-majorbg shadow-lg p-1.5 mx-1'>
                <Text className='text-sm'>{i}</Text>
            </View> 
            ))}
            
        </View>

    </View>
    </>
    )
}

export default ThreadHeader