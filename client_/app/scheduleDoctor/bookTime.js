import { ScrollView, Text, Modal, View, TouchableOpacity, StyleSheet, Image, Animated } from "react-native"
import  react, { useEffect, useState } from 'react'
import { useLocalSearchParams, Link} from 'expo-router';
import { createClient } from '@supabase/supabase-js';
import { Svg, Path } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Stack} from 'expo-router'
import Spinner from 'react-native-loading-spinner-overlay';


const client = createClient(
    'https://snwjzonusggqqymhbluj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
  );  

const BookTime = () => {
    const params = useLocalSearchParams()              // doctor_id, customer_id
    return(
      <ScrollView>
        <ProfileCard params={params}></ProfileCard>    
        <Doctor_Service params={params}></Doctor_Service>

      </ScrollView>


    )
}

const Doctor_Service = ({params}) => {
    const [clinic, setClinic] = react.useState()
    const [specialty, setSpecialy] = react.useState()


    //get clinic by doctor_id
    const getClinicByDoctorId = async (doctor_id) => {
        try {
            const {data, error} = await client.from("Clinic").select("*, Doctor(*), Specialty(*)").eq("doctor_id", doctor_id)
            const specialty_ = data.map(item => item.Specialty)
            const clinic_ = data
            setSpecialy(specialty_)
            setClinic(clinic_)
        } catch (error) {
            console.log("cannot getClinicByDoctorId", error)
        }
    }

    useEffect(() => {
        getClinicByDoctorId(params.doctor_id)
    },[])

    // 
    const [modalVisible, setModalVisible] = useState({});
    const [fadeAnim,setFadeAnim] = useState({});

  useEffect(() => {
    // Check if clinic is defined before initializing modalVisible and fadeAnim state
    if (clinic) {
      const initialModalState = {};
      const initialFadeAnim = {};
      clinic.forEach((_, index) => {
        initialModalState[index] = false;
        initialFadeAnim[index] = new Animated.Value(0);
      });
      setModalVisible(initialModalState);
      setFadeAnim(initialFadeAnim);
    }
  }, [clinic]);

  const toggleModal = (index) => {
    setModalVisible(prevState => {
      const newState = {
        ...prevState,
        [index]: !prevState[index]
      };
      handleFadeAnim(index, newState[index]);
      return newState;
    });
  };

  const handleFadeAnim = (index, isVisible) => {
    Animated.timing(fadeAnim[index], {
      toValue: isVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
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
      {clinic && clinic.length > 0 && clinic.map((clinic_, index) => (
        <View key={index} style={{justifyContent:'space-between'}}>
          <TouchableOpacity style={styles.serviceContainer} onPress={() => toggleModal(index)}>
            <View style={styles.icon_infor}>
              <View style={styles.icon}>
                <MaterialIcons name="playlist-add-check" size={24} color="#339966" />  
              </View>
              <View style={styles.infor}>
                <Text style={{fontSize: 16, fontWeight:'600', color:'#111827'}}>{clinic_['name']}</Text>
                <Text style={{fontSize:13, marginTop:5}}>{clinic_['major']}</Text>
                <Text style={{fontSize:14, marginTop:5, fontWeight:'300'}}>{specialty[index]['name']}</Text>
                <View style={{flexDirection:'row', marginTop:5}} >
                  <Foundation name="dollar-bill" size={24} color="#339966" />
                  <Text style={{marginTop:2, marginLeft:10}} >{clinic_['price']}</Text>
                </View>
              </View>

            </View>
          </TouchableOpacity>
          <Modal
            visible={modalVisible[index]}
            animationType="fade"
            transparent={true}
          >
            <View style={{ flex: 1 }}>
              {/* Animated View for the top part to handle closing the modal */}
              <TouchableOpacity
                onPress={() => toggleModal(index)}
                style={{ flex: 1 }}
              >
                <Animated.View style={{ flex: 1, backgroundColor: fadeAnim[index]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.05)']
                  }) }}
                />
              </TouchableOpacity>
              {/* Non-transparent bottom part */}
              <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Booking clinic_id={clinic_['id']} customer_id={params.customer_id} /> 
              </View>
            </View>
          </Modal>
        </View>
      ))}
    </ScrollView>
    </>

  );
};

    

const Booking = ({clinic_id, customer_id}) => {

  const [date, setDate] = useState("")
  const [hour, setHour] = useState()
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
    let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const dayIndex = date.getDay();
    const dayName = getDayName(dayIndex);

    date = date.toLocaleDateString();
    const y_date = convertToDateString(date);
    const d_date = dateToString(date);

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
  return(
      <ScrollView>
        <ScrollView horizontal={true} style={{flexDirection: 'row', padding: 10}}>
          {listOfDate && listOfDate.map((date_, index) => (
            date === date_ ? (
              <TouchableOpacity style={styles.selected} key={index} onPress={() => setDate(date_)} >
                {listOfDay[index] !== 'Chủ nhật' ?(
                <View>
                <Text style={{fontWeight:'500'}}>{listOfDay[index]}</Text>
                <Text>{listOfDate_new[index]}</Text>

                </View>) : null}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.pending} key={index} onPress={() => setDate(date_)} >
                {listOfDay[index] !== 'Chủ nhật' ?(
                <View>
                <Text style={{fontWeight:'500'}}>{listOfDay[index]}</Text>
                <Text>{listOfDate_new[index]}</Text>

                </View>) : null}
              </TouchableOpacity>
            )
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
              hour === hour_ ? (
                <TouchableOpacity style={styles.selected} key={index} onPress={() => setHour(hour_)} >
                  <Text>{hour_}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.pending} key={index} onPress={() => setHour(hour_)} >
                  <Text>{hour_}</Text>
                </TouchableOpacity>
              )
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
              hour === hour_ ? (
                <TouchableOpacity style={styles.selected} key={index} onPress={() => setHour(hour_)} >
                  <Text>{hour_}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.pending} key={index} onPress={() => setHour(hour_)} >
                  <Text>{hour_}</Text>
                </TouchableOpacity>
              )
            )
          ))}
          </View>
          </View>

          <View style={styles.buttonContainer}>
          <Link href={{
            pathname: `./bookConfirm`,
            params: {clinic_id: clinic_id, customer_id:customer_id, date: date, hour: hour}
          }} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Xác nhận</Text>
          </TouchableOpacity>
          </Link>
        </View>

      </ScrollView>
  );
};

const ProfileCard = ({params}) => {
  const [doctor, setDoctor] = react.useState()
  const [specialty, setSpecialy] = react.useState()
  const [isLoading, setIsLoading] = react.useState(true)

  //get clinic by doctor_id
  const getDoctorById = async () => {
      try {
          const {data, error} = await client.from("Clinic").select("*, Doctor(*), Specialty(*)").eq("doctor_id", params.doctor_id)
          const doctor_ = data[0].Doctor
          setDoctor(doctor_)
          setIsLoading(false)
      } catch (error) {
          console.log("cannot getDoctorById", error)
      }
  }
  useEffect(() => {
      getDoctorById()
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerImageContainer}>
          <Image
            style={styles.headerImage}
            source={{ uri: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' }}
          />
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw2NOKUO_3_vum-IcU4YR5dth0bsInhcKLsw&s' }}
          />
        </View>
        <View style={styles.textContainer}>
          {doctor &&  (
            <View style={styles.textContainer}>
                <Text style={styles.name}>TS {doctor.name}</Text>
                <Text style={styles.jobTitle}>Khoa nội</Text>

            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  headerImageContainer: {
    width: '100%',
    height: 128,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileImageContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#fff',
    overflow: 'hidden',
    marginTop: -64,
    marginBottom: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  jobTitle: {
    color: '#6b7280',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#339966',
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
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
    backgroundColor: "#339966",
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

  serviceContainer: {
    padding: 10,
    marginHorizontal: 10,
    marginTop: 0,
    backgroundColor: "#EEEEEE",
  },

  icon_infor: {
    flexDirection: "row",
    padding:10,
    backgroundColor:'white', 
    borderRadius:10, shadowColor: '#111', 
    shadowOffset:{width:3, height:10}, 
    shadowOpacity:0.19, 
    shadowRadius:10, 
    elevation:0,
    margin:0
  },

  icon :{
    flexDirection: "row",
    padding:15
  },

  infor:{
    marginLeft: 0,
    padding:5
  }
});
export default BookTime