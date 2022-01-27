import React from "react";
import { Text, View, Button, FlatList, TouchableOpacity, } from "react-native";
import tw from "tailwind-react-native-classnames";
import Data from "../../dummyData.json";
import LunchData from "./lunchData.json";

const Item = ({ title, price }) => (
  <View style={tw`p-5 border-solid border-2`}>
    <Text style={tw`text-4xl text-blue-500`}>{title}</Text>
    <Text style={tw`text-2xl`}>{price}</Text>
  </View>
);


const ViewRes = (props) => {
  console.log(props.route.params);
  return (
    <View style={tw`p-10`}>
      <Text style={tw`text-red-500 text-2xl`}>{props.route.params.title}</Text>
      <Text>Type: {props.route.params.type}</Text>

        // Lunch Menu
      <Text style={tw`text-red-500 text-2xl`}>Lunch Menu</Text>
      <FlatList
          data={LunchData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("View", item)}
              >
                <Item title={item.lunch} price={item.price} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        ></FlatList>
    </View>
  );
};

export default ViewRes;
