import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialTopTabs } from './_layout'
import Post from '@/components/share/Post'
import { tabTitle } from '@/constant/screen/threads'
import instance from '@/utils/axios'
import { ConvertDataToThreadType, ThreadDataType } from '@/components/pageThread/ThreadDataType'
import { useAuth } from '@clerk/clerk-expo'

const Myself = () => {
  const [listTheard, setListThreard] = useState<ThreadDataType[]>([])
  const [comment, setComment] = useState<string>("")
  const {userId} = useAuth()
 
  const getAllThreadForSelf = async () => {
    try {
      console.log(123)
      const response : any  = await instance.get(`/threadAllForSelf?userId=${userId}`);
      const test : ThreadDataType[] = ConvertDataToThreadType(response.listThread)
      setListThreard(test)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }



  useEffect(() => {
    getAllThreadForSelf()
  }, [])


  return (
    <>
    <MaterialTopTabs.Screen 
        options={{
            title : tabTitle.myself
        }}
    />
    <View className='h-full pt-1 w-full bg-background '>
      <ScrollView className="w-full h-full">
        {listTheard.map((thread) => (
            <Post key={thread.id} thread={thread} isMyself={true}/>
          ))}
      </ScrollView>
    </View>
    </>
    
  )
}

export default Myself