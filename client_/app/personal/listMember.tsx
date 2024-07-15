import React, { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import instance from "@/utils/axios";
import useCustomers from "@/hooks/useCustomer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";
const avatar = require("../../assets/avatar3.png");



const client = createClient(
  'https://snwjzonusggqqymhbluj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
);

const ListMember = () => {
  const { listOfCustomers, isLoading } = useCustomers();

  if (isLoading) {
    return (
      <Spinner
        visible={true}
        textContent={"Đang tải..."}
        textStyle={{ color: "#FFF" }}
      />
    );
  }

  if (listOfCustomers.length === 0) {
    return <Text>Không có dữ liệu.</Text>;
  }

  const Press = (customer: string) => {
    console.log(customer);
    router.navigate(`/personal/${customer}/userInfo`);
  };

//   useEffect(() => {
//     const channelA = client
//     .channel('schema-db-changes')
//     .on(
//     'postgres_changes',
//     {
//         event: '*',
//         schema: 'public',
//         table: 'Order'
//     },
//     () => console.log("asdas")
//     )
//     .subscribe()

//     // Return a cleanup function to unsubscribe from the channel
//     return () => {
//         channelA.unsubscribe();
//     }
// });

  return (
    <View className="w-full h-full bg-background px-2">
      <ScrollView className="mt-4 bg-background">
        {listOfCustomers.map((customer, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Press(customer.id)}
            style={{
              // flexDirection: "row",
              padding: 5,
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
              shadowColor: "#000000",
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
              // flex: 1,
              alignItems: "center",
            }}
            className="my-2 flex-row items-center mx-1"
          >
            <View className="w-16 h-16 rounded-full bg-avatar-1 flex items-center justify-center">
              <Image source={avatar} style={{ width: 50, height: 50 }} />
            </View>
            <View className="flex-1 flex-row items-center justify-between">
              <View className="flex ">
                <Text className=" mb-1  text-slate-500 text-base">
                  {customer.firstName + " "}
                  {customer.lastName}
                </Text>
              </View>
              <View className="p-2 rounded-full mr-1">
                <FontAwesomeIcon icon={faChevronRight} size={19} color="grey" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memberContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ListMember;
