import { ScrollView, Text, View, TouchableOpacity } from "react-native"
import InforDoctor from "../card/InforDoctor"
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import instance from "@/utils/axios";
import { useEffect, useState } from "react";
import { RecomentDoctor, convertDataToRecommentDoctor } from "./type";

const ReviewDoctor = () => {

    const [listDoctor, setListDoctor] = useState<RecomentDoctor[]>([])

    const getListDoctor = async () => {
        try {
            const data : any = await instance.get(`/getRecommentDoctor`)
            const test : RecomentDoctor[] = convertDataToRecommentDoctor(data)
            console.log(test)
            setListDoctor(test)
             
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getListDoctor()
    }, [])

    return (
        <View className='bg-background flex-col px-2 pt-1'>
            <View className="flex-row justify-between p-2">
                <View>
                    <Text className="text-base font-semibold">
                        Bác sĩ có lịch khám
                    </Text>
                </View>
                <Link href={'/scheduleDoctor/bookDoctor'}
                    className="pr-2 ">
                    <Text className='mr-2 text-all text-base'>
                        Tất cả
                    </Text>
                </Link>
            </View>
            <View className="flex-col  ">

                {
                    listDoctor.map((doc : RecomentDoctor, index ) => (
                        <InforDoctor key={index} doctor={doc}/>
                    ))
                }

            </View>

            {/* header */}
            {/* <ChatCustomer></ChatCustomer>
            <View className="mb-4">
                <Text className="text-xl font-bold mb-2">
                    Bac si nhan duoc danh gia cao
                </Text>

                <View className="border-t-2 border-black"/>
            </View>
            {/* scroll view  */}
            {/* <ScrollView 
            className="flex  mb-2"
            contentContainerStyle={{
                padding : 16
            }}
            showsVerticalScrollIndicator={true}
            >
                <View className="flex-col space-y-3">
                    <InforDoctor />
                    <InforDoctor />
                    <InforDoctor />
                    <InforDoctor />
                </View>
                
            </ScrollView> */} 

            {/* view all */}
            {/* <Link 
                href={"/(tabs)/medical/"}
                className="flex-row justify-center items-center p-1 rounded-xl bg-blue-2 w-20">
                <View className="h-6 w-6 mr-3">
                    <Ionicons name="file-tray-full" size={24} color="black" />
                </View>
                <View>
                   <Text>Tất cả</Text> 
                </View>
                

            </Link> */}
            
        </View>
    )
}



const ChatCustomer = () =>{
    return(
        <View>
            <Link href={`../chat/chatForNurse`} asChild>
                <TouchableOpacity>
                    <Text>Bat dau</Text>
                </TouchableOpacity>
            </Link>
            {/* <Link href={`../chat/chat_for_customer`} asChild>
            <TouchableOpacity>
                <Text>CHAT FOR CUSTOMER</Text>
            </TouchableOpacity>
        </Link> */}
    </View>
    )

}

export default ReviewDoctor