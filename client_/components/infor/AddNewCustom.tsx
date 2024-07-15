import { useAuth, useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Text, View } from "react-native"
import { Entypo } from "@expo/vector-icons";
import AddAvatar from "./addcus/AddAvatar";
import InputSection from "./addcus/InputSection";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import CustomButton from "../customButton";
import DateAndGender from "./addcus/DateAndGender";
import instance from "@/utils/axios";
import { router } from "expo-router";



interface Props {
    firstName : string,
    ten : string,
    tuoi : string,
    gender: string,
}

const AddNewCustom = () => {
    const [selectedImage, setSelectedImage] = useState(
        require("../../assets/avatar.png")
    );
    const { userId } = useAuth();

    const [firstName, setFirstName] = useState<string>()
    const [lastName, setLastName] = useState<string>()
    const [gender, setGender] = useState<string>()
    const [date, setDate] = useState<Date>()
    const [phone, setPhone] = useState<string>()
    const [numberCMND, setNumberCMND] = useState<string>()
    const [address, setAddress] = useState<string>()

    const checkAlert = () => {
        if(!firstName || firstName.length == 0) {
            alertMessing("Họ")
        } else if (!lastName || lastName.length == 0) {
            alertMessing("Tên")
        } else if (!date ) {
            alertMessing("Ngày sinh")
        }else if (!gender || gender.length == 0) {
            alertMessing("Giới tính")
        }else if (!address || address.length == 0) {
            alertMessing("Địa chỉ")
        } 
    }

    const createCustomer = async () => {
        console.log(userId + " " + firstName + " " + lastName + " " + gender + " " + date + " " + address);
        if (!firstName || !lastName || !date || !gender || !address) {
            checkAlert()
            return
        }
        const customr = await instance.post("/createCustomer", {
          userId: userId,
          firstName,
          lastName,
          gender,
          date,
          address
        });
        console.log(customr)
        if(!customr) {
            Alert.alert(
                'Nhập chưa '
            )
        } else {
            accesAdd()
        }
    };
        
    
    return (
        <>
        <GestureHandlerRootView className="h-full w-full">
        <View className="flex-col justify-between p-2 w-full h-full bg-background">
            
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 50}
            >
            <ScrollView className="flex-col w-full mt-1">
                <AddAvatar />
                {/* <View className="my-2"> </View> */}
                <InputSection 
                    placeholder="Họ"
                    value={firstName}
                    setValue={setFirstName}
                />
                <InputSection 
                    placeholder="Tên"
                    value={lastName}
                    setValue={setLastName}
                />

                <DateAndGender 
                    date={date} setDate={setDate}
                    gender={gender}
                    setGender={setGender}
                />

                <InputSection 
                    placeholder="Số Căn cước/ CMTND"
                    value={numberCMND}
                    setValue={setNumberCMND}
                />
                <InputSection 
                    placeholder="Địa chỉ"
                    value={address}
                    setValue={setAddress}
                />

                         

            </ScrollView>
            </KeyboardAvoidingView>
            <View className="">
            <CustomButton title="Thêm thành viên" onPress={createCustomer} />
            </View>
        </View>
        </GestureHandlerRootView>
        </>
    )
}

export default AddNewCustom

const alertMessing = (messing : string) => {
    Alert.alert(
        "Thông tin " + messing + " còn thiếu",
        // body
        "Hoàn thiện nốt",
        [
            {
                text: "Thoát",
                onPress : () => {
                    if (router.canGoBack()) {
                        router.back()
                      } else {
                        router.push('/(tabs)/home')
                    }
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

const accesAdd = () => {
    Alert.alert(
        "Thành công",
        "Đã thêm một thành viên",
        [
            {
                text: "Thoát",
                onPress : () => {
                    if (router.canGoBack()) {
                        router.back()
                      } else {
                        router.push('/(tabs)/home')
                    }
                }
            }
        ]
    )
}