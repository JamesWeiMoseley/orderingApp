import React from "react";
import { Text, View, Button, FlatList, TouchableOpacity, ListItem } from "react-native";
import tw from "tailwind-react-native-classnames";
import Data from "../../dummyData.json";
import LunchData from "./lunchData.json";
import NewLunch from "./NewLunch"

const Item = ({ lunch, price }) => (
  <View style={tw`p-5 border-solid border-2`}>
    <Text style={tw`text-4xl text-blue-500`}>{lunch}</Text>
    <Text style={tw`text-2xl`}>{price}</Text>
  </View>
);

const ViewRes = (props) => {
  { console.log(props) }
  { console.log(props?.route.params) }

  function showLunch() {

    return (
      <View>
        {
          props?.route.params.lunch.map((item, index) =>
            <View
              key={`lunch-${index}`}
            >
              <View>
                <Text>
                  {item} {' '} {props?.route.params.price[item]}
                </Text>
              </View>
            </View>
          )
        }
      </View>
    )
  }
  return (

    <View style={tw`p-10`}>

      <Text style={tw`text-red-500 text-2xl`}>{props.route.params.title}</Text>
      <Text>Type: {props.route.params.type}</Text>


      <Text style={tw`text-red-500 text-2xl`}>Lunch Menu</Text>
      {showLunch()}
      <FlatList
        data={Data}
        renderItem={({ item }) => {
          return (
            <FlatList
              data={item}
              renderItem={({ item }) => {
                return (
                  <Item title={item} type={item} />
                )
              }}
            ></FlatList>

            // <TouchableOpacity
            //   onPress={() => props.navigation.navigate("View", item)}
            // >
            //   <Item title={item.lunch} price={item.price} />
            // </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      ></FlatList>


    </View>
  );
};

export default ViewRes;


{/* <FlatList
          data={Data}
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
        ></FlatList> */}