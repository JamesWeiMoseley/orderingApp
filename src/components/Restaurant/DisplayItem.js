import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import GetData from "../Customer/GetData";

const DisplayItem = ({ resName, route, navigation }) => {
  const [clicked, setClicked] = React.useState(false);
  const { items } = GetData(clicked);

  const handleDelete = async (id) => {
    try {
      await API.graphql({
        query: mutations.deleteItem,
        variables: { input: { id: id } },
      });
    } catch (e) {
      console.log(e);
      Alert.alert("Error");
    }
    setClicked(!clicked);
  };

  const Item = ({ food, price, restaurant, id }) => {
    return (
      <View
        style={tw`flex bg-gray-200 border-solid mx-5 my-2 border-gray-200 border-2 rounded-md `}
      >
        <View style={tw`flex-row justify-between ml-3 mr-3`}>
          <Text style={tw`text-xl`}>{food}</Text>
          <Text>{`$${price}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDelete(id)}
          style={tw`w-1/4 bg-red-400 self-center text-center mb-2 rounded-md`}
        >
          <Text style={tw`text-center`}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 pb-5`}>
      <View
        style={tw`border-solid mx-2 my-2 border-gray-200 border-2 rounded-md h-full`}
      >
        <Text style={tw`m-5 text-2xl text-center`}>
          Your Current Menu Items:{" "}
        </Text>
        <FlatList
          data={items}
          renderItem={(data) => {
            if (data.item.restaurant == resName)
              return (
                <Item
                  food={data.item.food}
                  price={data.item.price}
                  restaurant={data.item.restaurant}
                  id={data.item.id}
                ></Item>
              );
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default DisplayItem;
