import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
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
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("");
  const [cost, setCost] = useState("");
  const [ids, setIds] = useState([]);

  const username = props.route.params[0];
  const resName = props.route.params[1];

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
          setCart((cart) => [...cart, itemsInCart[i].food]);
          setIds((id) => [...id, itemsInCart[i].id]);
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

  const handleCheckout = async () => {
    try {
      const newOrder = await API.graphql({
        query: mutations.createOrder,
        variables: {
          input: {
            username: username,
            restaurant: resName,
            price: cost,
            items: JSON.stringify(cart),
          },
        },
      });
    } catch (e) {
      console.log(e);
    }

    for (let i = 0; i < ids.length; i++) {
      try {
        await API.graphql({
          query: mutations.deleteCart,
          variables: { input: { id: ids[i] } },
        });
        Alert.alert("Your order has been placed");
        props.navigation.navigate("Portal");
      } catch (e) {
        console.log(e);
      }
    }
  };

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
          extraData={cost}
          renderItem={(data) => {
            if (
              data.item.username === username &&
              data.item.restaurant == resName
            ) {
              return (
                <View>
                  <Item
                    id={data.item.id}
                    title={data.item.food}
                    type={data.item.price}
                    restuarant={data.item.restaurant}
                  />
                </View>
              );
            }
          }}
          // keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
      <View style={tw`mx-5`}>
        <Text style={tw`text-3xl w-full mt-5 mb-5`}>Total: {"$" + cost}</Text>
      </View>
      <Button title="Checkout" onPress={handleCheckout}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerItem: {
    fontSize: 25,
    color: "#3b82f6",
  },
});

export default Cart;
