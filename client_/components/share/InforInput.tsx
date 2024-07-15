import React, {  useMemo, useRef, useState } from 'react'
import BottomSheet, { } from '@gorhom/bottom-sheet'
import GenderBox from '../pagePost/Gender'
import { Gender } from '@/constant/enum'
import SliderAge from '../pagePost/SliderAge'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import FieldInput from '../pagePost/FieldInput'
import BottomUnder from '../pagePost/BottomUnder'
import BottomSubmit from '../pagePost/BottomSubmit'
import PublicImage from '../pagePost/PublicImage'
import SelectMajor from '../pagePost/SelectMajor'
import { noteTitle } from '@/constant/screen/post'
import {  Alert, KeyboardAvoidingView, Text,  View } from 'react-native'
import { MyContext, MyFunctionType } from '../context/UpLoadContext'
import { OptionUpLoad } from '../forms/UpAndLoadImage'
import { MajorType } from '@/constant/type'
import instance from '@/utils/axios'
import { faL } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@clerk/clerk-expo'
import { router } from 'expo-router'

const InforInput = () => {

    const [gender, setGender] = useState<Gender>(Gender.man)
    const [age, setAge] = useState(20)
    const [images, setImages] = useState<string[]>([])
    const [major, setMajor] = useState<MajorType[]>([])
    const [title, setTitle] = useState<string>('')
    const [puImage, setPuImage] = useState(true)
    const {userId} = useAuth()
    const [imageUp, setImageUp] = useState('')

    const snapPoint2 = useMemo(() => [  '25%' ], ['0%'])
    const bottomSheetRef2 = useRef<BottomSheet>(null)
    const handleOpenPress2 = () => bottomSheetRef2.current?.expand()

    const [myFunction, setMyFunction] = useState<MyFunctionType>(() => () => {});

    const updateMyFunction = (newFunction: MyFunctionType) => {
      setMyFunction(() => newFunction);
    };

    const checkAlert = () => {
      if (major.length == 0 ) {
          failCreate("chọn khoa")
          return false
      } else if (title.length == 0 || !title) {
          failCreate("điền câu hỏi")
          return false
      } else {
        return true
      }
    }

    const onSubmit = async () => {
      if(!checkAlert()) {
        return
      }
      console.log(gender, age, puImage, images[0], imageUp, major, title )
      await instance.post(`/createNewThread`, {
        userId : userId,
        gender : gender,
        age : age.toString(), 
        puImage :puImage, 
        image : imageUp,
        major : major,
        title : title,
      })
      done()

      // console.log(res);
    }
    
  return (
    <>
    <MyContext.Provider value={{ myFunction, updateMyFunction }}>
      <GestureHandlerRootView className='w-full bg-bg-post h-full flex-col'>
      <KeyboardAvoidingView 
        className='grow'
        keyboardVerticalOffset={50}
      >
        <ScrollView className='flex flex-1'>
        {/* note title */}
        <View className='w-full flex-none bg-blue-100 justify-center mb-2 items-center px-4 py-3 '>
          <Text className='text-red-500 font-medium'>{noteTitle.title}</Text>
        </View>

        {/* sex */}
        <GenderBox genderDefault={gender} ChooseGander={setGender}/>

        {/* age  */}
        <SliderAge ageDefault={age} chooseAge={setAge}/>

        {/* major */}
        <SelectMajor major={major} setMajor={setMajor}/>
         {/* input */}
        <FieldInput title={title} setTitle={setTitle}/>

        {/* public image to doctor */}
        {images.length !== 0 && 
        <PublicImage 
          uri={images[0]} 
          setImages={setImages}
          puImage= {puImage}
          setPuImage={setPuImage}
         />}
        </ScrollView>
      </KeyboardAvoidingView>

        {/* buttonsubmit */}
        <BottomSubmit 
          onsubmit={onSubmit}
          open={handleOpenPress2}
          images={images} 
          setImages={setImages}
          setImageUpload={setImageUp}
        />

        
        {/* bottom under */}

        <BottomUnder 
          snapPoint={snapPoint2} 
          bottomSheetRef={bottomSheetRef2} 
          handleOpenPress={handleOpenPress2}
        >
          <OptionUpLoad 
            option={myFunction} 
            bottomSheetRef={bottomSheetRef2} 
          />
        </BottomUnder>

      </GestureHandlerRootView>
      </MyContext.Provider>
    </>
  )
}

export default InforInput


const failCreate = (messing : string ) => {
  Alert.alert(
    "Thông tin còn thiếu",
    "Vui lòng " + messing,
    [
      {
          text: "Thoát",
          onPress : () => {
              router.back()
          }
      },
      {
          text:"Tiếp tục",
          onPress : () => {
              
          },
          style: 'cancel'
      }
    ]
  )
}

const done = () => {
  Alert.alert(
    "Đăng bài thành công",
    "",
    [
            
      {
          text:"Tiếp tục thêm",
          onPress : () => {
              
          },
          style: 'cancel'
      },
      {
          text: "Thoát",
          onPress : () => {
              router.back()
          }
      }
  ]
  )
}