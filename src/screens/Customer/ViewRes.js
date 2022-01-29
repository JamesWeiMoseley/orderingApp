import React from "react";
import { Text, View, Button, FlatList, TouchableOpacity, ListItem, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import Data from "../../dummyData.json";
import LunchData from "./lunchData.json";
import NewLunch from "./NewLunch"

const Item = ({ lunch, price }) => (
  <View style={tw`p-5 border-solid border-2`}>
    <Text style={tw`text-4xl text-blue-500`}>{lunch}</Text>
    <Text style={tw`text-2xl`}>{"$" + price}</Text>
  </View>
);

const ViewRes = (props) => {
  { console.log(props) }
  { console.log(props?.route.params) }

  // function showLunch() {
  //   return (
  //     <View>
  //       {
  //         props?.route.params.lunch.map((item, index) =>
  //           <View
  //             key={`lunch-${index}`}
  //           >
  //             <View>
  //               <TouchableOpacity>
  //                 <Item lunch={item} price={props?.route.params.price[item]} />
  //                 <Text />
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         )
  //       }
  //     </View>
  //   )
  // }

  function showLunch() {
    return (
      <FlatList
          data={props.route.params.lunchItems}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
              // onPress={() => props.navigation.navigate("View", item)}
              >
                <Item lunch={item.food} price={item.price} />
                <Text />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        ></FlatList>
    )
  }

  function showDinner() {
    return (
      <FlatList
          data={props.route.params.dinnerItems}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
              // onPress={() => props.navigation.navigate("View", item)}
              >
                <Item lunch={item.food} price={item.price} />
                <Text />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        ></FlatList>
    )
  }

  return (

    <View style={tw`p-10`}>

      <Text style={tw`text-red-500 text-3xl`}>{props.route.params.title}</Text>
      <Text>Type: {props.route.params.type}</Text>
      <ScrollView>

        {/* Lunch Menu Section */}
        <Text />
        <Text style={tw`text-red-500 text-2xl text-center`}>Lunch Menu</Text>
        <Text />
        {showLunch()}

        {/* Dinner Menu Section */}
        <Text />
        <Text style={tw`text-red-500 text-2xl text-center`}>Dinner Menu</Text>
        <Text />
        {showDinner()}
        <Text />
        
      </ScrollView>
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