import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

const Orders = (props) => {
  const user = props.route.params;
  const [orders, setOrders] = useState([]);
  const [resName, setResName] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const getRes = async () => {
      try {
        const res = await API.graphql(
          graphqlOperation(queries.getRestaurants, { id: user })
        );
        setResName(res.data.getRestaurants.title);
      } catch (e) {
        console.log(e);
      }
    };
    getRes();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await API.graphql(graphqlOperation(queries.listOrders));
        setOrders(result.data.listOrders.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchOrders();
  }, [clicked]);

  const Item = ({ price, username, time, items, id }) => {
    let it = items.replace(/\"/g, "");
    it = it.replace(it[0], "");
    it = it.replace(it[it.length - 1], "");
    it = it.split(",");
    let specificTime = new Date(time).toLocaleTimeString();
    let date = new Date(time).toLocaleDateString();

    return (
      <View style={tw`border-solid border-gray-500 border-2 rounded-md mt-2`}>
        <View style={tw`m-2`}>
          <Text style={tw`text-2xl`}>{date}</Text>
          <Text style={tw`text-2xl text-red-400`}>{specificTime}</Text>
          <Text style={tw`text-2xl`}>The order:</Text>
          {it.map((data) => (
            <Text style={tw`text-2xl text-red-400`}>{data}</Text>
          ))}
          <Text style={tw`text-2xl`}>Total Price:</Text>
          <Text style={tw`text-2xl`}>{price}</Text>
          <Text style={tw`text-2xl`}>Who ordered: {username}</Text>
          <TouchableOpacity
            onPress={() => handleDone(id)}
            style={tw`m-4 bg-red-400 self-center text-center mb-2 rounded-md`}
          >
            <Text style={tw`m-3`}>Done With Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleDone = async (id) => {
    try {
      await API.graphql({
        query: mutations.deleteOrder,
        variables: { input: { id: id } },
      });
      console.log("deleted");
    } catch (e) {
      console.log(e);
      Alert.alert("Error");
    }
    setClicked(!clicked);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`p-5`}>
        <Text style={tw`text-3xl`}>Your Current Orders</Text>
        <FlatList
          style={tw`mb-5`}
          data={orders}
          renderItem={(data) => {
            if (data.item.restaurant === resName)
              return (
                <Item
                  price={data.item.price}
                  username={data.item.username}
                  time={data.item.updatedAt}
                  items={data.item.items}
                  id={data.item.id}
                ></Item>
              );
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default Orders;
