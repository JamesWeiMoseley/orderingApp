import React from "react";
import { Text, View, Button, FlatList, TouchableOpacity, ListItem, ScrollView, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import Data from "../../dummyData.json";
import LunchData from "./lunchData.json";
import NewLunch from "./NewLunch"
// import increaseState from "./Cart"

// Flexbox - for error

const Item = ({ lunch, price }) => (
  <View style={tw`p-5 border-solid border-2`}>
    <Text style={tw`text-4xl text-blue-500`}>{lunch}</Text>
    <Text style={tw`text-2xl`}>{"$" + price}</Text>
  </View>
);

const PopUp = () => {
  <Text style={tw`text-red-500 text-2xl text-center`}>Added to your cart</Text>
};

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
  var count = 0
  var totalPrice = 0
  var cartList = []
  var cartItems = { "CartItems": cartList }
  function increaseCart(food, price) {
    count += 1
    totalPrice += price
    var newEntry = {
      "id": count,
      "food": food,
      "price": price
    }
    cartList.push(newEntry)
    // cartItems.push(newEntry)
    console.log('added item')
    console.log(cartItems)
    // alert(food + " Added to your cart!")
  }


  function showLunch() {
    return (
      <FlatList
        data={props.route.params.lunchItems}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => increaseCart(item.food, item.price)}
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
              onPress={() => increaseCart(item)}
              // onPress={() => props.navigation.navigate("Cart", item)}
              onPress={() => props.navigation.navigate("Cart", cartItems, count, totalPrice)}
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
      <TouchableOpacity
      onPress={() => props.navigation.navigate("Cart", cartItems)}
      >
      <Text style={tw`text-red-500 text-3xl text-right`}>Go to Cart</Text>
      </TouchableOpacity>
      <Text style={tw`text-red-500 text-3xl`}>{props.route.params.title}</Text>
      <Text>Type: {props.route.params.type}</Text>

      {/* <PopUp /> */}
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
        ></FlatList>  */}