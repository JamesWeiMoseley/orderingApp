import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { listRestaurants } from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { Auth } from "aws-amplify";

function Restaurant(props) {
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
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, []);

  //delete
  const handleDelete = async (id) => {
    await API.graphql({
      query: mutations.deleteRestaurants,
      variables: { input: { id: id } },
    });
    props.navigation.navigate("Portal");
  };

  // item that takes parameters for display
  const Item = ({ title, type, id }) => (
    <View style={tw`p-5 border-solid border-2`}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ViewItem", title)}
      >
        <Text style={tw`text-3xl text-blue-500`}>{title}</Text>
        <Text style={tw`text-2xl`}>{type}</Text>
        <Button title="Delete" onPress={() => handleDelete(id)}></Button>
      </TouchableOpacity>
    </View>
  );

  // schema for post request
  const RestaurantPost = {
    username: username,
    title: title,
    type: type,
  };

  // post request
  const handleSubmit = async () => {
    try {
      const newRestaurant = await API.graphql({
        query: mutations.createRestaurants,
        variables: { input: RestaurantPost },
      });
      console.log(`${title} and ${type}`);
      props.navigation.navigate("Portal");
    } catch (e) {
      console.log(e);
    }
  };

  //add menu item
  const addItem = async () => {
    const newItem = await API.graphql({
      query: mutations.createItem,
      variables: {
        input: {
          food: "shrimp",
          price: 9,
          restaurant: "Claim Jumper",
        },
      },
    });
  };

  return (
    <View style={tw`bg-gray-400 h-full`}>
      <Button title="add to pollo loco" onPress={addItem}></Button>
      <View style={tw`mb-5`}>
        <Text style={tw`text-center pt-10`}>Add Restaurant</Text>
        <View style={tw`p-10`}>
          <Text>Title</Text>
          <TextInput
            onChangeText={(e) => setTitle(e)}
            value={title}
            style={tw`border-solid border-2 text-2xl`}
          ></TextInput>
          <Text>Type</Text>
          <TextInput
            value={type}
            onChangeText={(type) => setType(type)}
            style={tw`border-solid border-2 text-2xl`}
          ></TextInput>
        </View>
        <Button title="Add new Restaurant" onPress={handleSubmit} />
      </View>
      <Text style={tw`text-4xl`}>List of restaurants</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return <Item title={item.title} type={item.type} id={item.id} />;
        }}
      ></FlatList>
    </View>
  );
}

export default Restaurant;
