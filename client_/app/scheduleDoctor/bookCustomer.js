import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import  react, { useEffect, useState } from 'react'
import { useLocalSearchParams, Link} from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { createClient } from '@supabase/supabase-js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack} from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';




const client = createClient(
    'https://snwjzonusggqqymhbluj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
  );  
const TruncatableText = ({ children, maxLength }) => {
    const trancated = children.length > maxLength
    ? children.substring(0, maxLength) + '...'
    : children
    return <Text>{trancated}</Text>
}
const BookCustomer = () => {
    user = useAuth()
    user_id = user.userId
    const params = useLocalSearchParams()   // customer_id
    const [customers, setCustomers] = react.useState([])
    const [customerSelected, setCustomerSelected] = react.useState(params.customer_id)
    const [isLoading, setIsLoading] = react.useState(true)
    // getCustomerByUserId
    const getCustomerByUserId = async () => {
        try {
            const {data, error} = await client.from("Customer").select("*").eq("userId", user_id)
            const customer_ = data
            setCustomers(customer_)
            setIsLoading(false)
        } catch (error) {
            console.log("cannot getCustomerByUserId", error)
        }
    }
    useEffect(() => {
        getCustomerByUserId()
    },[])

    if (isLoading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner
            visible={isLoading}
            textContent={'...'}
            textStyle={{ color: '#FFF', fontSize: 16, alignContent: 'center', alignItems: 'center'  }}
            size={20}
            animation='fade'
    
          />     
           </View>
        )
      }
    return (
        <>
        <Stack.Screen
                options={{
                    headerTitle: 'Chọn thành viên',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#FFFFFF',
                    },     
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: '100',
                        fontSize: 18,
                    },
                }}
            />
        <ScrollView>
            <Text style={styles.select}>Chọn thành viên</Text>
            <View style={styles.container}>
            {customers.map((customer, index) => (
                <View key={index} style={styles.customer}>
                    <Link
                        href={{
                            pathname: `./bookDoctor`,
                            params: { customer_id: customer['id'] },
                        }}
                        asChild
                    >
                        <TouchableOpacity onPress={() => setCustomerSelected(customer['id'])}>
                            <View style={styles.icon}>
                                {customer['id'] === customerSelected ? (
                                    
                                    <MaterialIcons name="radio-button-checked" size={24} color="#33CC33" />                                
                                ) : (
                                    <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="black" />
                                )}

                                <View style={styles.infor}>
                                    <View style={styles.name_phone}>
                                        <Text style={styles.name}>
                                            {customer['firstName']} {customer['lastName']}
                                        </Text>
                                        <Text style={styles.phone}>     | 0393486450 </Text>
                                    </View>
                                    <Text>Địa chỉ: </Text>
                                    <TruncatableText maxLength={50}>KTX Mỹ Đình - Đơn nguyên 1, Mỹ Đình, Nam Từ Liêm, Hà Nội </TruncatableText>
                                    {customer['id'] === customerSelected && (
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.text}>Mặc định</Text>
                                    </TouchableOpacity>
                            )}
                                </View>
                            </View>

                        </TouchableOpacity>
                    </Link>
                    {index < customers.length - 1 && (
                        <View style={styles.separator} />
                    )}
                </View>
            ))}
            <View style={styles.separator} />
            <Link href={{ pathname: './addCustomer' }} asChild>
                    <TouchableOpacity style={styles.add_member}>
                        <MaterialCommunityIcons style ={{marginHorizontal:10}} name="account-plus" size={20} color="#009966" />
                        <Text >Thêm thành viên</Text>
                    </TouchableOpacity>

            </Link>
            </View>

        </ScrollView>
        </>
    )
}

export default BookCustomer

const styles = StyleSheet.create({
    default: {
        backgroundColor: "skyblue"
    },
    customer: {
        backgroundColor: '#FFFFFF',
    },
    button: {
        borderColor: '#FF3333', // Màu viền
        borderWidth: 1, // Độ dày viền
        paddingVertical: 1, // Đệm nội dung
        paddingHorizontal:2,
        alignItems: 'center', // Canh giữa nội dung theo chiều ngang
        borderRadius: 0, // Độ bo góc viền (tùy chọn)
        justifyContent: 'center', // Canh giữa nội dung theo chiều dọc
        alignSelf:'start',
        width: 60,
        marginTop: 10
    },
    text: {
        color: '#000000', // Màu chữ (có thể điều chỉnh theo ý thích)
        fontSize: 12, // Cỡ chữ (có thể điều chỉnh theo ý thích)
    },
    container:{
        backgroundColor: "white",
        margin: 0,

    },
    select: {
        margin:10
    },
    name_phone: {
        flexDirection: "row",
        marginBottom: 5
    },
    icon :{
        flexDirection: "row",
        padding:10
    },
    infor :{
        marginLeft: 10
    },
    name :{
        fontSize: 16, 
        fontWeight: '600', 
        color: '#111827' 
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
    phone:{
        marginLeft:10
    },
    add_member: {
        paddingVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
    },
})