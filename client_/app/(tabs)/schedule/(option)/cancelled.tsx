import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Image, Alert, ActivityIndicator } from 'react-native'
import { Link, Stack, router } from 'expo-router'
import  react, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js';
import { MaterialTopTabs } from './_layout';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';


// const customer_id = "8b57944c-1e70-4a2e-83ec-30532e698de3"
const client = createClient(
  'https://snwjzonusggqqymhbluj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
);
interface TruncatableTextProps {
  children: string;
  maxLength: number;
}

const TruncatableText: React.FC<TruncatableTextProps> = ({ children, maxLength }) => {
  const truncated = children.length > maxLength
    ? children.substring(0, maxLength) + '...'
    : children;
  
  return <Text>{truncated}</Text>;
}

const SchedulePage = () => {
  const user = useAuth()
  const userId = user.userId
  const [customers, setCustomers] = react.useState([])
  const [orders, setOrders] = react.useState([])
  const [clinics, setClinics] = react.useState([])
  const [customerId, setCustomerId] = react.useState("")
  const [specialty, setSpecialty] = react.useState([])

  const [customerSelected, setCustomerSelected] = react.useState("")
  const [modalVisible, setModalVisible] = react.useState(false)
  const [danger, setDanger] = react.useState(false)

  const [customer_fe, setCustomer_fe] = react.useState([])
  const [check, setCheck] = react.useState(false)

  const [isLoading, setIsLoading] = react.useState(true)
  // checkExpriedOrder (0)

  // getNewestCustomerIdByOrder (1)
  const getNewestCustomerIdByOrder = async () => {
    try {
      setIsLoading(true)
      const {data, error} = await client.from("Order").select("*, Clinic(*, Doctor(*), Specialty(*)), Customer (*)").eq("status", "Cancelled").order("id", {ascending: false})
      const customerId_ : any = data && data[0] ? data[0]['customer_id'] : null;
      const customer_ : any = data && data[0] ? data[0]['Customer'] : null;
      const clinics_ : any = data?.map(item => item.Clinic)
      const orders_ : any = data
      const customers_ : any = data?.map(item => item.Customer)
      const specialty_ : any = data?.map(item => item.Specialty)
      setSpecialty(specialty_)
      setClinics(clinics_)
      setOrders(orders_)
      setCustomers(customers_)
      setCustomerId(customerId_)
      setCustomerSelected(customerId_)
      setIsLoading(false)

      if (error) {
        console.log("Error creating order:", error);
      }
    } catch (err) {
      console.log("Something went wrong !", err);
    }
  }

  // deleteOrder (2)
  const deleteOrder = async (order_id: any) => {
    try {
      const {data, error} = await client.from("Order").delete().eq("id", order_id)
      if (error) {
        console.log("Error deleting order:", error);
      }
      setIsLoading(false)
      setDanger(false)

    } catch (err) {
      console.log("Something went wrong !", err);
    }
  }
  useEffect(() => { 

      getNewestCustomerIdByOrder()
    
  },[check])

  
  useEffect(() => {
    const channelA = client
    .channel('schema-db-changes')
    .on(
    'postgres_changes',
    {
        event: '*',
        schema: 'public',
        table: 'Order'
    },
    () => getNewestCustomerIdByOrder()
    )
    .subscribe()

    // Return a cleanup function to unsubscribe from the channel
    return () => {
        channelA.unsubscribe();
    }
});

  const [orderSelected, setOrderSelected] = react.useState("")
  const openDangerModal = (order_id: any) => {
    setDanger(true)
    setOrderSelected(order_id)
  }
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
    <MaterialTopTabs.Screen options={{
          title : "Hủy khám"
        }}/>
      <View style={{flexDirection: 'row',
                    margin: 10,
                    padding: 10,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 10,
                    alignItems: 'center',
                    }}>
      {customers && customers.length> 0 && <Text style={{fontSize: 14, color: '#333'}}>Lịch khám đã hủy/quá hạn      </Text>}

    </View>

    <Modal
      animationType="fade"
      transparent={true}
      visible={danger}
      onRequestClose={() => {
        setDanger(!danger);
      }}
    >
 <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <TouchableOpacity 
        style={{
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.2)', 
          justifyContent: 'flex-end'
        }} 
        activeOpacity={1} 
        onPress={() => setDanger(false)}
      >
        <View 
          style={{
            width: '100%',
            padding: 20,
            borderRadius: 10,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 3,
            marginBottom: 10,
          }}
        >
          <View 
            style={{
              alignItems: 'center',
              backgroundColor: '#FEF3C7', // bg-yellow-50
              borderRadius: 50,
              padding: 16,
              alignSelf: 'center',
            }}
          >
          </View>
          <Text 
            style={{
              marginTop: 8,
              fontSize: 16,
              fontWeight: '600',
              color: '#1F2937', // text-gray-800
              textAlign: 'center',
            }}
          >
            Xác nhận xóa lịch khám ?
          </Text>
          <Text 
            style={{
              marginTop: 8,
              fontSize: 14,
              color: '#4B5563', // text-gray-600
              textAlign: 'center',
              lineHeight: 20,
            }}
          >
            Lịch khám sẽ được xóa vĩnh viễn khỏi hệ thống. Bạn cần thực hiện tạo lịch khám mới nếu muốn.
          </Text>

          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <TouchableOpacity 
              style={{
                flex: 1,
                paddingVertical: 10,
                backgroundColor: '#F3F4F6', // bg-gray-100
                borderRadius: 5,
                alignItems: 'center',
                marginRight: 4,
              }} 
              onPress={() => setDanger(false)}
            >
              <Text 
                style={{
                  color: '#1F2937', // text-gray-800
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{
                flex: 1,
                paddingVertical: 10,
                backgroundColor: '#F59E0B', // bg-yellow-500
                borderRadius: 5,
                alignItems: 'center',
                marginLeft: 4,
              }} 
              onPress={() => deleteOrder(orderSelected)}
            >
              <Text 
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                Agree
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    </Modal>



  <ScrollView>
    {orders && orders.length > 0 && orders.map((order, index) => (
    clinics[index] ? (
      <View key={order['id']} style={styles.order_container}>
        <Link 
          key={order['id']}
          href={{  
            pathname: `/scheduleDoctor/bookConfirm`,
            params: {
              clinic_id: clinics[index]['id'],  // Use optional chaining to safely access id
              customer_id: customerSelected, 
              date: order['date'], 
              hour: order['hour'], 
              order_id: order['id'],
              status: "update",
              symptom: order['symptom'],
            }
          }} 
          asChild>
          <TouchableOpacity>
            <View>
              <View style={styles.date}>
                <Text style={{fontSize:14, fontWeight:"500", color:"#FF6666"}}>Quá hạn</Text>
                <Text style={{marginHorizontal:10}}>{order['date']}</Text>
                <Text>{order['hour']}</Text>
                <View style={styles.icon_}>
                  <FontAwesome style = {{marginHorizontal:10}} name="pencil-square-o" size={18} color="#339966" />
                  <TouchableOpacity onPress={() => openDangerModal(order['id'])}>
                    <FontAwesome5 name="trash-alt" size={18} color="#339966" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.doctor}>

                <View style={styles.image}>
                  <Image
                    style={{width: 50, height: 50}}
                    source={{ uri: 'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png' }}
                  />
                </View>
                <View style={styles.infor}>
                  <View style={{flexDirection: 'row'}}>
                  <Text>Bác sĩ:          </Text>
                  <Text style={{fontWeight:'600'}}>{clinics[index]['Doctor']['name']}</Text>
                  </View>
                  <Text style={{marginTop:10}}>{clinics[index]['Specialty']['name']}</Text>
                  <View style={styles.symptom}>
                    <Text>Triệu chứng: </Text>
                    <Text style={{color:'#FF6666'}}>{order['symptom']}</Text>
                  </View>
                  <View style={styles.separator} />
                  </View>
                
                </View>

                <View style={styles.price}>
                  <Text style={{ fontWeight:"500"}}>Thành tiền:    </Text>
                  <Text style={{color:"#FF0000", fontWeight:"500"}}>{clinics[index]['price']} VND</Text>
                </View>
            </View>

          </TouchableOpacity>
        </Link>
      </View>
    ):null
    ))}


   
    </ScrollView>
    </>
  )
  }

const styles = StyleSheet.create({
  customerSelected:{
    backgroundColor: 'powderblue'
  },
  customer: {
    backgroundColor: '#FFFFFF',
},
  danger_modal_: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 200,

},
  button: {
    borderColor: '#FF3333', // Màu viền
    borderWidth: 1, // Độ dày viền
    paddingVertical: 1, // Đệm nội dung
    paddingHorizontal:2,
    alignItems: 'center', // Canh giữa nội dung theo chiều ngang
    borderRadius: 0, // Độ bo góc viền (tùy chọn)
    justifyContent: 'center', // Canh giữa nội dung theo chiều dọc
    alignSelf:'auto',
    width: 60,
    marginTop: 10

},
text: {
  color: '#000000', // Màu chữ (có thể điều chỉnh theo ý thích)
  fontSize: 12, // Cỡ chữ (có thể điều chỉnh theo ý thích)
},
container_:{
  backgroundColor: "white",
  margin: 0,

},
  default: {
    backgroundColor: "skyblue"
},
container:{
    backgroundColor: "white",
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
    paddingHorizontal:150,
    paddingVertical: 50,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
},
order_container: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
date: {
    flexDirection: 'row',
    marginBottom: 10,
},
doctor: {
    flexDirection: 'row',
    marginBottom: 10,
},
image: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    marginRight: 10,
},
symptom:{
    flexDirection: 'row',
},
price:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
},
icon_ :{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft:120
},

danger_modal__: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
danger_modal_content: {
  width: '80%',
  padding: 0,
  backgroundColor: 'white',
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 20,
},
modal_text: {
  fontSize: 15,
  color: 'black',
},
danger_modal_button: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '80%',
},
button_: {
  flex: 1,
  marginHorizontal: 10,
  paddingVertical: 10,
  backgroundColor: '#007BFF',
  borderRadius: 5,
  alignItems: 'center',
},
button_text: {
  color: 'black',
  fontSize: 16,
}
})

export default SchedulePage