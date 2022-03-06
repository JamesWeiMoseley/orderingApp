import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import {
  listRestaurants,
  listItems,
  getCart,
  listCarts,
} from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { Auth, API, graphqlOperation } from "aws-amplify";

const Cart = (props) => {
  const [posts, setPosts] = useState([]);
  const [cart, setCart] = useState({});
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState("");
  const [cost, setCost] = useState("");

  const username = props.route.params.username;
  const resName = props.route.params.title;

  // get request
  var itemsInCart = [];
  var totalItems = 0;
  var totalPrice = 0;

  const fetchItems = async () => {
    try {
      const postsResult = await API.graphql(graphqlOperation(listCarts));
      setPosts(postsResult.data.listCarts.items);
      itemsInCart = postsResult.data.listCarts.items;

      for (var i = 0; i < itemsInCart.length; i++) {
        if (
          itemsInCart[i].username === username &&
          itemsInCart[i].restaurant === resName
        ) {
          totalItems += 1;
          totalPrice += itemsInCart[i].price;
        }
      }
      setTotal(totalItems);
      setCost(totalPrice);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const removeCart = async (id) => {
    console.log("removing cart cart");
    try {
      const postsResult = await API.graphql({
        query: mutations.deleteCart,
        variables: { input: { id: id } },
      });
      fetchItems();
    } catch (e) {
      console.log(e);
    }
  };

  const Item = ({ id, title, type, restuarant }) => (
    <View style={tw`p-5 border-solid border-2 rounded-md my-1`}>
      <View style={tw`flex-row justify-between`}>
        <Text style={tw`text-2xl`}> ${type}</Text>
        <Text style={(tw`text-4xl text-blue-500`, styles.innerItem)}>
          {title}
        </Text>
        <TouchableOpacity onPress={() => removeCart(id)}>
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`text-3xl text-red-400 m-5`}>
        <Text style={tw`text-3xl text-red-400 text-left mt-5`}>{resName}</Text>
      </View>
      <View style={tw`mx-5`}>
        <Text style={tw`text-3xl w-full mt-5 mb-5`}>
          {total} Item(s) in your cart
        </Text>
      </View>
      <View style={tw`flex-1 m-4`}>
        <FlatList
          data={posts}
          renderItem={({ item }) => {
            if (item.username === username && item.restaurant == resName) {
              return (
                <View>
                  <Item
                    id={item.id}
                    title={item.food}
                    type={item.price}
                    restuarant={item.restaurant}
                  />
                </View>
              );
            }
          }}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
      <View style={tw`mx-5`}>
        <Text style={tw`text-3xl w-full mt-5 mb-5`}>Total: {"$" + cost}</Text>
      </View>
      <Button title="Checkout"></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // menuItem: {
  //   height: 100,
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   // borderColor: "black",
  //   borderWidth: 2,
  //   marginVertical: 5,
  //   alignItems: "center",
  //   marginHorizontal: 5,
  //   backgroundColor: "#e8e8e8",
  // },
  innerItem: {
    fontSize: 25,
    color: "#3b82f6",
  },
});

export default Cart;
