import { View, Text, TouchableOpacity, SafeAreaView, Image  } from "react-native"
import * as ImagePicker from 'expo-image-picker'
import React, {useState} from 'react'
import * as FileSystem from 'expo-file-system'
import { supabase } from "@/config/initSupabase"
import { createClient } from "@supabase/supabase-js"
import { decode } from 'base64-arraybuffer';
import { FileObject } from '@supabase/storage-js';
const client = createClient(
    'https://snwjzonusggqqymhbluj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
  );  


  const avatar = require("@/assets/favicon.png")
//   const sukimage = File("@/assets/favicon.png")
const Ngu =  () => {
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [files, setFiles] = useState<FileObject[]>([])

    const pickImagesss = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing : true,
            aspect : [4,3],
            quality : 1,
        })

        if(!result.canceled) {
            try {
                const img = result.assets[0];
            // const base64 = await FileSystem.readAsStringAsync(img.url, {encoding:'base64'})
            const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
            const filePath = `${new Date().getTime()}.${img.type === 'image' ? "png" : 'mp4'}`
            const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
            const data = await client.storage.from('file').upload(filePath, decode(base64), {contentType})
            // const {data, error} = await client.from("Customer").select("*").eq("userId", 'user_2fxeacU0fbaDAJBA4OLd6v3ojgC')
            console.log(data)
            } catch (error) {
                console.error(error)
            }
            

        }
    }

    const uploadMedia = async () => {
          const data = await client.storage
            .from('file')
            .download(`1718293265133.png`)
            // .list()
            .then(({ data }) => {
                const fr = new FileReader();
                if(!data) return
                fr.readAsDataURL(data);
                fr.onload = () => {
                  setImage(fr.result as string);
                };
            });
            // .getPublicUrl()

        // console.log(data)
    }

    return (
        <>
            <View>

                <TouchableOpacity onPress={pickImagesss}>
                    <Text className="text-xl font-semibold">
                        chon anh moi di
                    </Text>
                </TouchableOpacity>

                {
                    image && <Image  
                        source={{uri : image}}
                        style ={{width : 30, height : 30}}
                    />
                }
                <Image  
                        source={{uri : 'https://snwjzonusggqqymhbluj.supabase.co/storage/v1/object/public/file/1718293265133.png'}}
                        style ={{width : 300, height : 300}}
                    />
                <TouchableOpacity onPress={uploadMedia}>
                    <Text className="text-xl font-semibold">
                        update anh moi
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Ngu