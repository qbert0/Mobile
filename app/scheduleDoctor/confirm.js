import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Link } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


const ConfirmComponent = () => {
    return(
        <ScrollView>
            <ClinicComponent></ClinicComponent>
            <CustomerComponent></CustomerComponent>
            <DoctorComponent></DoctorComponent>
            <DateComponent></DateComponent>
            <DangerComponent></DangerComponent>
            <ConfirmButton></ConfirmButton>
        </ScrollView>
    )
}

const CustomerComponent = () => {
    const handleOnPress = () => {
      console.log("a")
    }
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
                  <Text style={{fontSize:16, fontWeight:500, margin:0, marginTop:10, color:'#339966'}}>Thông tin bệnh nhân</Text>
                  <FontAwesome name="pencil-square-o" size={24} color="powderblue" style={{margin:10, marginRight:10}}/>
  
                </View>
                  <View style={{flexDirection:'column', paddingVertical:10, marginLeft:20}}>
  
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 16, fontWeight:'600', color:'#111827'}}>Phan Xuân Bảo</Text>
                    </View>
  
                  <Text style={{fontSize:15, marginTop:5}}>0393 486 ***</Text>
  
                  </View>
  
                  {/* <Entypo name="chevron-small-right" size={24} color="black" style={{marginTop:60, marginLeft:60}} /> */}
              </View>
  
  
              </TouchableOpacity>
  
      </View>
    )
  }


const ClinicComponent = () => {
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
                  <Text style={{fontSize:16, fontWeight:500, margin:0, marginTop:10, color:'#339966'}}>Nơi khám</Text>
  
                </View>
                  <View style={{flexDirection:'column', paddingVertical:10, marginLeft:20}}>
  
                    <View style={{flexDirection:'column'}}>
                    <Text style={{ fontSize: 16, fontWeight:'600', color:'#111827'}}>Bệnh viện Đại học Y Hà Nội</Text>
                    <Text style={{ fontSize: 15, fontWeight:'600', color:'#111827', marginTop:3}}>Nội thần kinh</Text>

                    </View>
  
                  <Text style={{fontSize:14, marginTop:10}}>Địa điểm: Phòng khám Quốc tế 308-10E. Tầng 3, Nhà A2 - 
                                                        Khoa khám chữa bệnh theo yêu cầu - Số 1 Tôn Thất Tùng, Đống Đa, Hà Nội</Text>
  
                  </View>
  
                  {/* <Entypo name="chevron-small-right" size={24} color="black" style={{marginTop:60, marginLeft:60}} /> */}
              </View>
  
  
              </TouchableOpacity>
  
      </View>
    )
}

const DoctorComponent = () => {
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
                      <Text style={{ fontSize: 16, fontWeight:'600', color:'#111827'}}>PGS.TS Phan Xuân Bảo</Text>
                      </View>
    
                    <Text style={{fontSize:13, marginTop:5, color:"powderblue", fontWeight:900}}>400000đ</Text>
    
                    </View>
    
                    {/* <Entypo name="chevron-small-right" size={24} color="black" style={{marginTop:60, marginLeft:60}} /> */}
                </View>
    
    
                </TouchableOpacity>
    
        </View>
      )
}

const DateComponent = () => {
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
                        <Text>08:00</Text>
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
                            <Text>22/03/2024</Text>
                            </View>

                    </TouchableOpacity>
    
                  </View>

    
                    {/* <Entypo name="chevron-small-right" size={24} color="black" style={{marginTop:60, marginLeft:60}} /> */}
                </View>
    
    
                </TouchableOpacity>
    
        </View>
      )
}

const ConfirmButton = ()  => {
    return(
        <View>
            <Link href={`./bookClinic`} asChild>
                <TouchableOpacity 
                    style={{
                        alignItems:'center',
                        marginTop:100,
                        backgroundColor:'#33CC99',
                        margin:40,
                        height:50,
                        justifyContent:'center',
                        borderRadius:10,

                    }}>
                    <Text>Đặt lịch</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

const DangerComponent = () => {
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
                <View>
                <Text style={{fontSize:15, marginTop:5, color:'red', margin:10}}>Ghi chú (triệu chứng, dị ứng thuốc) *: ....</Text>

                </View>

    
    
                </TouchableOpacity>
    
        </View>
      )
}
export default ConfirmComponent