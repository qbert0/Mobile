import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CommentDoctor from '../card/CommentDoctor'
import Major from '../card/Major'
import {   ThreadDataType, convertCreateAt, convertName } from '../pageThread/ThreadDataType'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { convertComment } from '@/utils/page/comment'
import AvatarImage from '../pageThread/AvatarImage'


interface Props {
    thread : ThreadDataType,
    isMyself : boolean;
}

const Post = ({thread, isMyself} : Props) => {
    const router = useRouter()

    const OnThread = () => {
        const path = `${thread.id},${isMyself}`
        router.push(`/(adviceDoctor)/${path}/thread`)
    }

  return (
    <TouchableOpacity 
    onPress={OnThread}
    className=' px-2 py-1 bg-bg-post mx-2 my-1.5'
    style={{
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }}
    >
        {/* header */}
        <View className='flex-row mb-1 justify-center items-center pl-2 mt-1'>
            <View className="w-10 h-10 p-0.5 rounded-full mr-4 bg-white flex justify-center items-center">
                <AvatarImage  gender={thread.gender} age={thread.age}/>
            </View>
            
            <View className='flex-col flex-1'>
                <Text className='text-sm font-semibold'>{convertName(thread.gender, thread.age)}</Text>
                <Text className='text-sm font-light italic'>{convertCreateAt(thread.createAt)}</Text>
            </View>
        </View>

        {/* post */}
        <View className='text-black p-1 maxh16  pl-3 mb-1'>
            <Text>{convertComment(thread.content, 180)}</Text>
        </View>
        {/* comment */}
        <View className='pl-3 mb-2'>
            {
                thread.comment.length > 0 && 
                <CommentDoctor 
                comment={thread.comment[0]}
                gender={thread.gender}
            />
            }
        </View>

        {/* chuyen khoa */}
        <View className=' p-1.5 flex-row gap-2'>
            {
                thread.major.map((i) => (
                    <Major key={i} major={i} />
                ))
            }
        </View>

    </TouchableOpacity>
  )
}

export default Post