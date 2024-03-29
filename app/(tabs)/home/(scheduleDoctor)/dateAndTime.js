import React from "react";
import { Modal, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { withTheme } from "@rneui/themed";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import moment from "moment";
import { FontAwesome } from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BookClinic} from './bookClinic.js'

const Stack = createNativeStackNavigator();


const DoctorDetail = () => {
    return(
      <View>
        <View style={{ flex: 1, backgroundColor: '#f0f4f7', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width:400,margin: 5, backgroundColor: 'white', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, padding: 20 }}>

          <Image source={require('./doctor.jpg')} style={{ width: 64, height: 64, borderRadius: 32, alignSelf: 'center' }} />
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', marginTop: 10, color:'#33CC33' }}>GS. XuanBao01</Text>
          <Text style={{ textAlign: 'center', fontSize: 15, color: '#666', marginTop: 5 }}>Khoa thần kinh</Text>


        </View>
      </View>
      </View>

    )
}

const Services = ({propOfService}) => {
    const today = moment(); 
    const [modalVisible, setModalVisiable] = useState('false')
    const [selectedValue, setSelectedValue] = useState(today)


    const disable_bi = [1,0,1]
  
    let listOfDay = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ 5", "Thứ 6", "Thứ 7"]
    let listOfDayShow = []
    const today_day = new Date()
    
    let listOfDate = []
    for (let i = 0; i < 7; i++){
      let nextDay = today.clone().add(i,"days").format('DD-MM') // Sử dụng clone để tạo bản sao của đối tượng today
      listOfDate.push(nextDay)

      let tomorrowDay = new Date(today_day.getFullYear(), today_day.getMonth(), today_day.getDate() + i)
      const dayOfWeek = tomorrowDay.getDay()
      console.log(dayOfWeek)
      listOfDayShow.push(listOfDay[dayOfWeek])
    }

    return(
        <View style={{margin:10, backgroundColor:'f0f4f7', alignItems:'left', justifyContent:'center', }}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        backdropColor="#000000"
      >
        {/* <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
        /> */}

      <TouchableOpacity 
        onPress={() => setModalVisiable(!modalVisible)}
        style={{flex:1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }} />
      <View style={{flexDirection:'column', backgroundColor:"white"}}>
        <View style={{alignItems:'center', margin:10}}>
          <Text>Chọn thời gian khám</Text>
          <Text>----------------------------------------</Text>
        </View>
        
        {/* date button */}
        <ScrollView horizontal={true} style={{flexDirection:'row', margin:10}}>
          {listOfDate.map((value,index) => (
          <TouchableOpacity
            style={[{
              backgroundColor:'white',
              borderRadius:10,
              shadowColor:'#111',
              shadowOpacity:0.01,
              shadowRadius:5,
              shadowOffset:{width:1, height:2},
              // padding:5,
              margin:10,
              marginHorizontal:10,
              alignItems:'center'
            }, selectedValue === value && {backgroundColor:'#33CC33'}]}
            key={value}
            onPress={() => setSelectedValue(value)}>
            <View style={{
                alignItems:'center',
                justifyContent:'center',
                borderWidth:1, 
                borderColor:'black', 
                borderRadius: 10,
                width:80,
                height:40 }}>
              <Text style={{fontSize:14, fontWeight: 600}}>{listOfDayShow[index]}</Text>
              <Text style={{fontSize: 12}}>{value}</Text>
            </View>

          </TouchableOpacity>
        ))}
        </ScrollView>
          
        {/* Chon gio buoi sang/ buoi chieu */}
        <HourComponent disable_bi={disable_bi}></HourComponent>






      <Link href={`./confirm`} asChild>
        <TouchableOpacity 
          style={{
            marginVertical:20,
            alignItems:"center",
            backgroundColor:'#33CC33',
            height:40,
            justifyContent:'center',
          }}
          onPress={() => setModalVisiable(!modalVisible)}>
          <Text>Xác nhận</Text>
        </TouchableOpacity>
      </Link>


      </View>


      </Modal>
            <TouchableOpacity
                onPress={() => setModalVisiable(true)}
                style={{ 
                    width:390,
                    alignItems:'flex-start',
                    margin:0, 
                    backgroundColor:'white', 
                    borderRadius:10, shadowColor: '#111', 
                    shadowOffset:{width:3, height:10}, 
                    shadowOpacity:0.19, 
                    shadowRadius:10, 
                    elevation:5}}

            >  

                <View style={{flexDirection:'row'}}>
                    <MaterialIcons name="post-add" size={30} color="powderblue" style={{alignItems:'flex-start', margin:10, marginRight: 30,}} />

                    <View style={{flexDirection:'column', paddingVertical:20}}>
                    <Text style={{fontSize: 16, fontWeight:'600', color:'#111827'}}>{propOfService['l1']}</Text>
                    <Text style={{fontSize:15, marginTop:5}}>{propOfService['l2']}</Text>
                    <Text style={{fontSize:15, marginTop:5, fontWeight:'300'}}>{propOfService['l3']}</Text>
                        <View style={{flexDirection:'row', marginTop:20}}>
                            <MaterialIcons name="attach-money" size={15} color="black" />
                            <Text style={{ fontSize: 13, fontWeight:'800', color: '#6B7280' }}>{propOfService['l4']}</Text>
                        </View>
                    </View>

                    {/* <Entypo name="chevron-small-right" size={24} color="black" style={{marginTop:60, marginLeft:60}} /> */}
                </View>


            </TouchableOpacity>
        </View>
    )
}

const ListService = ({navigation}) => {
  propOfService = [
    {l1: "Khám nội [PK]", l2: "Khám nội thần kinh - 109B2", l3: "Nội thần kinh", l4: "200000"},
    {l1: "Tim mạch [PK]", l2: "Khám chấn thương chỉnh hình - 302E1", l3: "Nội thần kinh", l4: "250000"}

  ]

  var numService = propOfService.length
  var listOfService = []
  for (let i = 0; i < numService; i++){
    listOfService.push(
      <View key={i} style={{}}>
        <Services propOfService = {propOfService[i]}></Services>
      </View>
    )
  }
  return(
    <View style={{flexDirection:'column'}}>
      {/* <BookClinic></BookClinic> */}
      <Text style={{fontSize:20, fontWeight:500, margin:10, color:'#339966'}}>Dịch vụ khám</Text>
      {listOfService}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}>
          <Text>Click vo</Text>
        </TouchableOpacity> */}
    </View>
  )
}

const DateAndTime = () => {

    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <DoctorDetail></DoctorDetail>
            <ListService></ListService>

        {/* <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ListService} options={{title: 'Welcome'}}/>
        <Stack.Screen name="Profile" component={CustomerComponent} />
        {/* <Stack.Screen name="BookClinic" component={BookClinic} options={{title: 'Book Clinic'}}/> */}

      {/* </Stack.Navigator>
    </NavigationContainer> } */}
         </ScrollView>
    


      
    )
}

const HourComponent = ({disable_bi}) => {

    const [selectedValue, setSelectedValue] = useState('07:00')
    const disable = disable_bi.map(value => {
      return value == 1 
    })
    // const disable = [true, false, true]
    const handleOnPress = (value) => {
      console.log(value)
      setSelectedValue(value)
    }
    const amHour = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"]
    const pmHour = ["14:00", "14:30", "15:00", "15:30", "16:00","16:30", "17:00"]
    return(
      <ScrollView style={{flexDirection: 'column', height:300}}>
        <Text style ={{margin:10}}>Buổi sáng</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap', marginHorizontal:20}}>
        {amHour.map((value, index) => (
            <TouchableOpacity
            disabled={disable[index]}
            onPress={()=> handleOnPress(value)}
            style={[{
              borderWidth:1,
              backgroundColor:'white',
              borderRadius:10,
              shadowColor:'#111',
              shadowOpacity:0.01,
              shadowRadius:5,
              shadowOffset:{width:3, height:10},
              padding:5,
              margin:7,
              width:60,
              height:50,
              alignItems:'center',
              justifyContent:'center'
              
            }, selectedValue === value && {backgroundColor:'#33CC33'}]}
            
            key={value}
            
            >
            <Text>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style ={{margin:10}}>Buổi chiều</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap', marginHorizontal:20}}>
        {pmHour.map((value, index) => (
            <TouchableOpacity
            disabled={disable[index]}
            onPress={()=> handleOnPress(value)}
            style={[{
              borderWidth:1,
              backgroundColor:'white',
              borderRadius:10,
              shadowColor:'#111',
              shadowOpacity:0.01,
              shadowRadius:5,
              shadowOffset:{width:3, height:10},
              padding:5,
              margin:7,
              width:60,
              height:50,
              alignItems:'center',
              justifyContent:'center'
              
            }, selectedValue === value && {backgroundColor:'powderblue'}]}
            
            key={value}
            
            >
            <Text>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>

    )
  }


export default DateAndTime