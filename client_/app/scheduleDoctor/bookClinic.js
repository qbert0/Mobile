import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { SearchBar } from '@rneui/themed';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';






const BoxClinic = ({clinicName, clinicAddress})  => {
    
    const handleOnPress = () => {
        console.log({clinicName}, {clinicAddress})
    }
    return(
    <View style={{ flexDirection: 'row', marginBottom: 2, borderWidth: 1, borderColor: '#E5E7EB' }}>
        <Link href={`./bookDoctor`} asChild>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    padding: 16,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    shadowColor: '#000000',
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 5,
                    flex: 1,
                    alignItems: 'center',
                }}
                >
        <Entypo name="location" size={35} color="powderblue" />
        <View style={{ flex: 1, marginRight: 16, marginLeft: 10}}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', margin: 10 }}>{clinicName}</Text>
        <Text style={{ fontSize: 14, color: '#6B7280',  marginLeft: 10}}>{clinicAddress}</Text>
        </View>
        <TouchableOpacity style={{ width: 24, justifyContent: 'flex-end' }}>
            <Entypo name="chevron-small-right" size={24} color="black" />
        </TouchableOpacity>
        </TouchableOpacity>
        </Link>

    </View>
    )

}

const SearchComponent = () => {
    const [search, setSearch] = useState("");
    
    const updateSearch = (search) => {
      setSearch(search);
    };
    
    return (
      <View style={{margin:10, height:20, marginBottom:100}}>
        <SearchBar
          platform="android"
          round= {false}
          lightTheme= {true}
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
        />
      </View>
    );
};
// using for-loop listDoctor
const ListClinic = () => {
    const clinicName = ['Nhà thuốc số 01', 'Nhà thuốc số 02']
    const clinicAddress = ['Mỹ Đình, Nam Từ Liêm, Hà Nội', 'Dịch Vọng Hậu, Cầu Giấy, Hà Nội']

    var numClinic = clinicAddress.length
    var listOfClinic = []
    for (let i = 0; i < numClinic; i++){
        listOfClinic.push(
            <View key={i} style={styles.list}>
                <BoxClinic 
                    clinicName = {clinicName[i]}
                    clinicAddress = {clinicAddress[i]}>

                </BoxClinic>
            </View>
        )
    }

    return(
        
        <View style={{flexDirection:'column', width:'100%'}}>
            {listOfClinic}
        </View>
        
    )
}

// Export default BookDoctor
export default function BookClinic() {
    return(
        <View>
            <SearchComponent></SearchComponent>
            <ListClinic></ListClinic>
        </View>


    )
}

// export default BookClinic;

const styles = StyleSheet.create({


    box :{
        // flex:1,
        textAlign:'center',
        backgroundColor:'orange'
    },

    list :{
        flexDirection: 'column',
        width:'100%',
        paddingBottom:3,
        paddingHorizontal:10
    }
})