import React from "react";
import { Pressable, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';




const BoxDoctor = ({propOfDoctor})  => {
    const handleOnPress = () => {
        console.log(propOfDoctor['name'])
    }
    return(
        <View style={{ flexDirection: 'row', marginBottom: 2, borderWidth: 1, borderColor: '#E5E7EB' }}>
        <Link href={`./dateAndTime`} asChild>
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
      <Image
        source={require('./doctor.jpg')}
        style={{ width: 60, height: 60, borderRadius: 20, marginRight: 8 }}
      />
      <View style={{ flex: 1, marginRight: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginLeft:10, marginBottom:2 }}>{propOfDoctor['name']}</Text>
        <Text style={{ fontSize: 12, color: '#6B7280', marginLeft:10, marginBottom:10 }}>{propOfDoctor['department']}</Text>
        <View style={{flexDirection:'row' , marginLeft:10}}>
            <MaterialIcons name="attach-money" size={15} color="black" />
            <Text style={{ fontSize: 13, fontWeight:'800', color: '#6B7280' }}>{propOfDoctor['price']}</Text>
        </View>

      </View>
      
      <Entypo name="chevron-small-right" size={24} color="black" />
    </TouchableOpacity>
    </Link>

    </View>
    )

}

// using for-loop listDoctor
const ListDoctor = () => {
    propOfDoctor = [
        {name: "PGSTS XuanBao01", department: 'Khoa thần kinh', price: '2000000', rate: 5},
        {name: "XuanBao02", department: 'Khoa thần kinh', price: '4000000', rate: 4},
        {name: "XuanBao03", department: 'Khoa chấn thương chỉnh hình', price: '2000000', rate: 3}

    ]
    console.log(propOfDoctor[0])
    var numDoctor = propOfDoctor.length
    var listOfDoctor = []
    for (let i = 0; i < numDoctor; i++){
        listOfDoctor.push(
            <View key={i} style={styles.list}>
                <BoxDoctor propOfDoctor = {propOfDoctor[i]}></BoxDoctor>
            </View>
        )
    }

    return(

    <View style={{flexDirection:'column', width:'100%'}}>
        {listOfDoctor}
    </View>
    )
}

// Export default BookDoctor
const BookDoctor = () => {
    return(
        <View>
            <ListDoctor></ListDoctor>
        </View>

    )
}

export default BookDoctor

const styles = StyleSheet.create({
    box :{
        backgroundColor:'orange'
    },

    list :{
        flexDirection: 'column',
        width:'100%',
        padding:8
    }
})
5