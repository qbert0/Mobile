import { Image, Text, TouchableOpacity, View } from "react-native"
import { Link, useRouter, } from "expo-router";
import { RecomentDoctor } from "../forms/type";
import useCustomers from "@/hooks/useCustomer";
const avatar = require("../../assets/favicon.png")

interface Props {
    doctor : RecomentDoctor
}

const InforDoctor = ({doctor} : Props) => {
    const { listOfCustomers, isLoading } = useCustomers();

    return (
        <View
        className="flex-row p-2 mb-3 rounded-xl bg-bg-post"
        style={{
            flexDirection: "row",
            // height: 16,
            // padding: 16,
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            shadowColor: "#000000",
            shadowOpacity: 0.1,
            shadowRadius: 2 ,
            elevation: 2,
            flex: 1,
            alignItems: "center",
        }}
        >
            <Link href={listOfCustomers.length!== 0 ? { pathname: `/scheduleDoctor/bookTime`, params: { doctor_id: doctor.doctorId, customer_id: listOfCustomers[0].id} } : { pathname:`/personal/addMember`}} asChild>
            <TouchableOpacity className="flex-row">
                <View className="w-16 h-16 rounded-xl mr-4 bg-avatar-1 flex items-center justify-center">
                    <Image source={avatar}  />
                </View>
                <View className="flex-col justify-center">
                    <View>
                        <Text className="text-base font-semibold">{doctor.name}</Text>
                    </View>
                    <View className="rounded-sm flex-row mt-1">
                        <Text className=" text-all bg-bgmajor py-0.5 px-1 rounded-md flex-none">{doctor.major}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </Link>
            
        </View>
        
    )
}


export default InforDoctor