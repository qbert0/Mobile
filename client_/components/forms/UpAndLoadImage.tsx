import { View, Text, Button, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { ForwardedRef,  RefObject,  useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import * as FileSystem from "expo-file-system"
import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons';

import { publicImageTitle } from '@/constant/screen/post'
import BottomSheet from '@gorhom/bottom-sheet'
import { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { useMyContext } from '../context/UpLoadContext';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
const client = createClient(
    'https://snwjzonusggqqymhbluj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
  );  
const imgDir = FileSystem.documentDirectory + 'images/'

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if(!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates : true})
    }
}

interface Props {
    images : string[]
    setImages : ([] : string[]) => void,
    open : () => void ,
    setImageUpload : (image : string) => void
}

const UpAndLoadImage =  ({
    setImages, 
    images,
    open,
    setImageUpload,
    } : Props) => {
    const [loading, setLoading] = useState(false)
    
    const { updateMyFunction } = useMyContext();

    

//   useEffect(() => {
//     updateMyFunction(() => selectImage(true));
//   }, [updateMyFunction]);

    useEffect(() => {
        updateMyFunction(selectImage)
        loadImages()
    }, [])

    const loadImages = async () => {
		await ensureDirExists();
		const files = await FileSystem.readDirectoryAsync(imgDir);
		if (files.length > 0) {
			setImages([]);
		}
	};

    const selectImage = async (useLibrary : boolean) => {
        let result
        const options : ImagePicker.ImagePickerOptions = {
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing : true,
            aspect : [4,3],
            quality : 0.75,
        }
        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync(options);
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync(options);
        }

        if(!result.canceled) {
            try {
            const img = result.assets[0];
            // const base64 = await FileSystem.readAsStringAsync(img.url, {encoding:'base64'})
            const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
            const filePath = `${new Date().getTime()}.${img.type === 'image' ? "png" : 'mp4'}`
            const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
            const data = await client.storage.from('file').upload(filePath, decode(base64), {contentType})
            
            saveImage(result.assets[0].uri)
            setImageUpload(filePath)
            } catch (error) {
                console.error(error)
            }
            

        }
    } 
    const saveImage = async (uri: string) => {
        await ensureDirExists();
        const filename = new Date().getTime() + '.jpeg';
        const dest = imgDir + filename;
        await FileSystem.copyAsync({ from: uri, to: dest });
        setImages([ dest]);
    };

  return (
    <View className='ml-1.5'>
        <TouchableOpacity
            onPress={open}
            className='flex-row'
        >
            <View className='w-5 h-5 mr-2 flex items-end justify-center'>
                <Entypo name="camera" size={20} color="black" />
            </View>
            <View className='flex items-center justify-center'>
                <Text>{publicImageTitle.upload}</Text>
            </View>
        </TouchableOpacity>
    

        
        {/* loading animation  */}
        {loading && (
            <View className='flex justify-center items-center'>
                <ActivityIndicator color={"#fff"} animating size={"large"}/>
            </View>
        )}        
    </View>
  )
}

export default UpAndLoadImage



interface PropsOption {
    option : (use : boolean) => void ,
    bottomSheetRef : RefObject<BottomSheetMethods>, 
}

export const OptionUpLoad = ({option, bottomSheetRef} : PropsOption) => {
    return (
        <>
        <View className='w-full h-full flex-col'>
            <TouchableOpacity 
              className='flex-1 justify-center pl-2'
              onPress={() => option(true)}
            ><Text className='text-lg'>{publicImageTitle.library} </Text></TouchableOpacity>
            <TouchableOpacity
              className='flex-1 justify-center pl-2' 
              onPress={() => option(false)}
            ><Text className='text-lg'>{publicImageTitle.camera}</Text></TouchableOpacity>
            <TouchableOpacity
              className='flex-1 justify-center pl-2' 
              onPress={() => bottomSheetRef.current?.close()}
            ><Text className='text-lg'>{publicImageTitle.close}</Text></TouchableOpacity>
          </View>
        </>
    )
}