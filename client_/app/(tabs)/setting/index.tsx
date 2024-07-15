import AddMember from "@/components/addMember/AddMember";
import { Link, Stack } from "expo-router";
import { userInfo } from "os";
import React, { useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialIcons,
  EvilIcons,
  FontAwesome5,
  Fontisto,
  FontAwesome6,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import instance from "@/utils/axios";

const Index = () => {
  const doLogout = () => {
    signOut();
  };
  const { signOut, isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const id = "null"

  const [selectedImage, setSelectedImage] = useState(
    require("../../../assets/avatar.png")
  );
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `avatar/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <>
    <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <View className="w-ful">
              <Text className="text-white flex-row justify-center text-2xl font-semibold ">
                Cá nhân
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: "#0860c4",
          },
        }}
      />
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <Link href={`/personal/${id}/userInfo`} asChild>
          <TouchableOpacity style={styles.userInfo}>
            <TouchableOpacity onPress={onCaptureImage}>
              <Image
                source={
                  typeof selectedImage === "string"
                    ? { uri: selectedImage }
                    : selectedImage || { uri: user?.imageUrl }
                }
                style={styles.avatar}
              />
            </TouchableOpacity>
            <Text style={styles.name}>
              {user?.firstName} {user?.lastName}
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={styles.frame}>
          <Text style={styles.header}>Tiện ích</Text>
          <Link href={"/personal/listMember"} asChild>
            <TouchableOpacity style={styles.option}>
              <View style={styles.icon}>
                <MaterialIcons
                  name="family-restroom"
                  size={27}
                  color="#0860c4"
                />
              </View>
              <View style={styles.title}>
                <Text>Thành viên gia đình</Text>
                <EvilIcons name="chevron-right" size={30} color="grey" />
              </View>
            </TouchableOpacity>
          </Link>
          <Link href={"/(tabs)/medical"} asChild>
            <TouchableOpacity style={styles.option}>
              <View style={styles.icon}>
                <FontAwesome5 name="notes-medical" size={26} color="#0860c4" />
              </View>
              <View style={styles.title}>
                <Text>Hồ sơ sức khỏe</Text>
                <EvilIcons name="chevron-right" size={30} color="grey" />
              </View>
            </TouchableOpacity>
          </Link>
          <Link href={'/(tabs)/schedule/(option)/pending'} asChild>
            <TouchableOpacity style={styles.option}>
              <View style={styles.icon}>
                <FontAwesome5 name="calendar-check" size={25} color="#0860c4" />
              </View>
              <View style={styles.titleLast}>
                <Text>Lịch sử đặt khám</Text>
                <EvilIcons name="chevron-right" size={27} color="grey" />
              </View>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.frame2}>
          <Text style={styles.header}>Cài đặt</Text>
          <Link href={"/personal/changePassword"} asChild>
            <TouchableOpacity style={styles.option}>
              <View style={styles.icon}>
                <Fontisto name="locked" size={24} color="#0860c4" />
              </View>
              <View style={styles.title}>
                <Text>Đổi mật khẩu</Text>
                <EvilIcons name="chevron-right" size={30} color="grey" />
              </View>
            </TouchableOpacity>
          </Link>
          <Link href={"/personal/deleteAccount"} asChild>
            <TouchableOpacity style={styles.option}>
              <View style={styles.icon}>
                <FontAwesome6 name="delete-left" size={22} color="#0860c4" />
              </View>
              <View style={styles.title}>
                <Text>Xóa tài khoản</Text>
                <EvilIcons name="chevron-right" size={30} color="grey" />
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.option} onPress={doLogout}>
            <View style={styles.icon}>
              <Entypo name="log-out" size={24} color="#0860c4" />
            </View>
            <View style={styles.titleLast}>
              <Text>Đăng xuất</Text>
              <EvilIcons name="chevron-right" size={30} color="grey" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.contact}>
          <FontAwesome name="phone" size={24} color="grey" />
          <Text style={{ marginLeft: 5 }}> Hotline: </Text>
          <Text style={{ fontWeight: "500", fontSize: 16 }}> 1900 6868</Text>
        </View>

        {/* <Button title="Create Customer" onPress={createCustomer} /> */}
      </ScrollView>
    </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "grey",
    margin: 15,
    borderColor: "grey",
    borderWidth: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#bab8b8",
  },
  name: {
    fontSize: 16,
    color: "#706e6e",
  },
  frame: {
    borderBottomWidth: 1,
    borderBottomColor: "#bab8b8",
  },
  header: {
    fontSize: 16,
    paddingLeft: 12,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  option: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    height: 50,
    backgroundColor: "#fff",
  },
  icon: {
    width: 30,
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    flex: 1,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    marginLeft: 12,
    borderBottomColor: "#dedfe0",
    borderBottomWidth: 1,
  },
  titleLast: {
    flexDirection: "row",
    flex: 1,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    marginLeft: 12,
  },
  headerSetting: {
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 12,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  frame2: {
    marginTop: 15,
    borderTopColor: "#bab8b8",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#bab8b8",
  },
  contact: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
});

export default Index;
