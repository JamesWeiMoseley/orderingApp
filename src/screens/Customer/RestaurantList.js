import React from "react";
import { View, FlatList, Text } from "react-native";
import Data from "../../dummyData.json";
import tw from "tailwind-react-native-classnames";

const RestaurantList = () => {
  return (
    <View>
      <Text>Available to Order From</Text>
      <Text>asdf</Text>
      <FlatList
        data={Data}
        renderItem={({ item }) => {
          return (
            <Text style={tw`text-4xl`}>
              {item.title} {item.type}
            </Text>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default RestaurantList;
