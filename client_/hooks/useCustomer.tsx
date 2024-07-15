import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import instance from "@/utils/axios";


const useCustomers = () => {
  const { userId } = useAuth();
  const [listOfCustomers, setListOfCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  


  const fetchCustomer = async () => {
        setIsLoading(true);
        try {
          const response = await instance.get(`/customer?userId=${userId}`);
          if (Array.isArray(response)) {
            setListOfCustomers(response);
          } else {
            console.error("Expected an array but got:", typeof response);
            setListOfCustomers([]);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
  };

  useEffect(() => {
    

    fetchCustomer();
  }, []);

  return { listOfCustomers, isLoading };
};

export const fetchCustomerId = (userId : string | string[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(defau)
  useEffect(() => {
    const fetchCustomerId = async () => {
      setIsLoading(true);
      try {
        const response  = await instance.get(`/customerId?userId=${userId}`);
        if (response) {
          setCustomer(response);
        } else {
          console.error("Expected an array but got:", typeof response);
          // setCustomer();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    // fetchCustomerId();
  }, []);

  return [customer, isLoading]
}

export default useCustomers;




const defau  = {
  id: '8b57944c-1e70-4a2e-83ec-30532e698de3',
  firstName: 'quyen',
  lastName: 'nguyen',
  age: '21',
  sex: 'woman',
  address: 'ha noi',
}
