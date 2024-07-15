import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useId, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import InforSection from "@/components/infor/InforSection";
import instance from "@/utils/axios";
import useCustomers, { fetchCustomerId } from "@/hooks/useCustomer";
import { useLocalSearchParams } from "expo-router";

interface section {
  section: string;
  value: string | null;
}

const userInfo = () => {
  const { id } = useLocalSearchParams();
  const [customer, setCustomer] = useState<any>();
  const [selectedImage, setSelectedImage] = useState(
    require("@/assets/avatar.png")
  );
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  let listsection: section[];
  const [list, setList] = useState<section[]>([]);

  const fecthCustomerId = async () => {
    if (id == "null") {
      setIsLoading(true);
      try {
        const response = await instance.get(`/customer?userId=${userId}`);
        if (Array.isArray(response)) {
          listsection = creatnewSection(
            "",
            response[0].age,
            response[0].sex,
            "",
            response[0].address,
            "kinh",
            "Việt Nam",
            ""
          );
          console.log(listsection);
        } else {
          console.error("Expected an array but got:", typeof response);
          setCustomer([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        const response: any = await instance.get(`/customerId?userId=${id}`);
        if (response) {
          listsection = creatnewSection(
            "",
            response.age,
            response.sex,
            "",
            response.address,
            "kinh",
            "Việt Nam",
            ""
          );
        } else {
          console.error("Expected an array but got:", typeof response);
          // setCustomer();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    setList(listsection);
  };

  useEffect(() => {
    fecthCustomerId();
  }, []);

  const { user } = useUser();
  return (
    <View className="flex-col px-2 py-1 h-full w-full">
      <View className="flex-col justify-between items-center w-full mb-6">
        <Image
          source={
            typeof selectedImage === "string"
              ? { uri: selectedImage }
              : selectedImage || { uri: user?.imageUrl }
          }
          style={styles.avatar}
        />
      </View>
      <View className="flex-col m-2 ">
        {list.map((sec: section) => (
          <InforSection
            key={sec.section}
            section={sec.section}
            value={sec.value}
          />
        ))}
      </View>
    </View>
  );
};

export default userInfo;

const creatnewSection = (
  phone: string | null,
  birthday: string | null,
  gender: string | null,
  numberCMTND: string | null,
  address: string | null,
  nation: string | null,
  nationality: string | null,
  job: string | null
): section[] => {
  // const response = await instance.get('')

  const listSection: section[] = [
    {
      section: "Số điện thoại",
      value: phone,
    },
    {
      section: "Ngày sinh",
      value: birthday,
    },
    {
      section: "Giới tính",
      value: convertGender(gender),
    },
    {
      section: "Số Căn cước/CMTND",
      value: numberCMTND,
    },
    {
      section: "Địa chỉ",
      value: address,
    },
    {
      section: "Dân tộc",
      value: nation,
    },
    {
      section: "Quốc tịch",
      value: nationality,
    },
    {
      section: "Nghề nghiệp",
      value: job,
    },
  ];
  return listSection;
};

const convertGender = (gender: string | null) => {
  if (!gender) return null;
  if (gender == "woman") {
    return "Nữ";
  } else {
    return "Nam";
  }
};

const styles = StyleSheet.create({
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "grey",
    margin: 15,
    borderColor: "grey",
    borderWidth: 1,
  },
});
