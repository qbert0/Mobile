import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, TextInput } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import instance from "../../utils/axios";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/clerk-expo';
import { Stack} from 'expo-router';


const client = createClient(
    'https://snwjzonusggqqymhbluj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
  );  

const BookConfirm = () => {
    const params = useLocalSearchParams()   // clinic_id, customer_id, date, hour, order_id, status, symptom
    const user = useAuth()
    const user_id = user.userId

    const [paramsUpdate, setParamsUpdate] = useState(params)
    const updateParams = (params) => {
        setParamsUpdate(params)
    }
    return(<>
      <Stack.Screen
                options={{
                    headerTitle: 'Chọn phòng khám',
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
            <ClinicComponent params={params}></ClinicComponent>
            <CustomerComponent params={params}></CustomerComponent>
            <DoctorComponent params={params}></DoctorComponent>
            <DateComponent params={params} updateParams={updateParams}></DateComponent>
            <DangerComponent params={params} updateParams={updateParams}></DangerComponent>
            <ConfirmButton params={paramsUpdate} user_id={user_id}></ConfirmButton>
      </ScrollView>
    
    </>
        
        
    )
}

// ClinicComponent

const ClinicComponent = ({ params }) => {
    const [clinic, setClinic] = useState([]);

    // getClinicByClinicId
    const getClinicByClinicId = async () => {
        try {
            const { data, error } = await client.from("Clinic").select("*, Specialty(*)").eq("id", params.clinic_id);
            const a = await client.storage.from("order").select
            if (error) {
                console.log("Error getting clinic by clinic_id:", error);
            } else {
                const clinic_ = data
                setClinic(clinic_);
                console.log("Clinic by clinic_id:", clinic);
            }
        } catch (error) {
            console.log("cannot getClinicByClinicId", error);
        }
    }

    useEffect(() => {
        getClinicByClinicId();
    }, []); // Added params.clinic_id to the dependency array

    return (
        <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
                onPress={() => handleOnPress()}
                style={{
                    alignItems: 'flex-start',
                    margin: 10,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    shadowColor: '#111',
                    shadowOffset: { width: 3, height: 10 },
                    shadowOpacity: 0.19,
                    shadowRadius: 10,
                    elevation: 5
                }}
            >
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <View style={{ flexDirection: "row", marginLeft: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', margin: 0, marginTop: 10, color: '#339966' }}>Nơi khám</Text>
                    </View>
                    <View style={{ flexDirection: 'column', paddingVertical: 10, marginLeft: 20 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>Bệnh viện Đại học Y Hà Nội</Text>
                        {clinic.length > 0 && (
                            <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827', marginTop: 3 }}> {clinic[0].Specialty.name}</Text>
                        )}
                        </View>
                        { clinic.length > 0 && (
                            <Text style={{ fontSize: 14, marginTop: 10 }}>Địa điểm: {clinic[0].major} - {clinic[0].name} - Số 1 Tôn Thất Tùng, Đống Đa, Hà Nội</Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
// CustomerComponent
const CustomerComponent = ({params}) => {
    const [customer, setCustomer] = useState([])
    // getCustomerByCustomerId
    const getCustomerByCustomerId = async () => {
      try {
          const {data, error} = await client.from("Customer").select("*").eq("id", params.customer_id)
          if (error) {
              console.log("Error getting customer by customer_id:", error);
          }
          const customer_ = data
          setCustomer(customer_)
          console.log("Customer by customer_id:", customer_)
      } catch (error) {
          console.log("cannot getCustomerByCustomerId", error)
      }
    }
    useEffect(() => {
      getCustomerByCustomerId()
    }, [])

    return(
      <View style={{flexDirection:"column"}}>
        
        <TouchableOpacity
              onPress={() => handleOnPress()}
              style={{ 
                  alignItems:'flex-start',
                  margin:10, 
                  backgroundColor:'white', 
                  borderRadius:10, shadowColor: '#111', 
                  shadowOffset:{width:3, height:10}, 
                  shadowOpacity:0.19, 
                  shadowRadius:10, 
                  elevation:5}}
  
          >  
              <View style={{flexDirection:'column', alignItems:'flex-start'}}>
                <View style={{flexDirection:"row", marginLeft:20}}>
                  <Text style={{fontSize:16, fontWeight:500, margin:0, marginTop:10, color:'#339966'}}>Thông tin bệnh nhân</Text>
                  <FontAwesome name="pencil-square-o" size={24} color="powderblue" style={{margin:10, marginRight:10}}/>
  
                </View>
                  <View style={{flexDirection:'column', paddingVertical:10, marginLeft:20}}>
  
                    <View style={{flexDirection:'row'}}>
                    {customer.length > 0 && (
                        <Text style={{ fontSize: 16, fontWeight:'600', color:'#111827'}}>{customer[0]['firstName']} {customer[0]['lastName']}</Text>
                    )}
                    </View>
  
                  <Text style={{fontSize:15, marginTop:5}}>0393 486 ***</Text>
  
                  </View>
  
              </View>
  
  
              </TouchableOpacity>
  
      </View>
    )
  }
// DoctorComponent
const DoctorComponent = ({params}) => {
    const [doctor, setDoctor] = useState([])
    // getDoctorByDoctorId
    const getDoctorById = async () => {
      try {
          const {data, error} = await client.from("Clinic").select("*, Doctor(*)").eq("id", params.clinic_id)
          if (error) {
              console.log("Error getting doctor by doctor_id:", error);
          }
          const doctor_ = data.map(item => item.Doctor)
          setDoctor(doctor_)
          console.log("Doctor by doctor_id:", doctor_)
      } catch (error) {
          console.log("cannot getDoctorByDoctorId", error)
      }
    }
    useEffect(() => {
        getDoctorById()
    }, [])
    return(
        <View style={{flexDirection:"column"}}>
          
          <TouchableOpacity
                onPress={() => handleOnPress()}
                style={{ 
                    alignItems:'flex-start',
                    // width:380,
                    margin:10, 
                    backgroundColor:'white', 
                    borderRadius:10, shadowColor: '#111', 
                    shadowOffset:{width:3, height:10}, 
                    shadowOpacity:0.19, 
                    shadowRadius:10, 
                    elevation:5}}
    
            >  
                <View style={{flexDirection:'column', alignItems:'flex-start'}}>
                  <View style={{flexDirection:"row", marginLeft:20}}>
                    <Text style={{fontSize:16, fontWeight:500, margin:0, marginTop:10, color:'#339966'}}>Thông tin bác sĩ</Text>
    
                  </View>
                    <View style={{flexDirection:'column', paddingVertical:10, marginLeft:20}}>
    
                      <View style={{flexDirection:'row'}}>
                        {doctor.length > 0 && (
                        <Text style={{ fontSize: 16, fontWeight:'600', color:'#111827'}}>{doctor[0]['name']}</Text>

                        )
                        }
                      </View>
    
                    <Text style={{fontSize:13, marginTop:5, color:"powderblue", fontWeight:900}}>400000đ</Text>
    
                    </View>
    
                    {/* <Entypo name="chevron-small-right" size={24} color="black" style={{marginTop:60, marginLeft:60}} /> */}
                </View>
    
    
                </TouchableOpacity>
    
        </View>
      )
}
// DateComponent
const DateComponent = ({params, updateParams}) => {
    const [hour, setHour] = useState(params.hour)
    const [date, setDate] = useState(params.date)
    const [modalVisible, setModalVisible] = useState(false);
    const [date_, setDate_] = useState(params.date)
    const getDatafromChildren = (date, hour, modalVisible) => {
        setDate(date)
        setHour(hour)
        setModalVisible(modalVisible)
    }
    const updateTime = () => {
        setModalVisible(!modalVisible)
    }
    function convertToDateString(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
    }
    useEffect(() => {
      setDate_(convertToDateString(date))
    },[date])
    return(
        
        <View style={{flexDirection:"column"}}>
          
          <TouchableOpacity
                onPress={() => updateTime()}
                style={{ 
                    alignItems:'flex-start',
                    // width:380,
                    margin:10, 
                    backgroundColor:'white', 
                    borderRadius:10, shadowColor: '#111', 
                    shadowOffset:{width:3, height:10}, 
                    shadowOpacity:0.19, 
                    shadowRadius:10, 
                    elevation:5}}
    
            >  
                <View style={{flexDirection:'column', alignItems:'flex-start'}}>
                  <View style={{flexDirection:"row", marginLeft:20}}>
                    <Text style={{fontSize:16, fontWeight:500, margin:0, marginTop:10, color:'#339966'}}>Giờ hẹn</Text>
                    <FontAwesome name="pencil-square-o" size={24} color="powderblue" style={{margin:10, marginRight:10}}/>
                    <TouchableOpacity style={{
                        backgroundColor:'powderblue', 
                        alignItems:'center', 
                        justifyContent:'center',
                        height:30,
                        marginTop:5,
                        marginLeft:10,
                        padding:4,
                        borderRadius:10}}>
                            <View style={{flexDirection:'row'}}>
                            <MaterialIcons name="access-time" size={15} color="black" style={{marginTop:2, marginHorizontal:3}} />
                        <Text>{hour}</Text>
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        backgroundColor:'powderblue', 
                        alignItems:'center', 
                        justifyContent:'center',
                        height:30,
                        marginTop:5,
                        marginLeft:10,
                        padding:4,
                        borderRadius:10}}>
                            <View style={{flexDirection:'row'}}>
                            <Fontisto name="date" size={15} color="black" style={{marginHorizontal:5}} />        
                            <Text>{date_}</Text>
                            </View>

                    </TouchableOpacity>
    
                  </View>

                  <Modal visible={modalVisible} animationType="slide" transparent={true}>
                    <View style={{ flex: 1, justifyContent:'flex-end' }}>
                    <TouchableOpacity 
                      style={{
                        flex: 1, 
                        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                        justifyContent: 'flex-end'
                      }} 
                      activeOpacity={1} 
                      onPress={() => setModalVisible(false)}
                    ></TouchableOpacity>
                        <Booking clinic_id={params.clinic_id} customer_id={params.customer_id} 
                                updateParams={updateParams} getDatafromChildren={getDatafromChildren}
                                date_={params.date} hour_={params.hour} params={params} /> 
                    </View>
                </Modal>
    
                </View>
    
    
                </TouchableOpacity>
    
        </View>
      )
}
const Booking = ({clinic_id, customer_id, updateParams, getDatafromChildren, date_, hour_, params}) => {

    const [date, setDate] = useState(date_)
    const [hour, setHour] = useState(hour_)
    const today = new Date();
    const listOfDate = [];
    const listOfDate_new = []
  
    // Điều chỉnh lại mảng ngày trong tuần để phù hợp với giá trị trả về của getDay()
    const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const listOfDay = []
  
    function convertToDateString(dateString) {
      const [month, day, year] = dateString.split("/");
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
  
    function dateToString(dateString) {
      const [month, day, year] = dateString.split("/");
      return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}`;
    }
  
    function getDayName(index) {
      return days[index];
    }
  
    for (let i = 1; i < 8; i++) {
      let date_loop = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const dayIndex = date_loop.getDay();
      const dayName = getDayName(dayIndex);
  
      const date_string = date_loop.toLocaleDateString();
      const y_date = convertToDateString(date_string);
      const d_date = dateToString(date_string);
  
      listOfDate.push(y_date);
      listOfDate_new.push(d_date);
      listOfDay.push(dayName);
  
    }
  
    // 
    const morning = ["07: 00", "08:00", "09:00", "10:00", "11:00"]
    const afternoon = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
  
  
    const [date_be, setDate_be] = useState([])
    const [hour_be, setHour_be] = useState([])
  
    // getDateAndTimeByClinicId
    const getDateAndTimeByClinicIdAndDate = async (clinic_id, date) => {
      try {
        const { data, error } = await client.from("Order").select("*").eq("clinic_id", clinic_id).eq("date", date)
        setDate_be(data.map(item => item.date))
        setHour_be(data.map(item => item.hour))
      } catch (error) {
        console.log("cannot getDateAndTimeByClinicId", error)
      }
    }
    useEffect(() => {
      getDateAndTimeByClinicIdAndDate(clinic_id, date)
    },[date])
    // create order
    const handleOnPress = () => {
      updateParams({clinic_id: params.clinic_id, customer_id: params.customer_id, 
        date: date, hour: hour, 
        order_id: params.order_id, status: params.status, symptom:params.symptom})
                getDatafromChildren(date, hour, false)
        }
    return(

        <ScrollView style={{
          width: '100%',
          height:"10%",
          padding: 0,
          borderRadius: 10,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 3,
          marginBottom: 1}}>

          <ScrollView horizontal={true} style={{flexDirection: 'row', padding: 10}}>
          {listOfDate && listOfDate.map((date_i, index) => (
            <TouchableOpacity 
              
              key={date_i} 
              onPress={() => setDate(date_i)}
              style = {[ {backgroundColor:'white',
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
                borderRadius: 10,  
                padding:7,
                margin:5,
                flexBasis: 70,
                borderColor: "black",
                color: "black",
                borderWidth: 1,

              }, date === date_i && styles.selected]}
            >
              {listOfDay[index] !== 'Chủ nhật' ? (
                <View>
                  <Text style={{ fontWeight: '500' }}>{listOfDay[index]}</Text>
                  <Text>{listOfDate_new[index]}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ))}

            </ScrollView>
            <View>
            <Text style={{fontSize:15, fontWeight:'500'}}>    Buổi sáng</Text>
              <View horizontal={true} style={{flexDirection: 'row', padding: 10, flexWrap:'wrap'}}>
              {morning && morning.map((hour_, index) => (
              hour_be && hour_be.includes(hour_) ? (
                <TouchableOpacity style={styles.disable} key={index} disabled={true}>
                  <Text>{hour_}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity key={hour_} 
                onPress={() => setHour(hour_)}
                style = {[ {backgroundColor:'white',
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,  
                  padding:7,
                  margin:5,
                  flexBasis: 70,
                  borderColor: "black",
                  color: "black",
                  borderWidth: 1,
  
                }, hour === hour_ && styles.selected]}> 
                <Text>{hour_}</Text>
                  </TouchableOpacity>
                 
              )
            ))}
            </View>
            </View>
            <View>
            <Text style={{fontSize:15, fontWeight:'500'}}>    Buổi chiều</Text>
              <View style={{flexDirection: 'row', padding: 10, flexWrap:'wrap'}}>
              {afternoon && afternoon.map((hour_, index) => (
              hour_be && hour_be.includes(hour_) ? (
                <TouchableOpacity style={styles.disable} key={index} disabled={true}>
                  <Text>{hour_}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity key={hour_} 
                onPress={() => setHour(hour_)}
                style = {[ {backgroundColor:'white',
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,  
                  padding:7,
                  margin:5,
                  flexBasis: 70,
                  borderColor: "black",
                  color: "black",
                  borderWidth: 1,
  
                }, hour === hour_ && styles.selected]}> 
                <Text>{hour_}</Text>
                  </TouchableOpacity>
                 
              )
              
            ))}
            </View>
            </View>
  
              <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => handleOnPress()} >
                <Text style={styles.buttonText}>Xac Nhan</Text>
              </TouchableOpacity>
              </View>
              
  
        </ScrollView>
    );
  };
// DangerComponent
const DangerComponent = ({params, updateParams}) => {
    const [symptom, setSymptom] = useState(params.symptom)
    const [modalVisible, setModalVisible] = useState(false);
    // getSymptomByOrderId
    const getSymptomByOrderId = async () => {
      try {
          const {data, error} = await client.from("Order").select("*").eq("id", params.order_id)
          if (error) {
              console.log("Error getting symptom by order_id:", error);
          }
          const symptom_ = data
          setSymptomPending(symptom_)
          console.log("Symptom by order_id:", symptom_)
      } catch (error) {
          console.log("cannot getSymptomByOrderId", error)
      }
    }
    // useEffect(() => {
    //     getSymptomByOrderId()
    // }, [])
    const handleSend = async () => {
      setModalVisible(false);
      updateParams({clinic_id: params.clinic_id, customer_id: params.customer_id, 
                    date: params.date, hour: params.hour, 
                    order_id: params.order_id, status: params.status, symptom:symptom})
    };
      return (
        <View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ 
              alignItems: 'flex-start',
              margin: 10, 
              backgroundColor: 'white', 
              borderRadius: 10,
              shadowColor: '#111', 
              shadowOffset: { width: 3, height: 10 }, 
              shadowOpacity: 0.19, 
              shadowRadius: 10, 
              elevation: 5
            }}
          >  
            <View>
              <Text style={{ fontSize: 15, marginTop: 5, color: 'red', margin: 10 }}>
                Ghi chú (triệu chứng, dị ứng thuốc) *: ....
              </Text>
              <Text style={{marginLeft:10, marginBottom:10}}>{symptom}</Text>
            </View>
          </TouchableOpacity>
    
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <TouchableOpacity 
                style={{
                  flex: 1, 
                  backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                  justifyContent: 'flex-end'
                }} 
                activeOpacity={1} 
                onPress={() => setModalVisible(false)}
              ></TouchableOpacity>
    
              <View style={{
                width: '100%',
                padding: 0,
                borderRadius: 0,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 8,
                elevation: 3,
                marginBottom: 0
              }}>
                <View style={{ padding: 10 }}>
                  <View style={{ position: 'relative' }}>
                    <TextInput
                      placeholder="Nhập triệu chứng..."
                      clearButtonMode="always"
                      value={symptom}
                      autoCapitalize="none"
                      onChangeText={(text) => setSymptom(text)}
                      style={{
                        height: 100, // Tăng chiều cao để cho phép nhiều dòng
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 10,
                        paddingTop: 10, // Thêm khoảng cách phía trên để căn chỉnh văn bản
                        textAlignVertical: 'top', // Căn văn bản phía trên
                        paddingRight: 40, // Thêm khoảng cách để tránh biểu tượng
                      }}
                      multiline={true} // Cho phép nhiều dòng
                    />
                    <TouchableOpacity
                      onPress={handleSend}
                      style={{
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                        backgroundColor: 'blue', // Màu nền của nút
                        borderRadius: 20,
                        padding: 10,
                      }}
                    >
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
}
// ConfirmComponent
const ConfirmButton = ({params, user_id})  => {
  console.log("params.status", params)
    const createOrder = async () => {
        try {
            const { data, error } = await client.from("Order").insert({
                clinic_id: params.clinic_id,
                customer_id: params.customer_id,
                date: params.date,
                hour: params.hour,
                user_id: user_id,
                symptom: params.symptom,
            });
    
            if (error) {
                console.log("Error creating order:", error);
            } else {
                console.log("Order created successfully:", data);
            }
        } catch (error) {
            console.log("Cannot create order:", error);
        }
    };

    // updateOrder
    const updateOrder = async (order_id) => {
        try {
            const { data, error } = await client.from("Order").update({
              clinic_id: params.clinic_id,
              customer_id: params.customer_id,
              date: params.date,
              hour: params.hour,
              symptom: params.symptom,
              status: "Pending"
                
            }).eq("id", order_id);
            if (error) {
                console.log("Error updating order:", error);
            } else {
                console.log("Order updated successfully:", data);
            }
        } catch (error) {
            console.log("Cannot update order:", error);
        }
    }
      return (
        <View>
        <Link href="../schedule/pending" asChild>
        {params.status === "update" ? (
          <TouchableOpacity
          style={{
            alignItems: 'center',
            marginTop: 50,
            backgroundColor: '#33CC99',
            margin: 40,
            height: 50,
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => updateOrder(params.order_id)}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Cập nhật</Text>
          </TouchableOpacity>
          ) : (
            <TouchableOpacity
            style={{
              alignItems: 'center',
              marginTop: 100,
              backgroundColor: '#33CC99',
              margin: 40,
              height: 50,
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => createOrder(params.order_id)}>
               <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Đặt lịch</Text>
            </TouchableOpacity>
          )}
          
        </Link>
        </View>
      );
  }

const styles = StyleSheet.create({
  disable: {
    backgroundColor: "#DDDDDD",
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    borderRadius: 10,  
    padding:7,
    margin:5,
    flexBasis: 70,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  pending: {
    backgroundColor: "#white",
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    borderRadius: 10,  
    padding:7,
    margin:5,
    flexBasis: 70,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: "#66FF33",
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    borderRadius: 10,  
    padding:7,
    margin:5,
    flexBasis: 70,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00FF33',
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  });
export default BookConfirm