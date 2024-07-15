import { View,  ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Post from '@/components/share/Post'
import { MaterialTopTabs } from './_layout';
import { tabTitle } from '@/constant/screen/threads';
import instance from '@/utils/axios';
import { ConvertDataToThreadType, ThreadDataType,  } from '@/components/pageThread/ThreadDataType';

const advise = () => {
  const [listTheard, setListThreard] = useState<ThreadDataType[]>([])

  const getallThrealForUser = async () => {
    try {
        const data : any = await instance.get(`/threadAll`)
        const test : ThreadDataType[] = ConvertDataToThreadType(data)
        setListThreard(test)
        // console.log(data)
    }catch (e) {
        console.log(e)
    }
}

useEffect(() => {
  getallThrealForUser()
}, [])

  return (
    <>
    <MaterialTopTabs.Screen options={{
      title : tabTitle.communicate,
    }}/>
    <View className='h-full w-full bg-[#f8f9fa] pt-1'>
      <ScrollView className="w-full h-full">
        {listTheard.map((thread) => (
            <Post key={thread.id} thread={thread} isMyself={false}/>
          ))}
      </ScrollView>
    </View>
    </>
    
  )
}

export default advise