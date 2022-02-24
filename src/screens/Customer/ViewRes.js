import React, { useState } from "react";
import { Text, View, Button, FlatList, TouchableOpacity, ListItem, ScrollView, StyleSheet, Image, Modal } from "react-native";
import tw from "tailwind-react-native-classnames";
import Data from "../../dummyData.json";
import LunchData from "./lunchData.json";
import NewLunch from "./NewLunch"
import { SafeAreaView } from "react-native-safe-area-context";
import cartImage from "../Images/cart.jpg";
import useFetch from "./GetData";
import { withSSRContext } from "aws-amplify";


// import increaseState from "./Cart"

// Flexbox - for error ****************************

const Item = ({ lunch, price }) => (
  <View style={tw`p-5 border-solid border-2`}>
    <Text style={tw`text-4xl text-blue-500`}>{lunch}</Text>
    <Text style={tw`text-2xl`}>{"$" + price}</Text>
  </View>
);

// const PopUp = () => {
//   <Text visible={visible} style={tw`text-red-500 text-2xl text-center`}>Added to your cart</Text>
// };






const ViewRes = (props) => {
  console.log('props')
  { console.log(props) }
  { console.log(props?.route.params) }
  {console.log()}

  // const getRestData = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://127.0.0.1:8000/Restaurants'
  //     );
  //     console.log(response)
  //     const json = await response.json();
  //     console.log(json)
  //     return json;
  //   } catch (error) {
  //     console.error('here ' + error);
  //   }
  // };
  // getRestData()
  // <View>
  //   <useFetch
  //   url='localhost:8000/Restaurants'
  //   />
  // </View>
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

  const [vis, setVisible] = useState(false);
  var [currItem, setCurrItem] = useState('');

  const toggleOverlay = (name) => {
    setCurrItem(name)
    setVisible(!vis);
    setTimeout(() => { setVisible(false) }, 1000)
  }

  var [counter, setCounter] = useState(0);
  var count = 0
  var totalPrice = 0
  // var cartList = []
  var [cartList, setCartList] = useState([])
  // var cartItems = { "CartItems": cartList }
  var [cartItems, setCart] = useState({ "CartItems": cartList })
  function increaseCart(food, price) {
    setCounter(counter+=1)
    count += 1
    totalPrice += price
    var newEntry = {
      "id": counter,
      "food": food,
      "price": price
    }
    
    cartList.push(newEntry)
    // setCart(cartItems.push(newEntry))
    // cartList.push(newEntry)
    // cartItems.push(newEntry)
    console.log('added item')
    console.log(cartItems)
    // alert(food + " Added to your cart!")
  }


  function showLunch() {
    return (
      <FlatList nestedScrollEnabled
        data={props.route.params.lunchItems}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {increaseCart(item.food, item.price); toggleOverlay(item.food)}}
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
      <FlatList nestedScrollEnabled
        data={props.route.params.dinnerItems}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
            onPress={() => {increaseCart(item.food, item.price); toggleOverlay(item.food)}}
            // onPress={() => props.navigation.navigate("Cart", item)}
            // onPress={() => props.navigation.navigate("Cart", cartItems, count, totalPrice)}
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

    <SafeAreaView style={[tw`p-5`, styles.container]}>
      <View style={styles.header}>
        <View>
          <Text style={tw`text-red-500 text-3xl`}>{props.route.params.title}</Text>
          <Text>Type: {props.route.params.type}</Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Cart", cartItems)}
        >
          {/* <Text style={tw`text-red-500 text-3xl text-right`}>Cart</Text> */}
          <Image style={styles.cartImage} source={cartImage} alt='cart'></Image>
        </TouchableOpacity>
      </View>


      {/* PopUp */}

      {vis && <Modal transparent={true} >
      <View style={styles.popUp} >
      <View style={styles.innerModal} >
      <Text style={tw`text-red-500 text-2xl text-center`}>{currItem}</Text>
      <Text style={tw`text-red-500 text-2xl text-center`}>Added to your cart</Text>
      </View>
      </View>
      </Modal>}

      {/* Lunch Menu Section */}
      <View style={styles.menuItem}>
        <Text />
        <Text style={tw`text-red-500 text-2xl text-center`}>Lunch Menu</Text>
        <Text />
        {showLunch()}
      </View>

      {/* Dinner Menu Section */}
      <View style={styles.menuItem2}>
        <Text />
        <Text style={tw`text-red-500 text-2xl text-center`}>Dinner Menu</Text>
        <Text />
        {showDinner()}
        <Text />
      </View>


    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  menuItem: {
    flex: 3,
    flexDirection: "column"
  },
  menuItem2: {
    flex: 3,
    flexDirection: "column"
  },
  cartImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  popUp: {
    width: 250,
    textAlign: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    // marginTop: 100,
    // margin: 100,
    flex: 1,
    flexDirection: "column",
    // marginVertical: 20,
  },
  innerModal: {
    height: 150,
    backgroundColor: "white",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 25
  }
});


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