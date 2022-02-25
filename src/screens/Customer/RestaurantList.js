import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Data from "../../dummyData.json";
import tw from "tailwind-react-native-classnames";
import { listRestaurants, listItems } from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { Auth, API, graphqlOperation } from "aws-amplify";

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

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");

  // get username
  useEffect(() => {
    checkUser();
    async function checkUser() {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username);
    }
  }, []);

  // get request
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResult = await API.graphql(
          graphqlOperation(listRestaurants)
        );
        setPosts(postsResult.data.listRestaurants.items);
        console.log(postsResult.data.listRestaurants.items)
        console.log('posts')
        console.log(posts)
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, []);

  // get request
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const postsResult = await API.graphql(
          graphqlOperation(listItems)
        );
        //setPosts(postsResult.data.listItems.items);
        console.log(postsResult.data.listItems.items)
      } catch (e) {
        console.log(e);
      }
    };
    fetchItems();
  }, []);


  // console.log('data')
  // console.log({Data})

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Text style={tw`text-4xl p-10`}>Available to Order From</Text>
      <FlatList
        data={posts}
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
