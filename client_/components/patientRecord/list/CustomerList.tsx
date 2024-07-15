import { Image, Text, TouchableOpacity, View } from "react-native";
const avatar = require("../../../assets/avatar3.png");
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "expo-router";
import { convertDateToAge } from "@/utils/page/comment";

interface Props {
  id: string;
  firstName: string;
  lastName: string;
  date: Date;
}

const CustomerList = ({ id, firstName, lastName, date }: Props) => {
  const router = useRouter();

  const onPress = () => {
    router.push(`/(tabs)/medical/${id}/result`);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center my-2 mx-1"
      style={{
        // flexDirection: "row",
        padding: 2,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        // flex: 1,
        alignItems: "center",
      }}
    >
      <View className="w-16 h-16 rounded-full mr-4 flex items-center justify-center">
        <Image source={avatar} style={{ width: 50, height: 50 }} />
      </View>
      <View className="flex-col flex-1">
        <Text className="mb-1  text-slate-500 text-base">
          {firstName + " " + lastName}
        </Text>
        <Text>{convertDateToAge(date) + " Tuổi"}</Text>
      </View>
      <View className="p-2 rounded-full mr-1">
        <FontAwesomeIcon icon={faChevronRight} size={19} color="grey" />
      </View>
    </TouchableOpacity>
  );
};

export default CustomerList;
