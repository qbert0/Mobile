import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Link, Stack, router } from 'expo-router'
import  { useEffect, useState } from 'react'
import instance from '@/utils/axios'
import { createClient } from '@supabase/supabase-js';
import { MaterialTopTabs } from './_layout';
import Index from '../../setting';


const customer_id = "8b57944c-1e70-4a2e-83ec-30532e698de3"
const client = createClient(
  'https://snwjzonusggqqymhbluj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
);

const SchedulePage = () => {
  const [doctors, setDoctors] = useState([])
  const getAllOrders = async () => {
    try {
      const {data, error} = await client.from("Order").select("*, Doctor(name)").eq("status", "Completed");
      const doctors :any = data?.map(item  => item.Doctor) || [];  // Safely map over data
      console.log(data)
      setDoctors(doctors)
    } catch (err) {
      console.log("Something went wrong !", err);
    }
  }
  
  useEffect(() => {
    getAllOrders()
  }, [])

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
    () => getAllOrders() 
    )
    .subscribe()

    // Return a cleanup function to unsubscribe from the channel
    return () => {
        channelA.unsubscribe();
    }
});

  return (
    <>
    <MaterialTopTabs.Screen options={{
          title : "Hẹn khám",          
        }}
      />
      {doctors.map((content, index) => (
        <Text>{doctors[index]['name']}</Text>
      ))}
    </>
  )
}

export default SchedulePage