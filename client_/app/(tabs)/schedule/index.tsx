import { View, Text, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import React, { useEffect } from 'react'
import instance from '@/utils/axios'
import { createClient } from '@supabase/supabase-js';
import { get } from 'http';
import { convertCreateAt } from '@/components/pageThread/ThreadDataType';
import ScheduleOrderButton from '@/components/schedule/SchduleOrderButton';


const customer_id = "8b57944c-1e70-4a2e-83ec-30532e698de3"
const client = createClient(
  'https://snwjzonusggqqymhbluj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
);

const SchedulePage = () => {
  const [orders, setOrders] = React.useState([])

  const getAllOrders = async () => {
    try {
        const response : any = await instance.get(`/getAllOrder/${customer_id}`)
        if(response && response.length > 0) {
          setOrders(response); // Provide the correct type for the 'setOrders' function
        }

        console.log(response)
    } catch (error) {
        console.error("Error fetching chat:", error);
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
}, []);

  

  return (
    <View className="flex justify-center items-center">
      <Link href="../scheduleDoctor/bookClinic" asChild>
        <TouchableOpacity 
          // style={{margin:60}}
          className=''
        >
          <Text>Bat dau</Text>
        </TouchableOpacity>
      </Link>
      {orders.map((order, index: number) => (
        <View key={index}>
            <ScheduleOrderButton 
              date_be={order['date_time']}
              time={order['hour_time']}
              doctor={order['doctor']['name']}
              clinic={order['clinicId']}
              doctorId={order['doctorId']}
              orderId={order['id']}
              isCreate={false.toString()}
            />
        </View>
      ))}
    </View>
  )
}

export default SchedulePage