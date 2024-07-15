import { View, Text, Image } from 'react-native'
import React from 'react'
import { Comment } from '../pageThread/ThreadDataType'
import { convertComment } from '@/utils/page/comment'
const avatar = require("@/assets/favicon.png")
import { Ionicons } from '@expo/vector-icons';
import AvatarImage from '../pageThread/AvatarImage'


interface Props {
    comment : Comment,
    gender : string
    // image : string,
}

const CommentDoctor = ({comment, gender} : Props ) => {
  return (
    <View className='flex-row items-center justify-between mb-1 py-1.5 bg-comment rounded-md'>
         <View className="w-10 h-10 p-0.5 rounded-full mr-2 ml-2 bg-white flex justify-center items-center">
            <AvatarImage gender={gender} age='12' />
         </View>
        
        <View className='text-sm flex-1   ml-0.5 p-0.5 '>
            <Text className='ml-0.5'>
              {convertComment(comment.content, 120) }
            </Text>
        </View>
    </View>
  )
}

export default CommentDoctor