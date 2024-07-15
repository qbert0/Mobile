import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, SafeAreaView, 
        TextInput, ActivityIndicator, FlatList,  
        ScrollView} from "react-native"
import { Link, useLocalSearchParams} from 'expo-router';
import  react, { useEffect, useState } from 'react'

import { createClient } from '@supabase/supabase-js';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Stack} from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';


import filter from 'lodash.filter'
const client = createClient(
  'https://snwjzonusggqqymhbluj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
);
const BoxDoctor = () => {
  const url = "http://192.168.1.5:8000"
  const params = useLocalSearchParams() // customer_id
  const [specialty, setSpecialty] = useState([]) // 
  const [selectedSpecialty, setSelectedSpecialty] = useState(1) 
  const [doctors, setDoctors] = useState([]) // [ {id, name, specialty_id, userId, ...}
  const [modalVisible, setModalVisible] = useState({});

  const [searchQuery, setSearchQuery] = useState(''); 
  const [clinics, setClinics] = useState([]) // [ {id, name, specialty_id, userId, ...}

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [fullData, setFullData] = useState([])
  const [querySymptom, setQuerySymptom] = useState('')
  const [specialtyName, setSpecialtyName] = useState('')

  useEffect(() => {
    setIsLoading(true)
    getAllSpecialtyName()
    getDoctorBySpecialty(1)
  }, [])
  // getAllSpecialtyName   (1)
  const getAllSpecialtyName = async () => {
    try {
      const { data, error } = await client.from("Specialty").select("*")
      const data_ = data
      setData(data_)

      setFullData(data_)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      console.log("cannot getAllSpecialtyName", error)
      setIsLoading(false)
    }
  }
  if (isLoading) {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if(error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    )
  }
    
  //getDoctorBySpecialty   (2)
  const getDoctorBySpecialty = async (specialty_id) => {
    try {
      const { data, error } = await client.from("Clinic").select("*, Doctor(*), Specialty(*)").eq("specialty_id", specialty_id)
      const doctor_ = data.map((clinic) => clinic.Doctor)
      const specialty_ = data.map((clinic) => clinic.Specialty)
      const clinic_ = data
      setClinics(clinic_)
      setSpecialty(specialty_)
      setDoctors(doctor_)
      console.log("getDoctorBySpecialty", doctor_)
    } catch (error) {
      console.log("cannot getDoctorBySpecialty", error)
    }
  }


  const handlePress = (specialty_id) => {
    setSelectedSpecialty(specialty_id)
    getDoctorBySpecialty(specialty_id)
    setModalVisible(false)
    setSearchQuery("")
  }

  //getSpecialtyBySpecialtyId
  const handleSearch = async (query) => {
    setSearchQuery(query)
    const formattedQuery = query.toLowerCase()
    const data_ = filter(fullData, (specialty) => {
      return contains(specialty, formattedQuery)
    })
    setData(data_)
  }
  const contains = (specialty, query) => {
    if (!specialty || !specialty.name) {
      return false;
    }
    return specialty.name.toLowerCase().includes(query);
  };

  const handleSymptom = async(symptom) => {
    try {
      const formData = new FormData();
      formData.append('symptom', symptom);
      const response = await fetch(`${url}/getDoctorBySymptom/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          body: formData
      });
      const data = await response.json()
      getDoctorBySpecialty(data['data'][0]['id'])
      
  } catch(error) {
      console.error(error);
  }
  }

  return (
    <View>
              <Stack.Screen
                options={{
                    headerTitle: 'Chọn bác sĩ',
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
      <View style={{flexDirection:'row', 
                    alignContent:'flex-start', 
                    alignItems:'flex-start', 
                    alignSelf:'auto', 
                    justifyContent:'flex-start',
                    margin:10,
                    backgroundColor:'white',
                    justifyContent:'space-between',
                    borderRadius:5}}>
      <TextInput
            placeholder="Nhập triệu chứng"
            clearButtonMode="always"
            styte={styles.searchBox}
            value={querySymptom}
            autoCapitalize="none"
            onChangeText={(text) => setQuerySymptom(text)}
          />
      <TouchableOpacity onPress={() => handleSymptom(querySymptom)}>
      <EvilIcons style={{marginTop:3, marginRight:20}} name="search" size={22} color="black" />

      </TouchableOpacity>


      </View>
      <View style={{flexDirection:'row',  margin:10 }}>
      {specialty && specialty.length > 0 && <Text>Kết quả trả về    </Text>}
      {specialty && specialty.length > 0 && <Text style={{fontSize:14, fontWeight:"500", color:"#339966"}}>{specialty[0]['name']}</Text>} 
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <FontAwesome style = {{marginHorizontal:10}} name="pencil-square-o" size={18} color="#339966" />
      </TouchableOpacity>

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
      <View style={{ flex: 1, justifyContent:'flex-end'}}>
      <TouchableOpacity 
                      style={{
                        flex: 1, 
                        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                        justifyContent: 'flex-end'
                      }} 
                      activeOpacity={1} 
                      onPress={() => setModalVisible(false)}
                    ></TouchableOpacity>

        <SafeAreaView style={{
          width: '100%',
          padding: 0,
          borderRadius: 0,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 3,
          marginBottom: 0}}>
        
          <View style={{flexDirection:'row', 
                    alignContent:'flex-start', 
                    alignItems:'flex-start', 
                    alignSelf:'auto', 
                    justifyContent:'flex-start',
                    margin:10,
                    backgroundColor:'white',
                    borderRadius:5}}>
             <EvilIcons style={{marginTop:3}} name="search" size={22} color="black" />
            <TextInput
              placeholder="Tìm kiếm chuyên khoa"
              clearButtonMode="always"
              styte={styles.searchBox}
              value={searchQuery}
              autoCapitalize="none"
              onChangeText={(text) => handleSearch(text)}
            />
          </View>

        <FlatList
          data={data}
          style={{margin:10}}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handlePress(item.id)}>
              <View style={styles.icon}>
                <MaterialCommunityIcons style={{marginRight:10}} name="hospital" size={30} color="#66FF33" />
                <Text>{item.name}</Text>

              </View>
            </TouchableOpacity>
            </View>
          )}
        >

        </FlatList>

        </SafeAreaView>
        </View>
      </Modal>

      {clinics && clinics.map((clinic, index) => (
        
          <ScrollView key={index} style={styles.order_container}>
          <Link href={{ pathname: `./bookTime`, params: { doctor_id: clinic["Doctor"]['id'], customer_id: params.customer_id } }} asChild>

          <TouchableOpacity>
            <ScrollView>
              <View style={styles.date}>
                <Text style={{fontSize:14, fontWeight:"500", color:"#339966"}}>Yêu thích</Text>
                <View style={styles.icon_}>

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
                  <Text style={{fontWeight:'600'}}>TS. {clinic["Doctor"]['name']}</Text>
                  </View>
                  <Text style={{marginTop:10}}>{clinics[index]['name']}: </Text>
                  <Text style={{marginTop:0}}>{clinics[index]['Specialty']['name']}</Text>
                  <View style={styles.separator} />
                  </View>
                
                </View>

                <View style={styles.price}>
                  <Text style={{ fontWeight:"500"}}>Giá tiền:    </Text>
                  <Text style={{color:"#FF0000", fontWeight:"500"}}>{clinics[index]['price']} VND</Text>
                </View>
            </ScrollView>

          </TouchableOpacity>

          </Link>
          </ScrollView>
      ))}
    </View>
  )
}


const styles = StyleSheet.create({
  modal:{
    flex: 1,
    marginTop: 100,
  },
  searchBox:{
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#737373',
    borderWidth: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
},
  text:{
    alignItems: 'center',
    marginBottom: 20
  },
  icon :{
    flexDirection: "row",
    padding:10
},
infor :{
  marginLeft: 10
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
  button : {
    alignItems: 'left',
    padding: 0,
    marginLeft: 20
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctor: {
    alignItems: 'flex-start',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#111',
    shadowOffset: { width: 3, height: 10 },
    shadowOpacity: 0.19,
    shadowRadius: 10,
    elevation: 5
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
  headerImageContainer: {
    width: 80,
    height: 70,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  image_info: {
    flexDirection:'row',
    margin:10
  },
  info: {
    flexDirection: 'column',
    marginLeft:20,
    padding:5,
  }
})
export default BoxDoctor




