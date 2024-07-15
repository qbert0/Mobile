import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Gender } from '@/constant/enum'
import { GenderTitle } from '@/constant/screen/post'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    genderDefault : Gender,
    ChooseGander: (gender : Gender) => void
}

const GenderBox = ({ChooseGander, genderDefault} : Props) => {
    const [gender, setGender] = useState<Gender>(genderDefault)

    const press = (gender : Gender) => {
        setGender(gender)
        ChooseGander(gender)
    }

  return (
    <>
    <View className='w-full flex-none flex-col px-2 mb-1'>
        <View className='mb-3'>
            <Text className='text-base font-normal'>{GenderTitle.gender}</Text>
        </View>
       <View className='w-full border-spacing-0.5 flex justify-center items-center '>
            <View className='w-1/2 flex-row items-center'>
            <TouchableOpacity 
                className= {`w-1/2 h-10 flex-row justify-center items-center rounded-l-full bg-slate-400 ${gender === Gender.man && "bg-blue-500"}`}
                onPress={() => press(Gender.man)}
            >
                <MaterialCommunityIcons name="gender-male" size={20} color={gender === Gender.man ? "white" : "black"} />
                <Text className={`${gender===Gender.man && "text-white"} ml-0.5 text-base font-normal`}>{GenderTitle.man}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                className= {`w-1/2 h-10 flex-row justify-center items-center rounded-r-full bg-slate-400 ${gender === Gender.woman && "bg-blue-500"}`}
                onPress={() => press(Gender.woman)}
            >
                <MaterialCommunityIcons name="gender-female" size={20} color={gender === Gender.woman ? "white" : "black"} />
                <Text className={`${gender===Gender.woman && "text-white"} ml-0.5 text-base font-normal`}>{GenderTitle.woman}</Text>
            </TouchableOpacity>
            </View>
            
        </View> 
    </View>

    
    </>
    
  )
}

export default GenderBox