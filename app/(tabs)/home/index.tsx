import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, Stack, } from 'expo-router'
import RecommentDoctor from '../../../components/card/RecommentDoctor'
import ButtonDesign from '../../../components/card/ButtonDesign'

const HomePage = () => {
  return (
    <>
    <View className="flex-1 items-center justify-center  bg-white">

      <View className='flex-row justify-around  w-full max-h-40 p-10 bg-slate-500'>
        <View className='w-1/2'>
          <ButtonDesign path='/home/advise' name={"advise"} />
        </View>
        <View className='w-1/2'>
          <ButtonDesign path='home/order' name={"push order"} />
        </View>
        
      </View>
      
      <Link href={`../scheduleDoctor/bookClinic`} asChild>
        <TouchableOpacity>
          <Text>Bat dau</Text>
        </TouchableOpacity>
      </Link>
      <RecommentDoctor />
    </View>
    </>
  )
}

export default HomePage