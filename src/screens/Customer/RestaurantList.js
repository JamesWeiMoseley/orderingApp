import React from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Data from "../../dummyData.json";
import tw from "tailwind-react-native-classnames";

const Item = ({ title, type }) => (
  <View style={tw`p-5 border-solid border-2`}>
    <Text style={tw`text-4xl text-blue-500`}>{title}</Text>
    <Text style={tw`text-2xl`}>{type}</Text>
  </View>
);

// Use this to pull restaurant data from db
// var Data = []
// // Pull the Restaurant data from the db
// const getRestData = async () => {
//   try {
//     const response = await fetch(
//       'http://127.0.0.1:8000/Restaurants'
//     );
//     //console.log(response)
//     const json = await response.json();
//     console.log(json)
//     Data = [...json]
//     return json;
//   } catch (error) {
//     console.error('here ' + error);
//   }
// };
// getRestData()


//var Data = getRestData()

const RestaurantList = (props) => {
  console.log('data')
  console.log({Data})
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Text style={tw`text-4xl p-10`}>Available to Order From</Text>
      <FlatList
        data={Data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("View", item)}
            >
              <Item title={item.title} type={item.type} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </SafeAreaView>
  );
};

export default RestaurantList;
